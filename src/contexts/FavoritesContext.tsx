import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, doc, setDoc, deleteDoc, query, where, getDocs, documentId } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

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
      const favoritesRef = collection(db, 'favorites');
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
    } catch (err) {
      console.error('Fout bij ophalen favorieten:', err);
      setError(err instanceof Error ? err : new Error('Onbekende fout bij ophalen favorieten'));
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
      // Maak een unieke ID voor het favoriet document (gebruiker_ID + vacature_ID)
      const favoriteId = `${currentUser.uid}_${jobId}`;
      const favoriteRef = doc(db, 'favorites', favoriteId);

      // Sla basis vacature gegevens op met de favoriet voor snelle weergave
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

      // Update de lokale state alvast voor directe gebruikersfeedback
      const newFavorite: FavoriteJob = { id: favoriteId, ...favoriteData };
      setFavorites(prev => {
        // Controleer of het item al bestaat om duplicaten te voorkomen
        if (prev.some(fav => fav.jobId === jobId)) {
          return prev;
        }
        return [...prev, newFavorite];
      });

      // Daarna pas updaten in Firestore
      await setDoc(favoriteRef, favoriteData);
      console.log(`Favoriet toegevoegd met ID: ${favoriteId}`);
    } catch (err) {
      console.error('Fout bij toevoegen favoriet:', err);
      setError(err instanceof Error ? err : new Error('Onbekende fout bij toevoegen favoriet'));
      // Bij een fout, haal de favorieten opnieuw op om de juiste state te krijgen
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
      // Favoriet ID opbouwen
      const favoriteId = `${currentUser.uid}_${jobId}`;
      const favoriteRef = doc(db, 'favorites', favoriteId);

      // Update lokale state direct voor snelle gebruikersfeedback
      setFavorites(prev => prev.filter(fav => fav.jobId !== jobId));

      // Daarna pas verwijderen uit Firestore
      await deleteDoc(favoriteRef);
      console.log(`Favoriet verwijderd met ID: ${favoriteId}`);
    } catch (err) {
      console.error('Fout bij verwijderen favoriet:', err);
      setError(err instanceof Error ? err : new Error('Onbekende fout bij verwijderen favoriet'));
      // Bij een fout, haal de favorieten opnieuw op om de juiste state te krijgen
      fetchFavorites();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Controleer of een vacature favoriet is
  const isFavorite = (jobId: string): boolean => {
    return favorites.some(fav => fav.jobId === jobId);
  };

  // Refresh favorieten
  const refreshFavorites = async () => {
    await fetchFavorites();
  };

  // Haal favorieten op wanneer de gebruiker verandert
  useEffect(() => {
    if (currentUser) {
      console.log('Gebruiker aangemeld, favorieten ophalen...');
      fetchFavorites();
    } else {
      console.log('Geen gebruiker, favorieten leegmaken');
      setFavorites([]);
    }
  }, [currentUser]); // Voer opnieuw uit als de ingelogde gebruiker verandert

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