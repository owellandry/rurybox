export const fetchPlugin = () => {
  return {
    name: 'fetch-plugin',
    setup(build: any) {
      // Resolver "root" imports como react, react-dom, etc.
      build.onResolve({ filter: /^(react|react-dom)$/ }, (args: any) => {
        return {
          path: `https://esm.sh/${args.path}`,
          namespace: 'a',
        };
      });

      // Resolver otros imports relativos o de otros paquetes
      build.onResolve({ filter: /.*/ }, (args: any) => {
        return {
          path: `https://esm.sh/${args.path}`,
          namespace: 'a',
        };
      });

      // Descargar y devolver el contenido del módulo
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const response = await fetch(args.path);
        const text = await response.text();

        return {
          contents: text,
          loader: 'tsx', // puedes cambiar a 'js' si solo manejas JS puro
        };
      });
    },
  };
};
