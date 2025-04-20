import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('[DEBUG] index.tsx wordt uitgevoerd');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('[DEBUG] FATAL: Root element (#root) niet gevonden!');
  throw new Error('Geen "root" element gevonden in de DOM. Controleer je index.html bestand.');
} else {
  console.log('[DEBUG] Root element (#root) gevonden.');
}

try {
  console.log('[DEBUG] Poging tot ReactDOM.createRoot');
  const root = ReactDOM.createRoot(rootElement);
  console.log('[DEBUG] Poging tot root.render met simpele h1');
  root.render(
    <React.StrictMode>
      <h1>Hallo Wereld! (React Test)</h1>
    </React.StrictMode>
  );
  console.log('[DEBUG] root.render aangeroepen.');
} catch (error) {
  console.error('[DEBUG] Fout tijdens createRoot of render:', error);
} 