import { defineConfig } from 'vite';
import paths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  root: './src',
  publicDir: '../public',
  base: './',
  build: {
    emptyOutDir: true,
    outDir: '../dist'
  },
  plugins: [
    paths({ root: '../' }),
    react({ plugins: [] })
  ],
});
