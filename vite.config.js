import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Open browser automatisch
    host: true, // Luister op alle IP-adressen
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true, // Maak source maps voor debugging
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Chunk for React
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router-dom/')) {
            return 'react-vendor';
          }
          
          // Chunks for Firebase - split into smaller parts
          if (id.includes('node_modules/firebase/app/')) {
            return 'firebase-app';
          }
          if (id.includes('node_modules/firebase/auth/')) {
            return 'firebase-auth';
          }
          if (id.includes('node_modules/firebase/firestore/')) {
            return 'firebase-firestore';
          }
          if (id.includes('node_modules/firebase/storage/')) {
            return 'firebase-storage';
          }
          if (id.includes('node_modules/firebase/') && !id.includes('node_modules/firebase/app/') && 
                                                       !id.includes('node_modules/firebase/auth/') && 
                                                       !id.includes('node_modules/firebase/firestore/') && 
                                                       !id.includes('node_modules/firebase/storage/')) {
            return 'firebase-other';
          }
          
          // Chunk for date-related libraries
          if (id.includes('node_modules/date-fns/') ||
              id.includes('node_modules/react-datepicker/')) {
            return 'date-vendor';
          }
          
          // Chunk for UI libraries
          if (id.includes('node_modules/@mui/') ||
              id.includes('node_modules/@emotion/') ||
              id.includes('node_modules/@headlessui/')) {
            return 'ui-vendor';
          }
          
          // Chunk for forms and validation
          if (id.includes('node_modules/react-hook-form/')) {
            return 'form-vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 600, // Verhoog de waarschuwingslimiet een beetje
  },
  // Geef expliciet aan dat de root van het project in PitchPro zit
  // root: path.resolve(__dirname, '.'), // Verwijderd, Vite zou dit automatisch moeten vinden
}); 