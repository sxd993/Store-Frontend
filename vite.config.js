import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nodePolyfills({
      include: [
        'events',
        'buffer',
        'process',
      ],
    }),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
})
