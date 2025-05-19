// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Añade el plugin de React
  css: {
    postcss: './postcss.config.js', // Indica la ubicación del archivo de configuración de PostCSS
  },
});
