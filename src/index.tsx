import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
// Import de MinimalApp voor debug-doeleinden
import MinimalApp from './MinimalApp';

console.log('Index.tsx initialisatie gestart (debug modus)');
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Geen "root" element gevonden in de DOM. Controleer je index.html bestand.');
}

console.log('Root element gevonden, gaat nu debug app renderen');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* Gebruik MinimalApp voor diagnose */}
    <MinimalApp />
  </React.StrictMode>
); 
console.log('Rendering verzonden naar ReactDOM'); 