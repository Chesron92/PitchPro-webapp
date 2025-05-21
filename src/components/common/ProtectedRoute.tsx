import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole, getUserRole, isJobSeeker, isRecruiter } from '../../types/user';

interface ProtectedRouteProps {
  requiredRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { currentUser, loading, userProfile } = useAuth();
  
  console.log("ProtectedRoute rendering", { currentUser, loading, requiredRole, userProfile });
  
  // Als het nog aan het laden is, toon een laadscherm
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
        <div className="ml-4">Bezig met laden...</div>
      </div>
    );
  }
  
  // Als er geen ingelogde gebruiker is, doorverwijzen naar login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Als er geen profiel is, mag de gebruiker nog steeds naar het dashboard
  // daar zal de ProfileRecoveryComponent worden getoond
  if (!userProfile) {
    // Als dit echter een rolspecifieke route is, doorverwijzen naar het algemene dashboard
    if (requiredRole) {
      return <Navigate to="/dashboard" replace />;
    }
    // Anders doorgaan met render
    return <Outlet />;
  }
  
  // Als er een specifieke rol vereist is, controleer met onze helperfuncties
  if (requiredRole) {
    // Gebruik de helperfuncties om type-veilig te checken, maar accepteer zowel Nederlandse als Engelse termen
    const hasCorrectRole = 
      ((requiredRole === 'werkzoekende' || requiredRole === 'jobseeker') && isJobSeeker(userProfile)) || 
      (requiredRole === 'recruiter' && isRecruiter(userProfile));
    
    if (!hasCorrectRole) {
      console.warn(`Gebruiker heeft niet de juiste rol. Vereist: ${requiredRole}, Actueel: ${getUserRole(userProfile)}`);
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  // Anders, render de beveiligde content
  return <Outlet />;
};

export default ProtectedRoute; 