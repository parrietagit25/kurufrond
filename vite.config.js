import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 100000000,
  },
  /*server: {
    https: {
      key: '/etc/ssl/private/1599616341.grupopcr.com.pa.key',
      cert: '/etc/ssl/certs/1599616341.grupopcr.com.pa.crt',
    },
  },*/
})
