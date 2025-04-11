import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { UserRole } from '../types/user';

const ProfileRepair: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null>(null);
  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('werkzoekende');

  // Check de huidige ingelogde gebruiker
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserInfo({
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName
      });
      setDisplayName(currentUser.displayName || '');
      
      // Check of het profiel al bestaat
      const checkProfile = async () => {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          setProfileExists(userDoc.exists());
        } catch (err) {
          console.error('Fout bij controleren profiel:', err);
          setError('Kon niet controleren of je profiel bestaat.');
        } finally {
          setChecking(false);
        }
      };
      
      checkProfile();
    } else {
      setChecking(false);
      setError('Je bent niet ingelogd. Log eerst in om je profiel te herstellen.');
    }
  }, []);

  const createProfile = async () => {
    if (!userInfo) return;
    
    try {
      setLoading(true);
      setError(null);
      
      if (!displayName.trim()) {
        setError('Vul een naam in');
        setLoading(false);
        return;
      }
      
      // Maak het gebruikersprofiel
      const userDocRef = doc(db, 'users', userInfo.uid);
      
      const userData = {
        id: userInfo.uid,
        email: userInfo.email || '',
        displayName: displayName,
        role: selectedRole,
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: selectedRole === 'werkzoekende' 
          ? { skills: [] } 
          : { company: '', position: '' }
      };
      
      await setDoc(userDocRef, userData);
      setSuccess(true);
      
      // Wacht 2 seconden en ververs dan de pagina
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error('Fout bij aanmaken profiel:', err);
      setError('Er is een fout opgetreden bij het aanmaken van je profiel.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        window.location.href = '/login';
      })
      .catch(err => {
        console.error('Fout bij uitloggen:', err);
        setError('Kon niet uitloggen. Probeer de pagina te verversen.');
      });
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
          <h1 className="text-2xl font-bold mb-4">Profiel controleren...</h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Profiel Herstel Tool</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Profiel succesvol hersteld! De pagina wordt nu vernieuwd...
          </div>
        )}
        
        <div className="mb-4">
          <p className="font-medium">Gebruiker info:</p>
          <ul className="mt-2 text-gray-700">
            <li><strong>Gebruiker ID:</strong> {userInfo?.uid || 'Niet ingelogd'}</li>
            <li><strong>E-mail:</strong> {userInfo?.email || 'Niet beschikbaar'}</li>
            <li><strong>Naam:</strong> {userInfo?.displayName || 'Niet ingesteld'}</li>
            <li><strong>Profiel status:</strong> {
              profileExists === true ? 'Profiel bestaat maar is niet toegankelijk' :
              profileExists === false ? 'Profiel bestaat niet' :
              'Onbekend'
            }</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Je naam</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Vul je naam in"
            disabled={loading || success}
          />
        </div>
        
        <div className="mb-6">
          <p className="mb-2 text-sm font-medium text-gray-700">Selecteer je gebruikerstype:</p>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="role"
                value="werkzoekende"
                checked={selectedRole === 'werkzoekende'}
                onChange={() => setSelectedRole('werkzoekende')}
                disabled={loading || success}
              />
              <span className="ml-2">Werkzoekende</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="role"
                value="recruiter"
                checked={selectedRole === 'recruiter'}
                onChange={() => setSelectedRole('recruiter')}
                disabled={loading || success}
              />
              <span className="ml-2">Recruiter</span>
            </label>
          </div>
        </div>
        
        <div className="flex flex-col space-y-3">
          <button
            onClick={createProfile}
            disabled={loading || success || !userInfo}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? 'Bezig...' : success ? 'Profiel hersteld' : 'Profiel herstellen'}
          </button>
          
          <button
            onClick={handleLogout}
            disabled={loading || success}
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50"
          >
            Uitloggen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileRepair; 