import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Build in un unico file HTML da aprire con doppio clic dalla cartella del progetto:
// le fotografie vengono lette da ./public/images.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  publicDir: false,
  define: { 'import.meta.env.VITE_IMG_BASE': JSON.stringify('./public/images/') },
  build: { outDir: 'dist-single', target: 'es2020', chunkSizeWarningLimit: 3000 },
});
