// Process polyfill voor browser-omgeving
// Dit bestand moet als eerste worden geïmporteerd
window.process = window.process || {};
window.process.env = window.process.env || {};
window.process.env.NODE_ENV = window.process.env.NODE_ENV || 'development';

// Firebase configuratie waarden
window.process.env.REACT_APP_FIREBASE_API_KEY = 'AIzaSyAiTY14VexbFUQTf3yKhDPhrCtKjRzhMwQ';
window.process.env.REACT_APP_FIREBASE_AUTH_DOMAIN = 'pitchpro-29e90.firebaseapp.com';
window.process.env.REACT_APP_FIREBASE_PROJECT_ID = 'pitchpro-29e90';
window.process.env.REACT_APP_FIREBASE_STORAGE_BUCKET = 'pitchpro-29e90.firebasestorage.app';
window.process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID = '121788535713';
window.process.env.REACT_APP_FIREBASE_APP_ID = '1:121788535713:web:9c5ddf4ff9af0a0e2ff1e0';
window.process.env.REACT_APP_FIREBASE_MEASUREMENT_ID = 'G-QGBR93ZYCM';

console.log('Process polyfill geladen', window.process.env.NODE_ENV); 