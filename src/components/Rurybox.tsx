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

  const runCode = async () => {
    const output = await bundleCode(code);
    const iframe = document.getElementById('rurybox-preview') as HTMLIFrameElement;
    iframe.srcdoc = `
      <html>
        <body>
          <div id="root"></div>
          <script>${output}</script>
        </body>
      </html>
    `;
  };

  return (
    <div>
      <textarea
        className="rurybox-textarea"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        title="Editor de código"
        placeholder="Escribe tu código JSX aquí"
      />
      <button className="rurybox-button" onClick={runCode}>
        Ejecutar
      </button>
      <iframe
        id="rurybox-preview"
        sandbox="allow-scripts"
        className="rurybox-iframe"
        title="Vista previa del código"
      />
    </div>
  );
};
