import { jsxs as a, jsx as i } from "react/jsx-runtime";
import { useState as n } from "react";
import * as m from "esbuild-wasm";
const p = () => ({
  name: "fetch-plugin",
  setup(r) {
    r.onResolve({ filter: /^(react|react-dom)$/ }, (e) => ({
      path: `https://esm.sh/${e.path}`,
      namespace: "a"
    })), r.onResolve({ filter: /.*/ }, (e) => ({
      path: `https://esm.sh/${e.path}`,
      namespace: "a"
    })), r.onLoad({ filter: /.*/ }, async (e) => ({
      contents: await (await fetch(e.path)).text(),
      loader: "tsx"
      // puedes cambiar a 'js' si solo manejas JS puro
    }));
  }
});
let c;
const h = async (r) => {
  if (!c)
    try {
      c = await m.initialize({
        wasmURL: "https://unpkg.com/esbuild-wasm@0.19.0/esbuild.wasm",
        worker: !0
      });
    } catch (e) {
      throw console.error("Error initializing esbuild:", e), new Error("Failed to initialize esbuild.");
    }
  try {
    return (await c.build({
      entryPoints: ["index.tsx"],
      bundle: !0,
      write: !1,
      plugins: [p()],
      stdin: {
        contents: r,
        resolveDir: "/",
        loader: "tsx"
      }
    })).outputFiles[0].text;
  } catch (e) {
    throw console.error("Error bundling code:", e), e;
  }
}, f = () => {
  const [r, e] = n(`
import React from "react";
import ReactDOM from "react-dom/client";

const App = () => <h1>Hola desde Rurybox</h1>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
  `), [o, s] = n(!1), [l, d] = n(null);
  return /* @__PURE__ */ a("div", { className: "rurybox-container", children: [
    /* @__PURE__ */ i(
      "textarea",
      {
        className: "rurybox-textarea",
        value: r,
        onChange: (t) => e(t.target.value),
        title: "Editor de código",
        placeholder: "Escribe tu código JSX aquí",
        disabled: o
      }
    ),
    /* @__PURE__ */ a("div", { className: "rurybox-controls", children: [
      /* @__PURE__ */ i(
        "button",
        {
          className: "rurybox-button",
          onClick: async () => {
            s(!0), d(null);
            try {
              const t = await h(r), u = document.getElementById("rurybox-preview");
              u && (u.srcdoc = `
          <html>
            <head>
              <style>
                body { margin: 0; padding: 20px; font-family: system-ui, sans-serif; }
                #root { min-height: 100vh; }
              </style>
            </head>
            <body>
              <div id="root"></div>
              <script>${t}<\/script>
            </body>
          </html>
        `);
            } catch (t) {
              console.error("Error ejecutando el código:", t), d(t instanceof Error ? t.message : "Error desconocido");
            } finally {
              s(!1);
            }
          },
          disabled: o,
          children: o ? "Ejecutando..." : "Ejecutar"
        }
      ),
      l && /* @__PURE__ */ a("div", { className: "rurybox-error", children: [
        "Error: ",
        l
      ] })
    ] }),
    /* @__PURE__ */ i(
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
  f as Rurybox
};
