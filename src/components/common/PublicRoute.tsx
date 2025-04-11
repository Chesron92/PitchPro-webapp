import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PublicRoute: React.FC = () => {
  const { currentUser, loading } = useAuth();
  
  console.log("PublicRoute rendering", { loading, currentUser });
  
  useEffect(() => {
    console.log("PublicRoute effect", { loading, currentUser });
  }, [loading, currentUser]);
  
  // Als het nog aan het laden is, laat een laadscherm zien
  if (loading) {
    console.log("PublicRoute - Toont laadscherm");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
        <div className="ml-4">Bezig met laden...</div>
      </div>
    );
  }
  
  // Als er een gebruiker is, stuur naar home (die zal doorverwijzen naar het passende dashboard)
  if (currentUser) {
    console.log("PublicRoute - Doorverwijzen naar home");
    return <Navigate to="/" replace />;
  }
  
  // Als er geen gebruiker is, laat de publieke route zien
  console.log("PublicRoute - Toont publieke content");
  return <Outlet />;
};

export default PublicRoute; 