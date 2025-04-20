import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth moet binnen een AuthProvider gebruikt worden');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Controleer of er een gebruiker in localStorage is
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Fout bij het parsen van gebruikersgegevens', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simuleer een API-aanroep
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In een echte app zouden we een API aanroepen en de gebruiker verifiëren
      // Voor nu simuleren we een succesvolle inlogpoging
      const user: User = {
        id: '1',
        name: 'Test Gebruiker',
        email: email
      };
      
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      setError('Inloggen mislukt. Controleer je gegevens en probeer het opnieuw.');
      console.error('Inlogfout:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simuleer een API-aanroep
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In een echte app zouden we een gebruiker registreren via een API
      // Voor nu simuleren we een succesvolle registratie
      const user: User = {
        id: Date.now().toString(),
        name: name,
        email: email
      };
      
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      setError('Registratie mislukt. Probeer het later opnieuw.');
      console.error('Registratiefout:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    
    try {
      // In een echte app zouden we de uitloggen API aanroepen
      // Voor nu verwijderen we gewoon de gebruikersgegevens
      localStorage.removeItem('user');
      setCurrentUser(null);
    } catch (error) {
      setError('Uitloggen mislukt. Probeer het later opnieuw.');
      console.error('Uitlogfout:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 