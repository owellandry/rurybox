import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/**/*'],
      exclude: ['src/**/*.test.*'],
      insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: resolve(dirname(fileURLToPath(import.meta.url)), 'src/index.ts'),
      name: 'Rurybox',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: (id) => {
        // Excluir React, ReactDOM y Babel
        return id.includes('react') || 
               id === 'react' || 
               id === 'react-dom' || 
               id === 'react/jsx-runtime' || 
               id === 'react-dom/client' ||
               id.includes('@babel/standalone')
      },
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
          '@babel/standalone': 'Babel'
        }
      }
    },
    cssCodeSplit: false
  }
})