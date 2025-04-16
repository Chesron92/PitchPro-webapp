import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';

console.log('PitchPro/src/main.jsx initialisatie gestart');
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