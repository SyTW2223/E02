/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
  plugins: [react()],
  define: {
    BACK_HOST: JSON.stringify(env.VITE_BACK_HOST),
  },
  base: './',
  test: {
    globals: true,
    environment: 'jsdom'
   }
  }
});
