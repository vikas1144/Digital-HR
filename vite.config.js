import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
    allowedHosts: [
      '0731faa50dc1.ngrok-free.app', // 👈 apna ngrok domain yaha dal
    ],
  },
  optimizeDeps: {
    include: ['react-is']
  }
})
