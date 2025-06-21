import { jsxs as c, jsx as o } from "react/jsx-runtime";
import { useState as i } from "react";
import * as l from "esbuild-wasm";
const d = () => ({
  name: "fetch-plugin",
  setup(e) {
    e.onResolve({ filter: /^(react|react-dom)$/ }, (t) => ({
      path: `https://esm.sh/${t.path}`,
      namespace: "a"
    })), e.onResolve({ filter: /.*/ }, (t) => ({
      path: `https://esm.sh/${t.path}`,
      namespace: "a"
    })), e.onLoad({ filter: /.*/ }, async (t) => ({
      contents: await (await fetch(t.path)).text(),
      loader: "tsx"
      // puedes cambiar a 'js' si solo manejas JS puro
    }));
  }
});
let a;
const u = async (e) => (a || (a = await l.initialize({
  wasmURL: "/esbuild.wasm",
  worker: !0
})), (await a.build({
  entryPoints: ["index.tsx"],
  bundle: !0,
  write: !1,
  plugins: [d()],
  stdin: {
    contents: e,
    resolveDir: "/",
    loader: "tsx"
  }
})).outputFiles[0].text), x = () => {
  const [e, t] = i(`
import React from "react";
import ReactDOM from "react-dom/client";

const App = () => <h1>Hola desde Rurybox</h1>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
  `);
  return /* @__PURE__ */ c("div", { className: "rurybox-container", children: [
    /* @__PURE__ */ o(
      "textarea",
      {
        className: "rurybox-textarea",
        value: e,
        onChange: (r) => t(r.target.value),
        title: "Editor de código",
        placeholder: "Escribe tu código JSX aquí"
      }
    ),
    /* @__PURE__ */ o("button", { className: "rurybox-button", onClick: async () => {
      try {
        const r = await u(e), s = document.getElementById("rurybox-preview");
        s && (s.srcdoc = `
          <html>
            <body>
              <div id="root"></div>
              <script>${r}<\/script>
            </body>
          </html>
        `);
      } catch (r) {
        console.error("Error ejecutando el código:", r);
      }
    }, children: "Ejecutar" }),
    /* @__PURE__ */ o(
      "iframe",
      {
        id: "rurybox-preview",
        sandbox: "allow-scripts",
        className: "rurybox-iframe",
        title: "Vista previa del código"
      }
    )
  ] });
};
export {
  x as Rurybox
};
