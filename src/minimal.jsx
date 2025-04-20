// Minimale React setup met process.env polyfill
// Polyfill voor process.env voor Vite + React
window.process = {
  env: {
    NODE_ENV: 'development'
  }
};

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.simple';  // Terug naar de eenvoudige versie

console.log('Minimale React app wordt geïnitialiseerd');

// Root element zoeken en app renderen
const root = document.getElementById('root');
if (root) {
  console.log('Root element gevonden, render App.simple component');
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('App.simple succesvol gerenderd');
} else {
  console.error('FOUT: Root element niet gevonden!');
} 