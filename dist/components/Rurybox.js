import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        const iframe = document.getElementById('rurybox-preview');
        iframe.srcdoc = `
      <html>
        <body>
          <div id="root"></div>
          <script>${output}</script>
        </body>
      </html>
    `;
    };
    return (_jsxs("div", { children: [_jsx("textarea", { className: "rurybox-textarea", value: code, onChange: (e) => setCode(e.target.value), title: "Editor de c\u00F3digo", placeholder: "Escribe tu c\u00F3digo JSX aqu\u00ED" }), _jsx("button", { className: "rurybox-button", onClick: runCode, children: "Ejecutar" }), _jsx("iframe", { id: "rurybox-preview", sandbox: "allow-scripts", className: "rurybox-iframe", title: "Vista previa del c\u00F3digo" })] }));
};
//# sourceMappingURL=Rurybox.js.map