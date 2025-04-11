import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/user';

const ProfileRecoveryComponent: React.FC = () => {
  const { currentUser, createOrUpdateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('werkzoekende');
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  
  const handleCreateProfile = async () => {
    if (!currentUser) {
      setError('Je moet ingelogd zijn om je profiel te herstellen');
      return;
    }
    
    if (!displayName.trim()) {
      setError('Voer een naam in');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Maak een nieuw profiel aan met behulp van de AuthContext functie
      const profile = await createOrUpdateProfile(displayName, selectedRole);
      
      console.log('Profiel succesvol hersteld:', profile);
      setSuccess(true);
      
      // Ververs de pagina na 2 seconden zodat het nieuwe profiel wordt geladen
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error('Fout bij het herstellen van profiel:', err);
      setError('Er is een fout opgetreden bij het herstellen van je profiel. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mt-4">
      <h2 className="text-xl font-semibold mb-4">Profiel herstellen</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
          <p className="text-green-700">Profiel succesvol hersteld! De pagina wordt opnieuw geladen...</p>
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Je naam</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          disabled={loading || success}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
          placeholder="Vul je naam in"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Gebruikerstype</label>
        <div className="flex space-x-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="werkzoekende"
              checked={selectedRole === 'werkzoekende'}
              onChange={() => setSelectedRole('werkzoekende')}
              disabled={loading || success}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2">Werkzoekende</span>
          </label>
          
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="recruiter"
              checked={selectedRole === 'recruiter'}
              onChange={() => setSelectedRole('recruiter')}
              disabled={loading || success}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2">Recruiter</span>
          </label>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleCreateProfile}
          disabled={loading || success}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Bezig...' : success ? 'Profiel Hersteld' : 'Profiel Herstellen'}
        </button>
      </div>
    </div>
  );
};

export default ProfileRecoveryComponent; 