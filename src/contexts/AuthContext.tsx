import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  getAuth, 
  onAuthStateChanged,
  signOut,
  // Eventuele andere benodigde imports
} from 'firebase/auth';
import { BaseUser } from '../types/user';
// Verwijder ongebruikte importtypen zoals User, JobSeeker, Recruiter, UserProfile

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: BaseUser | null;
  loading: boolean;
  authError: Error | null;
  register: (email: string, password: string, displayName: string, role: UserRole) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  createOrUpdateProfile: (displayName: string, role: UserRole) => Promise<BaseUser>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth moet binnen een AuthProvider gebruikt worden');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<BaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<Error | null>(null);

  console.log("AuthProvider initialiseren...");

  // Helper functie om datum te normaliseren
  const normalizeDate = (date: any): Date => {
    if (date && typeof date === 'object' && date.toDate && typeof date.toDate === 'function') {
      return date.toDate(); // Converteer Firestore Timestamp naar JS Date
    }
    return date;
  };

  // Helper functie om gebruikersdata te normaliseren naar ons type systeem
  const normalizeUserData = (userData: any, uid: string): BaseUser => {
    console.log('Normalizing user data for:', uid, userData);
    
    // Valideer en normaliseer de rol
    let role = userData.role || userData.userType || 'werkzoekende';
    
    // Zet Engelse waardes om naar Nederlandse waardes
    if (role === 'jobseeker') {
      role = 'werkzoekende';
      console.warn('Converted English role "jobseeker" to Dutch "werkzoekende"');
    }
    
    // Zorg ervoor dat userType ook consistent is
    let userType = userData.userType || role;
    if (userType === 'jobseeker') {
      userType = 'werkzoekende';
    }
    
    // Basis gebruikersgegevens
    const normalizedUser: BaseUser = {
      id: uid,
      email: userData.email || '',
      displayName: userData.displayName || userData.name || '',
      photoURL: userData.photoURL || userData.avatar || '',
      bio: userData.bio || '',
      phone: userData.phone || '',
      role: role,
      userType: userType,
      createdAt: userData.createdAt || new Date(),
      updatedAt: userData.updatedAt || new Date(),
      // Gebruik het bestaande profile object of maak een nieuw object
      profile: userData.profile ? { ...userData.profile } : {}
    };

    // Normaliseer de profielgegevens op basis van rol
    if (isJobSeeker(normalizedUser)) {
      // Zorg ervoor dat de profile object bestaat
      if (!normalizedUser.profile) normalizedUser.profile = {};
      
      // Voeg werkzoekende-specifieke velden toe aan profile
      normalizedUser.profile.skills = userData.skills || userData.profile?.skills || [];
      normalizedUser.profile.education = userData.education || userData.profile?.education || [];
      normalizedUser.profile.experience = userData.experience || userData.profile?.experience || [];
      normalizedUser.profile.cv = userData.cv || userData.profile?.cv || '';
      normalizedUser.profile.portfolio = userData.portfolio || userData.profile?.portfolio || '';
      normalizedUser.profile.linkedin = userData.linkedin || userData.profile?.linkedin || '';
      normalizedUser.profile.address = userData.address || userData.profile?.address || '';
      normalizedUser.profile.city = userData.city || userData.profile?.city || '';
    } else if (isRecruiter(normalizedUser)) {
      // Zorg ervoor dat de profile object bestaat
      if (!normalizedUser.profile) normalizedUser.profile = {};
      
      // Voeg recruiter-specifieke velden toe aan profile
      normalizedUser.profile.companyName = userData.companyName || userData.profile?.companyName || '';
      normalizedUser.profile.companyDescription = userData.companyDescription || userData.profile?.companyDescription || '';
      normalizedUser.profile.kvkNumber = userData.kvkNumber || userData.profile?.kvkNumber || '';
      normalizedUser.profile.website = userData.website || userData.profile?.website || '';
      normalizedUser.profile.companyLogo = userData.companyLogo || userData.profile?.companyLogo || '';
      normalizedUser.profile.industry = userData.industry || userData.profile?.industry || '';
      normalizedUser.profile.companySize = userData.companySize || userData.profile?.companySize || '';
      normalizedUser.profile.companyLocation = userData.companyLocation || userData.profile?.companyLocation || '';
    }
    
    // Debug: log de genormaliseerde gebruiker
    console.debug('Normalized user data:', {
      id: normalizedUser.id,
      email: normalizedUser.email,
      role: normalizedUser.role,
      userType: normalizedUser.userType,
      hasProfile: !!normalizedUser.profile && Object.keys(normalizedUser.profile).length > 0
    });
    
    return normalizedUser;
  };

  // Verbeterde functie om gebruikersprofiel aan te maken
  const createUserProfile = async (
    userId: string, 
    email: string, 
    displayName: string, 
    role: UserRole
  ): Promise<BaseUser> => {
    console.log("Nieuw gebruikersprofiel aanmaken voor", userId);
    
    // Lazy-load Firestore
    const db = db || await getFirestoreDB();
    const { doc, setDoc } = await import('firebase/firestore');
    
    const userDocRef = doc(db, 'users', userId);
    
    const baseUserData: BaseUser = {
      id: userId,
      email: email || '',
      displayName,
      fullName: displayName, // Zorg dat beide naamvelden ingevuld zijn
      role,
      userType: role, // Zet beide rolvelden voor maximale compatibiliteit
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Voeg rolspecifieke velden toe
    let userData: BaseUser;
    
    if (role === 'werkzoekende') {
      userData = {
        ...baseUserData,
        profile: {
          skills: [],
          availability: '',
          cv: '',
          linkedin: '',
          portfolio: '',
          experience: '',
          education: []
        }
      };
    } else {
      userData = {
        ...baseUserData,
        profile: {
          company: '',
          position: '',
          companyLogo: '',
          companyWebsite: '',
          companyDescription: '',
          kvkNumber: ''
        }
      };
    }
        
    // Sla het gebruikersprofiel op in Firestore
    await setDoc(userDocRef, userData);
    
    console.log("Gebruikersprofiel aangemaakt:", role);
    
    return userData;
  };

  // Register function updated to use the common profile creation
  const register = async (email: string, password: string, displayName: string, role: UserRole) => {
    try {
      // Lazy-load Firebase auth
      const auth = authInstance || await getFirebaseAuth();
      const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
      
      // Maak een gebruiker aan met Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update de gebruiker met displayName
      await updateProfile(user, { displayName });
      
      // Maak het gebruikersprofiel aan
      const profileData = await createUserProfile(user.uid, user.email || '', displayName, role);
      setUserProfile(profileData);
    } catch (error) {
      console.error('Fout bij registratie:', error);
      throw error;
    }
  };

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      console.log('Inlogpoging voor:', email);
      
      // Lazy-load Firebase auth
      const auth = authInstance || await getFirebaseAuth();
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Inloggen succesvol');
    } catch (error: any) {
      console.error('Fout bij inloggen:', error);
      console.error('Fout code:', error.code);
      console.error('Fout bericht:', error.message);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      // Lazy-load Firebase auth
      const auth = authInstance || await getFirebaseAuth();
      const { signOut } = await import('firebase/auth');
      
      await signOut(auth);
    } catch (error) {
      console.error('Fout bij uitloggen:', error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      // Lazy-load Firebase auth
      const auth = authInstance || await getFirebaseAuth();
      const { sendPasswordResetEmail } = await import('firebase/auth');
      
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Fout bij wachtwoord reset:', error);
      throw error;
    }
  };

  // Verbeterde functie voor het laden van het gebruikersprofiel met betere foutafhandeling
  const loadUserProfile = async (userId: string) => {
    try {
      console.log("Bezig met laden van gebruikersprofiel voor", userId);
      
      // Lazy-load Firestore
      const db = dbInstance || await getFirestoreDB();
      const { doc, getDoc, updateDoc } = await import('firebase/firestore');
      
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        // Haal ruwe data op
        const rawUserData = userDoc.data();
        console.log("Ruwe gebruikersdata uit Firestore:", rawUserData);
        
        // Controleer op minimaal benodigde velden
        if (!rawUserData.email) {
          console.warn("Gebruikersprofiel heeft geen email - proberen te repareren");
          // Voeg email toe uit Firebase Auth
          if (currentUser?.email) {
            await updateDoc(userDocRef, { email: currentUser.email });
            rawUserData.email = currentUser.email;
          }
        }
        
        // Voeg ID toe als het ontbreekt
        const userData: Record<string, any> = {
          ...rawUserData,
          id: userId // Zorg ervoor dat id altijd aanwezig is
        };
        
        // Controleer of de rol is ingesteld
        if (!userData.role && !userData.userType) {
          console.warn("Gebruikersprofiel heeft geen rol - proberen te repareren");
          userData.role = 'werkzoekende'; // Standaard rol als noodoplossing
          await updateDoc(userDocRef, { role: 'werkzoekende', userType: 'werkzoekende' });
        }
        
        // Zorg ervoor dat het profiel object bestaat
        if (!userData.profile || Object.keys(userData.profile || {}).length === 0) {
          console.warn("Gebruikersprofiel heeft geen profiel object - proberen te repareren");
          
          // Maak een leeg profiel aan op basis van de rol
          if (userData.role === 'werkzoekende' || userData.userType === 'werkzoekende') {
            userData.profile = {
              skills: [],
              availability: '',
              cv: '',
              linkedin: '',
              portfolio: '',
              experience: '',
              education: []
            };
            await updateDoc(userDocRef, { profile: userData.profile });
          } else if (userData.role === 'recruiter' || userData.userType === 'recruiter') {
            userData.profile = {
              company: '',
              position: '',
              companyLogo: '',
              companyWebsite: '',
              companyDescription: '',
              kvkNumber: ''
            };
            await updateDoc(userDocRef, { profile: userData.profile });
          }
        }
        
        // Normaliseer de gebruikersdata
        const normalizedUserData = normalizeUserData(userData, userId);
        console.log("Genormaliseerde gebruikersdata:", normalizedUserData);
        
        // Controleer of we een geldig gebruikersprofiel hebben
        const userRole = getUserRole(normalizedUserData);
        if (!userRole) {
          console.warn("Gebruikersprofiel heeft geen geldige rol - zetten op null");
          setUserProfile(null);
        } else {
          // Alles is goed, sla het profiel op in de state
          console.log("Gebruikersprofiel geladen met rol:", userRole);
          setUserProfile(normalizedUserData);
        }
      } else {
        console.error('Geen gebruikersprofiel gevonden in Firestore');
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Fout bij laden gebruikersprofiel:', error);
      setUserProfile(null);
      throw error;
    }
  };

  // Functie om het gebruikersprofiel manueel te verversen
  const refreshUserProfile = async () => {
    if (!currentUser) {
      throw new Error('Kan profiel niet verversen: gebruiker niet ingelogd');
    }
    
    try {
      await loadUserProfile(currentUser.uid);
      return;
    } catch (error) {
      console.error('Fout bij verversen gebruikersprofiel:', error);
      throw error;
    }
  };

  // Create or update user profile function
  const createOrUpdateProfile = async (displayName: string, role: UserRole): Promise<BaseUser> => {
    if (!currentUser) {
      throw new Error('Je moet ingelogd zijn om een profiel aan te maken');
    }
    
    try {
      const userData = await createUserProfile(
        currentUser.uid, 
        currentUser.email || '', 
        displayName || currentUser.displayName || 'Gebruiker', 
        role
      );
      
      // Update state synchronously
      setUserProfile(userData);
      
      return userData;
    } catch (error) {
      console.error('Fout bij aanmaken/updaten profiel:', error);
      throw error;
    }
  };

  // Auth state veranderingen monitoren met verbeterde timeout handling
  useEffect(() => {
    console.log("Auth state verandering monitoren opstarten...");
    
    // Verhoog de timeout naar 15 seconden voor een betere gebruikerservaring
    const safetyTimer = setTimeout(() => {
      console.log("VEILIGHEIDSTIMER: loading geforceerd op false na timeout");
      setLoading(false);
      setAuthError(new Error("Het profiel kon niet tijdig worden geladen. Probeer het opnieuw."));
    }, 15000);
    
    const initAuth = async () => {
      try {
        // Lazy-load Firebase auth
        const auth = authInstance || await getFirebaseAuth();
        const { onAuthStateChanged } = await import('firebase/auth');
        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          try {
            console.log("Auth state verandering gedetecteerd:", user ? "Gebruiker aanwezig" : "Geen gebruiker");
            setCurrentUser(user);
            
            if (user) {
              try {
                await loadUserProfile(user.uid);
              } catch (error) {
                console.error("Fout bij laden gebruikersprofiel:", error);
                // Zet loading op false, zelfs als er een fout is
                setUserProfile(null);
                if (error instanceof Error) {
                  setAuthError(error);
                } else {
                  setAuthError(new Error("Onbekende fout bij laden gebruikersprofiel"));
                }
              }
            } else {
              setUserProfile(null);
            }
            
            console.log("Loading status wordt op false gezet");
            setLoading(false);
            // Annuleer de timer omdat we nu klaar zijn met laden
            clearTimeout(safetyTimer);
          } catch (error) {
            console.error("Onverwachte fout in auth state verandering handler:", error);
            setLoading(false);
            clearTimeout(safetyTimer);
            if (error instanceof Error) {
              setAuthError(error);
            } else {
              setAuthError(new Error("Onverwachte fout in auth state verandering handler"));
            }
          }
        });
    
        return () => {
          unsubscribe();
          clearTimeout(safetyTimer);
        };
      } catch (error) {
        console.error("Kritieke fout bij initialiseren Firebase Auth:", error);
        setLoading(false);
        clearTimeout(safetyTimer);
        if (error instanceof Error) {
          setAuthError(error);
        } else {
          setAuthError(new Error("Kritieke fout bij initialiseren Firebase Auth"));
        }
        
        // Return lege cleanup functie
        return () => {};
      }
    };
    
    // Start the auth initialization
    const cleanup = initAuth();
    
    // Return the cleanup function
    return () => {
      if (cleanup && typeof cleanup.then === 'function') {
        cleanup.then(cleanupFn => {
          if (cleanupFn) cleanupFn();
        });
      }
      clearTimeout(safetyTimer);
    };
  }, []);

  console.log("AuthProvider rendering met loading status:", loading, "authError:", authError ? "JA" : "NEE");

  const value = {
    currentUser,
    userProfile,
    loading,
    authError,
    register,
    login,
    logout,
    resetPassword,
    createOrUpdateProfile,
    refreshUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 