/// <reference types="vite/client" />

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuratie uit omgevingsvariabelen
// Bij gebruik, maak een .env bestand met deze variabelen
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || import.meta.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || import.meta.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Debug: Log de omgevingsvariabelen
console.log('Firebase omgevingsvariabelen status:');
console.log('API Key aanwezig:', !!(import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.REACT_APP_FIREBASE_API_KEY));
console.log('Auth Domain aanwezig:', !!(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN));
console.log('Project ID aanwezig:', !!(import.meta.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.REACT_APP_FIREBASE_PROJECT_ID));

// Als er geen omgevingsvariabelen zijn gevonden, gebruik deze fallback
// en toon een waarschuwing
if (!firebaseConfig.apiKey) {
  console.warn(
    'Firebase configuratie niet gevonden in environment variables. ' +
    'Gebruik van fallback configuratie. ' +
    'Voor productieomgevingen, zorg ervoor dat je .env.local correct is ingesteld.'
  );
  
  // Directe configuratie als fallback
  firebaseConfig.apiKey = "AIzaSyAiTY14VexbFUQTf3yKhDPhrCtKjRzhMwQ";
  firebaseConfig.authDomain = "pitchpro-29e90.firebaseapp.com";
  firebaseConfig.projectId = "pitchpro-29e90";
  firebaseConfig.storageBucket = "pitchpro-29e90.firebasestorage.app";
  firebaseConfig.messagingSenderId = "121788535713";
  firebaseConfig.appId = "1:121788535713:web:9c5ddf4ff9af0a0e2ff1e0";
  firebaseConfig.measurementId = "G-QGBR93ZYCM";
}

// Debug: Log de uiteindelijke Firebase configuratie (zonder API key voor veiligheid)
console.log('Firebase configuratie:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? 'AANWEZIG' : 'ONTBREEKT',
});

// Initialiseer Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Alleen analytics initialiseren als we in een browser omgeving zijn
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };

export default app; 