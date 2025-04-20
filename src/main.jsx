// We hoeven process.env niet meer te definiëren omdat het al in index.html is gedefinieerd
// Dus verwijder die code en houd het simpel

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
// Nu we weten dat de minimale app werkt, kunnen we de App importeren
import App from './App';

console.log('PitchPro/src/main.jsx initialisatie gestart');

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Geen "root" element gevonden in de DOM. Controleer je index.html bestand.');
}

// Maak eerst een ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App rendering fout:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-red-600">Er is iets misgegaan</h1>
          <p>Er is een fout opgetreden bij het renderen van de applicatie:</p>
          <pre className="mt-4 p-4 bg-red-50 text-red-700 rounded overflow-auto">
            {this.state.error?.message || 'Onbekende fout'}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

// Rendert de echte App direct, nu we weten dat process.env werkt
const root = ReactDOM.createRoot(rootElement);
try {
  console.log('App renderen...');
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log('App rendering verzonden naar ReactDOM');
} catch (error) {
  console.error('Fout bij renderen van App:', error);
  document.getElementById('root').innerHTML = `
    <div style="padding: 20px; color: red;">
      <h1>Fout bij laden</h1>
      <p>${error.message}</p>
    </div>
  `;
} 