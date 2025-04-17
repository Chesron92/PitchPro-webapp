import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Gebruik relatieve paden voor assets
  server: {
    open: true, // Open browser automatisch
    host: true, // Luister op alle IP-adressen
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true, // Maak source maps voor debugging
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './PitchPro/src'), // Alias voor de src map
    },
  },
  // Geef expliciet aan dat de root van het project in PitchPro zit
  root: path.resolve(__dirname, '.'),
}); 