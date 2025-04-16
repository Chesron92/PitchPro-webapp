import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { isJobSeeker, isRecruiter } from '../types/user';
import ProfileRecoveryComponent from './ProfileRecoveryComponent';
import JobSeekerDashboard from './dashboard/JobSeekerDashboard';
import RecruiterDashboard from './dashboard/RecruiterDashboard';

const Dashboard: React.FC = () => {
  const { userProfile, currentUser, loading, refreshUserProfile } = useAuth();
  
  // Functie om het profiel opnieuw te laden als dat nodig is
  const handleRetryProfileLoad = async () => {
    try {
      await refreshUserProfile();
    } catch (error) {
      console.error("Kon profiel niet verversen:", error);
    }
  };
  
  // Als het nog aan het laden is, toon een laadscherm
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        <div className="ml-4">Dashboard laden...</div>
      </div>
    );
  }
  
  // Controleer eerst of we een ingelogde gebruiker hebben maar geen profiel
  if (currentUser && !userProfile) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Probleem met gebruikersprofiel</h1>
        <p className="mb-4">Je bent wel ingelogd, maar je gebruikersprofiel kon niet worden geladen.</p>
        
        <button 
          onClick={handleRetryProfileLoad}
          className="px-4 py-2 mr-4 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Probeer opnieuw te laden
        </button>
        
        <ProfileRecoveryComponent />
      </div>
    );
  }
  
  // Als er een profiel is, gebruik onze type-guard functies om te bepalen welk dashboard te tonen
  if (userProfile) {
    if (isJobSeeker(userProfile)) {
      return <JobSeekerDashboard user={userProfile} />;
    } 
    
    if (isRecruiter(userProfile)) {
      return <RecruiterDashboard user={userProfile} />;
    }
    
    // Als het profiel geen duidelijke rol heeft, toon een waarschuwing
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Onbekend gebruikerstype</h1>
        <p className="mb-4">Je profiel bevat geen geldige gebruikersrol. Gebruik de herstel tool om dit op te lossen.</p>
        <ProfileRecoveryComponent />
      </div>
    );
  }
  
  // Fallback voor het onmogelijke geval dat geen van de bovenstaande condities geldt
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow">
        <h2 className="font-bold text-lg mb-2">Er is iets misgegaan</h2>
        <p>We konden je dashboard niet laden. Probeer opnieuw in te loggen.</p>
      </div>
    </div>
  );
};

export default Dashboard; 