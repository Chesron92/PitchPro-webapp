// Firebase configuratie, geoptimaliseerd voor code-splitting
// Elke module wordt dynamisch geïmporteerd alleen wanneer nodig

// Firebase configuratie uit omgevingsvariabelen
// Bij gebruik, maak een .env bestand met deze variabelen
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Debug: Log de omgevingsvariabelen
console.log('Firebase omgevingsvariabelen status:');
console.log('API Key aanwezig:', !!process.env.REACT_APP_FIREBASE_API_KEY);
console.log('Auth Domain aanwezig:', !!process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
console.log('Project ID aanwezig:', !!process.env.REACT_APP_FIREBASE_PROJECT_ID);

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

// Deze caches zorgen ervoor dat we niet meerdere instances initialiseren
let appInstance: any = null;
let authInstance: any = null;
let dbInstance: any = null;
let storageInstance: any = null;
let analyticsInstance: any = null;

// Initialiseer Firebase app (alleen indien nodig)
export const getFirebaseApp = async () => {
  if (!appInstance) {
    const { initializeApp } = await import('firebase/app');
    appInstance = initializeApp(firebaseConfig);
  }
  return appInstance;
};

// Verkrijg auth service (dynamisch geïmporteerd)
export const getFirebaseAuth = async () => {
  if (!authInstance) {
    const app = await getFirebaseApp();
    const { getAuth } = await import('firebase/auth');
    authInstance = getAuth(app);
  }
  return authInstance;
};

// Verkrijg Firestore service (dynamisch geïmporteerd)
export const getFirestore = async () => {
  if (!dbInstance) {
    const app = await getFirebaseApp();
    const { getFirestore: fsGetFirestore } = await import('firebase/firestore');
    dbInstance = fsGetFirestore(app);
  }
  return dbInstance;
};

// Verkrijg Storage service (dynamisch geïmporteerd)
export const getStorage = async () => {
  if (!storageInstance) {
    const app = await getFirebaseApp();
    const { getStorage: fsGetStorage } = await import('firebase/storage');
    storageInstance = fsGetStorage(app);
  }
  return storageInstance;
};

// Verkrijg Analytics service (dynamisch geïmporteerd, alleen in browser)
export const getAnalytics = async () => {
  if (!analyticsInstance && typeof window !== 'undefined') {
    const app = await getFirebaseApp();
    const { getAnalytics: fsGetAnalytics } = await import('firebase/analytics');
    analyticsInstance = fsGetAnalytics(app);
  }
  return analyticsInstance;
};

// Voor backward compatibiliteit, exporteer ook de oude variabelen
// Deze worden later lazy geïnitialiseerd
export let auth: any = null;
export let db: any = null;
export let storage: any = null;
export let analytics: any = null;

// Initialiseer services als ze direct worden aangeroepen
// Dit is een fallback voor code die de oude exports direct gebruikt
const initializeServices = async () => {
  auth = await getFirebaseAuth();
  db = await getFirestore();
  storage = await getStorage();
  if (typeof window !== 'undefined') {
    analytics = await getAnalytics();
  }
};

// Start de initialisatie als achtergrondtaak
initializeServices().catch(error => 
  console.error('Firebase services konden niet worden geïnitialiseerd:', error)
);

export default getFirebaseApp; 