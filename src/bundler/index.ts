import { transform } from '@babel/standalone';

// Función para transformar código JSX/TSX a JavaScript ejecutable
export const bundleCode = async (rawCode: string): Promise<string> => {
  try {
    // Configuración de Babel para transformar JSX
    const result = transform(rawCode, {
      presets: [
        ['react', { 
          runtime: 'automatic',
          development: true,
          useBuiltIns: true
        }],
        ['env', { 
          targets: { browsers: ['> 1%'] },
          modules: false,
          loose: true
        }]
      ],
      plugins: [
        ['transform-runtime', { 
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: true
        }]
      ],
      filename: 'sandbox.tsx',
      sourceMaps: false
    });

    if (!result?.code) {
      throw new Error('No se pudo transformar el código');
    }

    // Procesar imports y generar código ejecutable
    const processedCode = processImports(result.code);
    
    // Generar el código final con manejo de React
    const finalCode = generateExecutableCode(processedCode);
    
    return finalCode;
  } catch (error) {
    console.error('Error en bundleCode:', error);
    
    if (error instanceof SyntaxError) {
      throw new Error(`Error de sintaxis: ${error.message}`);
    }
    
    throw new Error(
      error instanceof Error 
        ? `Error de compilación: ${error.message}` 
        : 'Error desconocido en la compilación'
    );
  }
};

// Procesar imports y convertirlos a código ejecutable
function processImports(code: string): string {
  // Remover imports de React/ReactDOM y usar referencias globales
  let processedCode = code
    // Remover imports de React
    .replace(/import\s+.*?\s+from\s+['"]react['"];?\s*/g, '')
    .replace(/import\s+.*?\s+from\s+['"]react-dom.*?['"];?\s*/g, '')
    // Remover import statements generales que no podemos resolver
    .replace(/import\s+.*?\s+from\s+['"].*?['"];?\s*/g, '');

  return processedCode;
}

// Generar código ejecutable con React/ReactDOM disponibles
function generateExecutableCode(transformedCode: string): string {
  return `
    (async function() {
      // Asegurar que React y ReactDOM estén disponibles
      if (typeof window.React === 'undefined' || typeof window.ReactDOM === 'undefined') {
        // Cargar React y ReactDOM dinámicamente
        await loadReactLibraries();
      }

      // Aliases para React
      const React = window.React;
      const ReactDOM = window.ReactDOM;
      const { useState, useEffect, useContext, useReducer, useCallback, useMemo } = React;

      // Función para crear elementos JSX
      const jsx = React.createElement;
      const jsxs = React.createElement;
      const Fragment = React.Fragment;

      try {
        // Código transformado del usuario
        ${transformedCode}
      } catch (error) {
        console.error('Error ejecutando código del usuario:', error);
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = \`
          <div style="padding: 20px; color: #d32f2f; background: #ffebee; border-left: 4px solid #d32f2f; margin: 20px; border-radius: 4px;">
            <h3 style="margin: 0 0 10px 0;">⚠️ Error de Ejecución</h3>
            <p style="margin: 0;"><strong>Mensaje:</strong> \${error.message}</p>
          </div>
        \`;
        document.body.appendChild(errorDiv);
      }

      // Función para cargar React y ReactDOM
      async function loadReactLibraries() {
        if (window.React && window.ReactDOM) return;

        const loadScript = (src) => new Promise((resolve, reject) => {
          if (document.querySelector(\`script[src="\${src}"]\`)) {
            resolve(true);
            return;
          }
          
          const script = document.createElement('script');
          script.src = src;
          script.crossOrigin = 'anonymous';
          script.onload = () => resolve(true);
          script.onerror = () => reject(new Error(\`Failed to load \${src}\`));
          document.head.appendChild(script);
        });

        try {
          await loadScript('https://unpkg.com/react@18/umd/react.development.js');
          await loadScript('https://unpkg.com/react-dom@18/umd/react-dom.development.js');
          
          // Verificar que se cargaron correctamente
          if (!window.React || !window.ReactDOM) {
            throw new Error('React libraries failed to load properly');
          }
        } catch (error) {
          console.error('Error loading React:', error);
          document.body.innerHTML = \`
            <div style="padding: 20px; color: #d32f2f; background: #ffebee; border-left: 4px solid #d32f2f; margin: 20px;">
              <h3>⚠️ Error cargando React</h3>
              <p>No se pudieron cargar las librerías de React. Verifica tu conexión a internet.</p>
            </div>
          \`;
          throw error;
        }
      }
    })();
  `;
}