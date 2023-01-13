/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      BACK_HOST: process.env.BACK_HOST
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['lcov', 'json', 'html'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/_services/**'],
    },
  },
});
