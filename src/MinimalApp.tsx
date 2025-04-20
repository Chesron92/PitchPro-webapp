import React, { useEffect, useState } from 'react';

const MinimalApp = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simuleer laden
      console.log('MinimalApp - eerste render');
      setTimeout(() => {
        console.log('MinimalApp - laden voltooid');
        setLoaded(true);
      }, 1000);
    } catch (err) {
      console.error('MinimalApp - fout tijdens laden:', err);
      setError(err instanceof Error ? err.message : 'Onbekende fout');
    }
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' 
    }}>
      <h1 style={{ color: '#4f46e5' }}>PitchPro</h1>
      
      {error ? (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#fee2e2', 
          border: '1px solid #ef4444', 
          borderRadius: '4px',
          color: '#b91c1c',
          marginTop: '20px'
        }}>
          <h2>Probleem bij het laden</h2>
          <p>{error}</p>
        </div>
      ) : !loaded ? (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p>App wordt geladen...</p>
        </div>
      ) : (
        <div>
          <p>De app is succesvol geladen. Dit is een minimale versie voor debuggen.</p>
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            backgroundColor: '#ecfdf5', 
            borderRadius: '4px',
            border: '1px solid #10b981'
          }}>
            <h2>Systeem informatie</h2>
            <p>User Agent: {navigator.userAgent}</p>
            <p>Huidige URL: {window.location.href}</p>
            <p>Window grootte: {window.innerWidth}x{window.innerHeight}</p>
          </div>
        </div>
      )}
      
      <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
      
      <div>
        <h2>Debug Tools</h2>
        <button 
          onClick={() => window.location.reload()} 
          style={{ 
            backgroundColor: '#4f46e5', 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '4px', 
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Pagina vernieuwen
        </button>
        
        <button 
          onClick={() => window.location.href = "/fallback.html"} 
          style={{ 
            backgroundColor: '#9ca3af', 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Bekijk fallback pagina
        </button>
      </div>
    </div>
  );
};

export default MinimalApp; 