import { useState, useEffect } from 'react';
import { bundleCode } from '../bundler';
import '../styles/rurybox.css';

export const Rurybox = () => {
  const [code, setCode] = useState(`import React from "react";
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
root.render(<App />);`);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<number>(0);

  // Auto-run con debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (Date.now() - lastUpdate > 1000) { // 1 segundo de debounce
        runCode();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [code]);

  useEffect(() => {
    setLastUpdate(Date.now());
  }, [code]);

  const runCode = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const output = await bundleCode(code);
      const iframe = document.getElementById('rurybox-preview') as HTMLIFrameElement;
      
      if (iframe) {
        iframe.srcdoc = `
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
                  ${output}
                } catch (error) {
                  document.body.innerHTML = \`
                    <div style="padding: 20px; color: #d32f2f; background: #ffebee; border-left: 4px solid #d32f2f; margin: 20px;">
                      <h3>⚠️ Error de Compilación</h3>
                      <p>\${error.message}</p>
                    </div>
                  \`;
                }
              </script>
            </body>
          </html>
        `;
      }
    } catch (error) {
      console.error('Error ejecutando el código:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualRun = () => {
    runCode();
  };

  const resetCode = () => {
    setCode(`import React from "react";
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
root.render(<App />);`);
  };

  return (
    <div className="rurybox-container">
      <div className="rurybox-header">
        <h3>🚀 Rurybox - React Live Editor</h3>
        <div className="rurybox-status">
          {isLoading && <span className="rurybox-status-loading">⚡ Compilando...</span>}
          {!isLoading && !error && <span className="rurybox-status-success">✅ Listo</span>}
        </div>
      </div>
      
      <textarea
        className="rurybox-textarea"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        title="Editor de código"
        placeholder="Escribe tu código JSX aquí..."
        disabled={isLoading}
      />
      
      <div className="rurybox-controls">
        <button 
          className="rurybox-button primary" 
          onClick={handleManualRun}
          disabled={isLoading}
        >
          {isLoading ? 'Ejecutando...' : '▶️ Ejecutar'}
        </button>
        
        <button 
          className="rurybox-button secondary" 
          onClick={resetCode}
          disabled={isLoading}
        >
          🔄 Reset
        </button>
        
        <div className="rurybox-info">
          <small>💡 Los cambios se ejecutan automáticamente</small>
        </div>
        
        {error && (
          <div className="rurybox-error">
            <strong>⚠️ Error:</strong> {error}
          </div>
        )}
      </div>
      
      <iframe
        id="rurybox-preview"
        sandbox="allow-scripts"
        className="rurybox-iframe"
        title="Vista previa del código"
      />
    </div>
  );
};