import { transform } from '@babel/standalone';

// Configuración de transformación para JSX
const babelConfig = {
  presets: [
    ['env', { 
      targets: { browsers: ['> 1%'] },
      modules: false 
    }],
    'react'
  ],
  plugins: [
    ['transform-react-jsx', { pragma: 'React.createElement' }]
  ]
};

// Cache para módulos ya transformados
const moduleCache = new Map<string, string>();

// Función para resolver imports dinámicamente
const resolveImport = async (moduleName: string): Promise<string> => {
  // Cache hit
  if (moduleCache.has(moduleName)) {
    return moduleCache.get(moduleName)!;
  }

  let moduleUrl: string;
  
  // Mapeo de módulos comunes
  switch (moduleName) {
    case 'react':
      moduleUrl = 'https://esm.sh/react@18';
      break;
    case 'react-dom':
      moduleUrl = 'https://esm.sh/react-dom@18';
      break;
    case 'react-dom/client':
      moduleUrl = 'https://esm.sh/react-dom@18/client';
      break;
    default:
      // Para otros paquetes, usar esm.sh
      moduleUrl = `https://esm.sh/${moduleName}`;
  }

  try {
    const response = await fetch(moduleUrl);
    const moduleCode = await response.text();
    moduleCache.set(moduleName, moduleCode);
    return moduleCode;
  } catch (error) {
    console.error(`Error loading module ${moduleName}:`, error);
    throw new Error(`Failed to load module: ${moduleName}`);
  }
};

// Función para transformar código JSX a JavaScript
const transformCode = (code: string): string => {
  try {
    // Agregar importaciones automáticas si no existen
    let processedCode = code;
    
    if (!code.includes('import React')) {
      processedCode = `import React from 'react';\n${processedCode}`;
    }

    // Transformar usando Babel
    const result = transform(processedCode, {
      presets: [['react', { runtime: 'automatic' }], 'env'],
      filename: 'sandbox.tsx'
    });

    return result.code || '';
  } catch (error) {
    console.error('Transform error:', error);
    throw new Error(`Syntax error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Función principal de bundling
export const bundleCode = async (rawCode: string): Promise<string> => {
  try {
    // Transformar el código JSX
    const transformedCode = transformCode(rawCode);
    
    // Generar código final que se puede ejecutar
    const finalCode = `
      // Imports inline para evitar módulos externos
      const React = window.React || {
        createElement: (...args) => console.error('React not loaded'),
        useState: () => console.error('React not loaded'),
        useEffect: () => console.error('React not loaded')
      };
      
      const ReactDOM = window.ReactDOM || {
        createRoot: () => ({
          render: () => console.error('ReactDOM not loaded')
        })
      };

      // Cargar React y ReactDOM si no están disponibles
      if (!window.React || !window.ReactDOM) {
        const loadScript = (src) => new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });

        Promise.all([
          loadScript('https://unpkg.com/react@18/umd/react.development.js'),
          loadScript('https://unpkg.com/react-dom@18/umd/react-dom.development.js')
        ]).then(() => {
          // Código transformado
          ${transformedCode}
        }).catch(error => {
          console.error('Error loading React:', error);
          document.body.innerHTML = '<div style="color: red; padding: 20px;">Error loading React libraries</div>';
        });
      } else {
        // React ya está disponible, ejecutar directamente
        ${transformedCode}
      }
    `;

    return finalCode;
  } catch (error) {
    console.error('Bundling error:', error);
    throw error;
  }
};