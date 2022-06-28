import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import dsv from '@rollup/plugin-dsv'

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  // base: path.resolve(__dirname, './dist'),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [vue(),], // dsv(),
})
