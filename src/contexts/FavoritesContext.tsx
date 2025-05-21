import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, doc, setDoc, deleteDoc, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { useAuth } from './AuthContext';

// Firebase configuratie (direct uit config bestand kopiëren of via een gedeelde constante)
// Zorg ervoor dat deze consistent is met de configuratie in RecruiterDashboard.tsx
const firebaseConfig = {
  apiKey: "AIzaSyAiTY14VexbFUQTf3yKhDPhrCtKjRzhMwQ",
  authDomain: "pitchpro-29e90.firebaseapp.com",
  projectId: "pitchpro-29e90",
  storageBucket: "pitchpro-29e90.firebasestorage.app",
  messagingSenderId: "121788535713",
  appId: "1:121788535713:web:9c5ddf4ff9af0a0e2ff1e0",
  measurementId: "G-QGBR93ZYCM"
};

// Zorg ervoor dat we altijd een Firebase instantie hebben
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Gebruik deze 'firestore' instantie

// Interface voor een favoriete vacature
export interface FavoriteJob {
  id: string;
  jobId: string;
  userId: string;
  createdAt: Date;
  job?: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary?: string;
  };
}

interface FavoritesContextType {
  favorites: FavoriteJob[];
  loading: boolean;
  error: Error | null;
  addFavorite: (jobId: string, jobData: any) => Promise<void>;
  removeFavorite: (jobId: string) => Promise<void>;
  isFavorite: (jobId: string) => boolean;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites moet binnen een FavoritesProvider gebruikt worden');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { currentUser, userProfile } = useAuth();

  // Haal favorieten op uit Firestore
  const fetchFavorites = async () => {
    if (!currentUser) {
      setFavorites([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Gebruik de lokaal geïnitialiseerde 'firestore' instantie
      const favoritesRef = collection(firestore, 'favorites');
      const favoritesQuery = query(favoritesRef, where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(favoritesQuery);

      const fetchedFavorites: FavoriteJob[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedFavorites.push({
          id: doc.id,
          jobId: data.jobId,
          userId: data.userId,
          createdAt: data.createdAt?.toDate() || new Date(),
          job: data.job || undefined
        });
      });

      console.log(`${fetchedFavorites.length} favorieten geladen voor gebruiker ${currentUser.uid}`);
      setFavorites(fetchedFavorites);
    } catch (err: any) { // err: any voor toegang tot err.code
      console.error('Fout bij ophalen favorieten:', err);
      if (err && err.code === 'permission-denied') {
        setError(new Error('Geen permissie om favorieten op te halen. Check Firestore regels.'));
      } else {
        setError(err instanceof Error ? err : new Error('Onbekende fout bij ophalen favorieten'));
      }
    } finally {
      setLoading(false);
    }
  };

  // Voeg een favoriet toe
  const addFavorite = async (jobId: string, jobData: any) => {
    if (!currentUser) {
      throw new Error('Je moet ingelogd zijn om een vacature als favoriet te markeren');
    }

    setLoading(true);
    setError(null);

    try {
      const favoriteId = `${currentUser.uid}_${jobId}`;
      // Gebruik de lokaal geïnitialiseerde 'firestore' instantie
      const favoriteRef = doc(firestore, 'favorites', favoriteId);

      const favoriteData: Omit<FavoriteJob, 'id'> = {
        jobId,
        userId: currentUser.uid,
        createdAt: new Date(),
        job: {
          id: jobId,
          title: jobData.title || 'Onbekende functie',
          company: jobData.company || 'Onbekend bedrijf',
          location: jobData.location || 'Locatie onbekend',
          salary: jobData.salary
        }
      };

      const newFavorite: FavoriteJob = { id: favoriteId, ...favoriteData };
      setFavorites(prev => {
        if (prev.some(fav => fav.jobId === jobId)) {
          return prev;
        }
        return [...prev, newFavorite];
      });

      await setDoc(favoriteRef, favoriteData);
      console.log(`Favoriet toegevoegd met ID: ${favoriteId}`);
    } catch (err: any) { // err: any
      console.error('Fout bij toevoegen favoriet:', err);
      setError(err instanceof Error ? err : new Error('Onbekende fout bij toevoegen favoriet'));
      fetchFavorites();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Verwijder een favoriet
  const removeFavorite = async (jobId: string) => {
    if (!currentUser) {
      throw new Error('Je moet ingelogd zijn om een favoriet te verwijderen');
    }

    setLoading(true);
    setError(null);

    try {
      const favoriteId = `${currentUser.uid}_${jobId}`;
      // Gebruik de lokaal geïnitialiseerde 'firestore' instantie
      const favoriteRef = doc(firestore, 'favorites', favoriteId);

      setFavorites(prev => prev.filter(fav => fav.jobId !== jobId));

      await deleteDoc(favoriteRef);
      console.log(`Favoriet verwijderd met ID: ${favoriteId}`);
    } catch (err: any) { // err: any
      console.error('Fout bij verwijderen favoriet:', err);
      setError(err instanceof Error ? err : new Error('Onbekende fout bij verwijderen favoriet'));
      fetchFavorites();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (jobId: string): boolean => {
    return favorites.some(fav => fav.jobId === jobId);
  };

  const refreshFavorites = async () => {
    await fetchFavorites();
  };

  useEffect(() => {
    if (currentUser) {
      console.log('Gebruiker aangemeld, favorieten ophalen...');
      fetchFavorites();
    } else {
      console.log('Geen gebruiker, favorieten leegmaken');
      setFavorites([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]); // fetchFavorites is stabiel en hoeft niet in de dep array als het geen props/state gebruikt die veranderen

  const value = {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
    refreshFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}; 