import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@inflearn/ds-react': path.resolve(__dirname, './src/ds-react.ts'),
      '@inflearn/react-fontawesome': path.resolve(__dirname, './src/fontawesome-alias.ts'),
      '@inflearn/pro-regular-svg-icons': path.resolve(__dirname, './src/icons-alias.ts'),
      '@inflearn/pro-solid-svg-icons': path.resolve(__dirname, './src/icons-alias.ts'),
    },
  },
})
