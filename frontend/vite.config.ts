import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Necessário para expor o servidor para fora do container
    port: 5173,
    watch: {
      usePolling: true // Necessário para hot-reload funcionar no Docker
    }
  }
})
