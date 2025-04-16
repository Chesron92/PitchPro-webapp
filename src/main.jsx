import React from 'react';
import ReactDOM from 'react-dom/client';
import '../PitchPro/src/styles/globals.css';
import App from '../PitchPro/src/App';

console.log('Main.jsx initialisatie gestart met correcte paden');
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Geen "root" element gevonden in de DOM. Controleer je index.html bestand.');
}

console.log('Root element gevonden, gaat nu app renderen');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log('Rendering verzonden naar ReactDOM'); 