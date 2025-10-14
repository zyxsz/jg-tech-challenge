import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { resolve } from 'node:path'
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nitroV2Plugin(), viteReact(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
