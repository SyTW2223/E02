/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    /*
      * The default test runner is jest, but you can use any test runner you want.
      * For example, you can use mocha, ava, or even your own runner.
    */
   }
});
