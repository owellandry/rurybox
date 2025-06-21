import * as esbuild from 'esbuild-wasm';
import { fetchPlugin } from '../plugins/fetchPlugin';

let service: any;

export const bundleCode = async (rawCode: string) => {
  if (!service) {
    try {
      service = await esbuild.initialize({
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.19.0/esbuild.wasm',
        worker: true,
      });
    } catch (error) {
      console.error('Error initializing esbuild:', error);
      throw new Error('Failed to initialize esbuild.');
    }
  }

  try {
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
  } catch (error) {
    console.error('Error bundling code:', error);
    throw error;
  }
};