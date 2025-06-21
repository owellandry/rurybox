import { useState } from 'react';
import { bundleCode } from '../bundler';
import '../styles/rurybox.css';

export const Rurybox = () => {
  const [code, setCode] = useState(`
import React from "react";
import ReactDOM from "react-dom/client";

const App = () => <h1>Hola desde Rurybox</h1>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
  `);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runCode = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const output = await bundleCode(code);
      const iframe = document.getElementById('rurybox-preview') as HTMLIFrameElement;
      
      if (iframe) {
        iframe.srcdoc = `
          <html>
            <head>
              <style>
                body { margin: 0; padding: 20px; font-family: system-ui, sans-serif; }
                #root { min-height: 100vh; }
              </style>
            </head>
            <body>
              <div id="root"></div>
              <script>${output}</script>
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

  return (
    <div className="rurybox-container">
      <textarea
        className="rurybox-textarea"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        title="Editor de código"
        placeholder="Escribe tu código JSX aquí"
        disabled={isLoading}
      />
      
      <div className="rurybox-controls">
        <button 
          className="rurybox-button" 
          onClick={runCode}
          disabled={isLoading}
        >
          {isLoading ? 'Ejecutando...' : 'Ejecutar'}
        </button>
        
        {error && (
          <div className="rurybox-error">
            Error: {error}
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