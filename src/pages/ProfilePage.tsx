import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isJobSeeker, isRecruiter } from '../types/user';
import JobSeekerProfileForm from '../components/profile/JobSeekerProfileForm';
import RecruiterProfileForm from '../components/profile/RecruiterProfileForm';
import ProfileRecoveryComponent from '../components/ProfileRecoveryComponent';

const ProfilePage: React.FC = () => {
  const { userProfile, currentUser, loading, refreshUserProfile, createOrUpdateProfile } = useAuth();
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  // Als het nog aan het laden is, toon een laadscherm
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        <div className="ml-4">Profiel laden...</div>
      </div>
    );
  }
  
  // Als er geen gebruiker is of geen profiel, toon de herstelcomponent
  if (!currentUser || !userProfile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Profiel niet gevonden</h1>
        <p className="mb-6">Het lijkt erop dat je profiel niet beschikbaar is. Je kunt het opnieuw aanmaken hieronder.</p>
        <ProfileRecoveryComponent />
      </div>
    );
  }
  
  // Functie om het profiel te repareren voor werkzoekende
  const repairJobSeekerProfile = async () => {
    try {
      setFormLoading(true);
      setError(null);
      
      // Maak het profiel opnieuw aan als werkzoekende
      await createOrUpdateProfile(userProfile.displayName || 'Gebruiker', 'werkzoekende');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Fout bij repareren profiel:", err);
      setError("Kon profiel niet repareren. Probeer later opnieuw.");
    } finally {
      setFormLoading(false);
    }
  };
  
  // Functie om het profiel te verversen
  const handleRefreshProfile = async () => {
    try {
      setFormLoading(true);
      setError(null);
      await refreshUserProfile();
      setSuccess(true);
      // Reset success status na 3 seconden
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Fout bij verversen profiel:", err);
      setError("Kon profiel niet verversen. Probeer later opnieuw.");
    } finally {
      setFormLoading(false);
    }
  };
  
  // Bepaal welk profielformulier getoond moet worden op basis van gebruikersrol
  const renderProfileForm = () => {
    // Extra robuuste controle voor werkzoekende rol
    if (isJobSeeker(userProfile) || 
        userProfile?.role === 'werkzoekende' || 
        userProfile?.userType === 'werkzoekende') {
      return (
        <JobSeekerProfileForm 
          user={userProfile} 
          onSuccess={() => {
            // Ververs het profiel na succesvolle opslag
            refreshUserProfile()
              .then(() => {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
              })
              .catch(err => {
                console.error("Fout bij verversen profiel na opslaan:", err);
              });
          }} 
          onError={(msg: string) => setError(msg)}
          setLoading={setFormLoading}
        />
      );
    }
    
    // Extra robuuste controle voor recruiter rol
    if (isRecruiter(userProfile) || 
        userProfile?.role === 'recruiter' || 
        userProfile?.userType === 'recruiter') {
      return (
        <RecruiterProfileForm 
          user={userProfile}
          onSuccess={() => {
            // Ververs het profiel na succesvolle opslag, maar met vertraging
            // Dit zorgt ervoor dat de gegevens eerst in het formulier worden bewaard
            setSuccess(true);
            setTimeout(() => {
              refreshUserProfile()
                .then(() => {
                  console.log("Profiel succesvol ververst na vertraging");
                  setTimeout(() => setSuccess(false), 3000);
                })
                .catch(err => {
                  console.error("Fout bij verversen profiel na opslaan:", err);
                });
            }, 500); // Wacht 500ms voordat het profiel wordt ververst
          }}
          onError={(msg: string) => setError(msg)}
          setLoading={setFormLoading}
        />
      );
    }
    
    // Als de rol niet duidelijk is, toon een foutmelding
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
        <p className="font-bold">Profieltype niet herkend</p>
        <p>We kunnen niet bepalen welk type profiel je hebt. Maak je profiel opnieuw aan om dit op te lossen.</p>
        <div className="mt-4">
          <ProfileRecoveryComponent />
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mijn Profiel</h1>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Terug naar dashboard
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
          <p className="text-green-700">Profiel succesvol bijgewerkt!</p>
        </div>
      )}
      
      {userProfile && !userProfile.profile && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="font-bold">Profiel onvolledig</p>
          <p>Je profiel lijkt onvolledig of beschadigd te zijn. Klik op 'Profiel repareren' om dit probleem op te lossen.</p>
          <div className="mt-4">
            <button
              onClick={repairJobSeekerProfile}
              disabled={formLoading}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
            >
              {formLoading ? 'Bezig...' : 'Profiel repareren als werkzoekende'}
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {renderProfileForm()}
        
        <div className="mt-8 pt-6 border-t">
          <div className="flex justify-end items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              Opslaan en terug
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 