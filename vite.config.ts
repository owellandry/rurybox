import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'Rurybox',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'esbuild-wasm'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'esbuild-wasm': 'esbuild'
        }
      }
    },
    cssCodeSplit: false
  }
})