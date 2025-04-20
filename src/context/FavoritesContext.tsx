import React, { createContext, useState, useContext, useEffect } from 'react';

export interface Pitch {
  id: string;
  title: string;
  description: string;
  // Andere eigenschappen kunnen hier worden toegevoegd
}

interface FavoritesContextType {
  favorites: Pitch[];
  addFavorite: (pitch: Pitch) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites moet binnen een FavoritesProvider gebruikt worden');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Pitch[]>([]);

  // Laad favorieten uit localStorage bij initialisatie
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Fout bij het laden van favorieten:', error);
        // Bij een fout, reset de favorieten
        localStorage.removeItem('favorites');
      }
    }
  }, []);

  // Sla favorieten op in localStorage wanneer ze veranderen
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pitch: Pitch) => {
    setFavorites(prevFavorites => {
      // Controleer of de pitch al bestaat om duplicaten te voorkomen
      if (!prevFavorites.some(fav => fav.id === pitch.id)) {
        return [...prevFavorites, pitch];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites(prevFavorites => prevFavorites.filter(pitch => pitch.id !== id));
  };

  const isFavorite = (id: string): boolean => {
    return favorites.some(pitch => pitch.id === id);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export default FavoritesContext; 