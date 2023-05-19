import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        "sign-in": resolve(root, 'sign-in', 'index.html'),
        // "log-in": resolve(root, 'log-in', 'index.html'),
      }
    },
    target: 'esnext'
  }
})