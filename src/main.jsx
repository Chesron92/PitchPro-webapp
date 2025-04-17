import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import './styles/globals.css';
import App from './App';

console.log('PitchPro/src/main.jsx initialisatie gestart');
=======
import '../PitchPro/src/styles/globals.css';
import App from '../PitchPro/src/App';

console.log('Main.jsx initialisatie gestart met correcte paden');
>>>>>>> 942dc2369d50106a2c8028d91f94d7fec6e282fa
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