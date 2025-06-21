import * as esbuild from 'esbuild-wasm';
import { fetchPlugin } from '../plugins/fetchPlugin';
let service;
export const bundleCode = async (rawCode) => {
    if (!service) {
        service = await esbuild.initialize({
            wasmURL: '/esbuild.wasm',
            worker: true,
        });
    }
    const result = await service.build({
        entryPoints: ['index.tsx'],
        bundle: true,
        write: false,
        plugins: [fetchPlugin()],
        stdin: {
            contents: rawCode,
            resolveDir: '/',
            loader: 'tsx',
        },
    });
    return result.outputFiles[0].text;
};
//# sourceMappingURL=index.js.map