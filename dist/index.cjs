"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react/jsx-runtime"),n=require("react"),g=require("@babel/standalone"),x=async o=>{try{const r=g.transform(o,{presets:[["react",{runtime:"automatic",development:!0,useBuiltIns:!0}],["env",{targets:{browsers:["> 1%"]},modules:!1,loose:!0}]],plugins:[["transform-runtime",{corejs:!1,helpers:!0,regenerator:!0,useESModules:!0}]],filename:"sandbox.tsx",sourceMaps:!1});if(!(r!=null&&r.code))throw new Error("No se pudo transformar el código");const s=b(r.code);return y(s)}catch(r){throw console.error("Error en bundleCode:",r),r instanceof SyntaxError?new Error(`Error de sintaxis: ${r.message}`):new Error(r instanceof Error?`Error de compilación: ${r.message}`:"Error desconocido en la compilación")}};function b(o){return o.replace(/import\s+.*?\s+from\s+['"]react['"];?\s*/g,"").replace(/import\s+.*?\s+from\s+['"]react-dom.*?['"];?\s*/g,"").replace(/import\s+.*?\s+from\s+['"].*?['"];?\s*/g,"")}function y(o){return`
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
        ${o}
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
  `}const h=()=>{const[o,r]=n.useState(`import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>¡Hola desde Rurybox! 🚀</h1>
      <p>Contador: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Incrementar
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);`),[s,a]=n.useState(!1),[c,i]=n.useState(null),[u,p]=n.useState(0);n.useEffect(()=>{const t=setTimeout(()=>{Date.now()-u>1e3&&d()},1e3);return()=>clearTimeout(t)},[o]),n.useEffect(()=>{p(Date.now())},[o]);const d=async()=>{a(!0),i(null);try{const t=await x(o),l=document.getElementById("rurybox-preview");l&&(l.srcdoc=`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Rurybox Preview</title>
              <style>
                body { 
                  margin: 0; 
                  padding: 0; 
                  font-family: system-ui, -apple-system, sans-serif; 
                  background: white;
                }
                #root { 
                  min-height: 100vh; 
                  display: flex;
                  flex-direction: column;
                }
                * {
                  box-sizing: border-box;
                }
              </style>
            </head>
            <body>
              <div id="root"></div>
              <script>
                window.onerror = function(msg, url, lineNo, columnNo, error) {
                  document.body.innerHTML = \`
                    <div style="padding: 20px; color: #d32f2f; background: #ffebee; border-left: 4px solid #d32f2f; margin: 20px;">
                      <h3>⚠️ Error de Ejecución</h3>
                      <p><strong>Mensaje:</strong> \${msg}</p>
                      <p><strong>Línea:</strong> \${lineNo}</p>
                      <p><strong>Columna:</strong> \${columnNo}</p>
                    </div>
                  \`;
                  return true;
                };
                
                try {
                  ${t}
                } catch (error) {
                  document.body.innerHTML = \`
                    <div style="padding: 20px; color: #d32f2f; background: #ffebee; border-left: 4px solid #d32f2f; margin: 20px;">
                      <h3>⚠️ Error de Compilación</h3>
                      <p>\${error.message}</p>
                    </div>
                  \`;
                }
              <\/script>
            </body>
          </html>
        `)}catch(t){console.error("Error ejecutando el código:",t),i(t instanceof Error?t.message:"Error desconocido")}finally{a(!1)}},m=()=>{d()},f=()=>{r(`import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>¡Hola desde Rurybox! 🚀</h1>
      <p>Escribe tu código React aquí</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);`)};return e.jsxs("div",{className:"rurybox-container",children:[e.jsxs("div",{className:"rurybox-header",children:[e.jsx("h3",{children:"🚀 Rurybox - React Live Editor"}),e.jsxs("div",{className:"rurybox-status",children:[s&&e.jsx("span",{className:"rurybox-status-loading",children:"⚡ Compilando..."}),!s&&!c&&e.jsx("span",{className:"rurybox-status-success",children:"✅ Listo"})]})]}),e.jsx("textarea",{className:"rurybox-textarea",value:o,onChange:t=>r(t.target.value),title:"Editor de código",placeholder:"Escribe tu código JSX aquí...",disabled:s}),e.jsxs("div",{className:"rurybox-controls",children:[e.jsx("button",{className:"rurybox-button primary",onClick:m,disabled:s,children:s?"Ejecutando...":"▶️ Ejecutar"}),e.jsx("button",{className:"rurybox-button secondary",onClick:f,disabled:s,children:"🔄 Reset"}),e.jsx("div",{className:"rurybox-info",children:e.jsx("small",{children:"💡 Los cambios se ejecutan automáticamente"})}),c&&e.jsxs("div",{className:"rurybox-error",children:[e.jsx("strong",{children:"⚠️ Error:"})," ",c]})]}),e.jsx("iframe",{id:"rurybox-preview",sandbox:"allow-scripts",className:"rurybox-iframe",title:"Vista previa del código"})]})};exports.Rurybox=h;
