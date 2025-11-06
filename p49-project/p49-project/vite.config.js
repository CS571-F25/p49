import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/p49/',
  build: { outDir: '../docs' },   // go up one folder
  plugins: [react()]
})
