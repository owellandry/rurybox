"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("react/jsx-runtime"),n=require("react"),m=require("esbuild-wasm");function p(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const s=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,s.get?s:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const b=p(m),y=()=>({name:"fetch-plugin",setup(t){t.onResolve({filter:/^(react|react-dom)$/},e=>({path:`https://esm.sh/${e.path}`,namespace:"a"})),t.onResolve({filter:/.*/},e=>({path:`https://esm.sh/${e.path}`,namespace:"a"})),t.onLoad({filter:/.*/},async e=>({contents:await(await fetch(e.path)).text(),loader:"tsx"}))}});let i;const f=async t=>{if(!i)try{i=await b.initialize({wasmURL:`${window.location.origin}/esbuild.wasm`,worker:!0})}catch(e){throw console.error("Error initializing esbuild:",e),new Error("Failed to initialize esbuild. Make sure esbuild.wasm is in your public folder.")}try{return(await i.build({entryPoints:["index.tsx"],bundle:!0,write:!1,plugins:[y()],stdin:{contents:t,resolveDir:"/",loader:"tsx"}})).outputFiles[0].text}catch(e){throw console.error("Error bundling code:",e),e}},h=()=>{const[t,e]=n.useState(`
import React from "react";
import ReactDOM from "react-dom/client";

const App = () => <h1>Hola desde Rurybox</h1>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
  `),[r,s]=n.useState(!1),[c,l]=n.useState(null),d=async()=>{s(!0),l(null);try{const o=await f(t),u=document.getElementById("rurybox-preview");u&&(u.srcdoc=`
          <html>
            <head>
              <style>
                body { margin: 0; padding: 20px; font-family: system-ui, sans-serif; }
                #root { min-height: 100vh; }
              </style>
            </head>
            <body>
              <div id="root"></div>
              <script>${o}<\/script>
            </body>
          </html>
        `)}catch(o){console.error("Error ejecutando el código:",o),l(o instanceof Error?o.message:"Error desconocido")}finally{s(!1)}};return a.jsxs("div",{className:"rurybox-container",children:[a.jsx("textarea",{className:"rurybox-textarea",value:t,onChange:o=>e(o.target.value),title:"Editor de código",placeholder:"Escribe tu código JSX aquí",disabled:r}),a.jsxs("div",{className:"rurybox-controls",children:[a.jsx("button",{className:"rurybox-button",onClick:d,disabled:r,children:r?"Ejecutando...":"Ejecutar"}),c&&a.jsxs("div",{className:"rurybox-error",children:["Error: ",c]})]}),a.jsx("iframe",{id:"rurybox-preview",sandbox:"allow-scripts",className:"rurybox-iframe",title:"Vista previa del código"})]})};exports.Rurybox=h;
