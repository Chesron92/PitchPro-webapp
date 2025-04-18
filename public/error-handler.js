// Error handler script om problemen te detecteren
console.log('Error handler script geladen');

window.onerror = function(message, source, lineno, colno, error) {
  console.error('Globale fout opgevangen:', {
    message,
    source,
    lineno,
    colno,
    error: error ? error.stack : 'Geen stack trace beschikbaar'
  });
  
  // Toon een foutmelding voor de gebruiker
  const rootElement = document.getElementById('root');
  if (rootElement && rootElement.children.length === 0) {
    const errorDiv = document.createElement('div');
    errorDiv.style.padding = '20px';
    errorDiv.style.margin = '20px';
    errorDiv.style.backgroundColor = '#ffebee';
    errorDiv.style.border = '1px solid #ef5350';
    errorDiv.style.borderRadius = '4px';
    errorDiv.style.fontFamily = 'Arial, sans-serif';
    
    errorDiv.innerHTML = `
      <h2 style="color: #d32f2f; margin-top: 0;">Problemen bij het laden van de app</h2>
      <p>Er is een probleem opgetreden bij het laden van de applicatie. Dit kan worden veroorzaakt door:</p>
      <ul>
        <li>Een tijdelijk netwerkprobleem</li>
        <li>Een probleem met je browser cache</li>
        <li>Een technisch probleem met de applicatie</li>
      </ul>
      <p>Probeer de volgende stappen:</p>
      <ol>
        <li>Vernieuw de pagina (F5 of Ctrl+R)</li>
        <li>Leeg je browsercache (Ctrl+Shift+Delete)</li>
        <li>Probeer een andere browser</li>
      </ol>
      <p>Als het probleem aanhoudt, neem contact op met ondersteuning.</p>
      <div style="margin-top: 15px; font-size: 0.8em; color: #777;">
        Technische informatie: ${message} (${source}:${lineno}:${colno})
      </div>
    `;
    
    rootElement.appendChild(errorDiv);
  }
  
  return false;
};

// Controleer na 5 seconden of er content is in de root div
setTimeout(function() {
  const rootElement = document.getElementById('root');
  if (rootElement && (rootElement.children.length === 0 || 
      (rootElement.children.length === 1 && rootElement.children[0].tagName === 'DIV' && rootElement.children[0].children.length === 0))) {
    console.warn('App lijkt niet te laden! Root element nog leeg na 5 seconden.');
    
    // Toon een melding voor de gebruiker
    const errorDiv = document.createElement('div');
    errorDiv.style.padding = '20px';
    errorDiv.style.margin = '20px';
    errorDiv.style.backgroundColor = '#fff3e0';
    errorDiv.style.border = '1px solid #ff9800';
    errorDiv.style.borderRadius = '4px';
    errorDiv.style.fontFamily = 'Arial, sans-serif';
    
    errorDiv.innerHTML = `
      <h2 style="color: #e65100; margin-top: 0;">App laadt niet correct</h2>
      <p>De applicatie lijkt niet correct te laden. Dit kan worden veroorzaakt door:</p>
      <ul>
        <li>Een langzame internetverbinding</li>
        <li>JavaScript is uitgeschakeld in je browser</li>
        <li>Een probleem met je browser cache</li>
        <li>Een technisch probleem met de applicatie</li>
      </ul>
      <p>Probeer de volgende stappen:</p>
      <ol>
        <li>Controleer je internetverbinding</li>
        <li>Zorg dat JavaScript is ingeschakeld in je browser</li>
        <li>Vernieuw de pagina (F5 of Ctrl+R)</li>
        <li>Leeg je browsercache (Ctrl+Shift+Delete)</li>
        <li>Probeer een andere browser</li>
      </ol>
      <button style="background-color: #ff9800; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;" 
              onclick="window.location.reload()">
        Pagina vernieuwen
      </button>
    `;
    
    rootElement.appendChild(errorDiv);
  }
}, 5000);

// Globale error handler voor PitchPro
window.addEventListener('error', function(event) {
  console.error('Global error caught:', event.error);
  
  // Hier kun je errormeldingen loggen naar een externe service
  // of ervoor kiezen om een gebruiksvriendelijke foutmelding te tonen
  
  // Voorkom standaard browser error pagina
  event.preventDefault();
}); 