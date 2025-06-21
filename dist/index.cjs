"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("react/jsx-runtime"),c=require("react"),i=require("esbuild-wasm");function u(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const o in e)if(o!=="default"){const r=Object.getOwnPropertyDescriptor(e,o);Object.defineProperty(t,o,r.get?r:{enumerable:!0,get:()=>e[o]})}}return t.default=e,Object.freeze(t)}const l=u(i),d=()=>({name:"fetch-plugin",setup(e){e.onResolve({filter:/^(react|react-dom)$/},t=>({path:`https://esm.sh/${t.path}`,namespace:"a"})),e.onResolve({filter:/.*/},t=>({path:`https://esm.sh/${t.path}`,namespace:"a"})),e.onLoad({filter:/.*/},async t=>({contents:await(await fetch(t.path)).text(),loader:"tsx"}))}});let a;const p=async e=>(a||(a=await l.initialize({wasmURL:"/esbuild.wasm",worker:!0})),(await a.build({entryPoints:["index.tsx"],bundle:!0,write:!1,plugins:[d()],stdin:{contents:e,resolveDir:"/",loader:"tsx"}})).outputFiles[0].text),m=()=>{const[e,t]=c.useState(`
import React from "react";
import ReactDOM from "react-dom/client";

const App = () => <h1>Hola desde Rurybox</h1>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
  `),o=async()=>{try{const r=await p(e),n=document.getElementById("rurybox-preview");n&&(n.srcdoc=`
          <html>
            <body>
              <div id="root"></div>
              <script>${r}<\/script>
            </body>
          </html>
        `)}catch(r){console.error("Error ejecutando el código:",r)}};return s.jsxs("div",{className:"rurybox-container",children:[s.jsx("textarea",{className:"rurybox-textarea",value:e,onChange:r=>t(r.target.value),title:"Editor de código",placeholder:"Escribe tu código JSX aquí"}),s.jsx("button",{className:"rurybox-button",onClick:o,children:"Ejecutar"}),s.jsx("iframe",{id:"rurybox-preview",sandbox:"allow-scripts",className:"rurybox-iframe",title:"Vista previa del código"})]})};exports.Rurybox=m;
