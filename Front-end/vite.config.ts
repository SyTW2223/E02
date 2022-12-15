/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      BACK_HOST: JSON.stringify(process.env.BACK_HOST)
    }
  },
  base: './',
  test: {
    globals: true,
    environment: 'jsdom'
   }
});
