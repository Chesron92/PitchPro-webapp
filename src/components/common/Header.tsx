import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useMessages } from '../../contexts/MessageContext';

const Header: React.FC = () => {
  const { currentUser, logout, userProfile } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  
  // Veilig ophalen van ongelezen berichten
  let unreadCount = 0;
  try {
    const { getUnreadCount } = useMessages();
    if (currentUser) {
      unreadCount = getUnreadCount();
    }
  } catch (error) {
    console.error('MessageContext niet beschikbaar:', error);
    // Fallback: geen ongelezen berichten tonen
  }
  
  // Controleer of de gebruiker een recruiter is
  const isRecruiter = userProfile?.role === 'recruiter' || userProfile?.userType === 'recruiter';
  // Anders is het een werkzoekende of niet ingelogde gebruiker
  const isJobSeeker = userProfile?.role === 'werkzoekende' || userProfile?.userType === 'werkzoekende';
  
  // Debug informatie
  useEffect(() => {
    console.log('Header userProfile:', userProfile);
    console.log('isRecruiter:', isRecruiter);
    console.log('isJobSeeker:', isJobSeeker);
  }, [userProfile, isRecruiter, isJobSeeker]);

  // Vervanging voor de inlog knop om te zorgen dat deze werkt
  const renderAuthButtons = () => {
    if (currentUser) {
      return (
        <div className="flex items-center space-x-4">
          <Link 
            to="/messages" 
            className={`${isHomePage ? 'text-white' : 'text-gray-700'} hover:opacity-80 relative`}
            aria-label="Berichten"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
              />
            </svg>
            {/* Indicator voor ongelezen berichten */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Link>
          {/* Kalender icoon voor alle ingelogde gebruikers */}
          <Link 
            to="/agenda" 
            className={`${isHomePage ? 'text-white' : 'text-gray-700'} hover:opacity-80 relative`}
            aria-label="Agenda"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </Link>
          <Link 
            to="/dashboard/profile" 
            className={`${isHomePage ? 'text-white' : 'text-gray-700'} hover:opacity-80`}
          >
            Profiel
          </Link>
          <button 
            onClick={logout} 
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isHomePage ? 'text-white bg-primary-600 hover:bg-primary-700' : 'text-white bg-primary-600 hover:bg-primary-700'
            }`}
          >
            Uitloggen
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isHomePage ? 'text-white' : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            Inloggen
          </Link>
          <Link
            to="/register"
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isHomePage ? 'text-white bg-primary-600 hover:bg-primary-700' : 'text-white bg-primary-600 hover:bg-primary-700'
            }`}
          >
            Registreren
          </Link>
        </div>
      );
    }
  };

  return (
    <header className={`w-full ${isHomePage ? 'bg-transparent absolute top-0 z-10' : 'bg-white shadow-sm'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo en merknaam */}
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-bold ${isHomePage ? 'text-white' : 'text-primary-600'}`}>PitchPro</span>
          </Link>
          
          {/* Navigatiemenu gebaseerd op gebruikersrol */}
          <nav className="flex space-x-6">
            <Link to="/" className={`${isHomePage ? 'text-white' : 'text-gray-700'} hover:opacity-80`}>
              Home
            </Link>
            <Link to="/about" className={`${isHomePage ? 'text-white' : 'text-gray-700'} hover:opacity-80`}>
              Over ons
            </Link>
            
            {/* Vacatures alleen tonen voor werkzoekenden en niet-ingelogde gebruikers */}
            {(!isRecruiter) && (
              <Link to="/jobs" className={`${isHomePage ? 'text-white' : 'text-gray-700'} hover:opacity-80`}>
                Vacatures
              </Link>
            )}
            
            {/* Toon 'Kandidaten' alleen voor recruiters */}
            {isRecruiter && (
              <Link to="/candidates" className={`${isHomePage ? 'text-white' : 'text-gray-700'} hover:opacity-80`}>
                Kandidaten
              </Link>
            )}
            
            {/* Dashboard voor ingelogde gebruikers */}
            {currentUser && (
              <Link to="/dashboard" className={`${isHomePage ? 'text-white' : 'text-gray-700'} hover:opacity-80`}>
                Dashboard
              </Link>
            )}
          </nav>
          
          {/* Login/Register of Gebruikersmenu */}
          <div className="flex items-center">
            {renderAuthButtons()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;