import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useMessages } from '../../contexts/MessageContext';
import { useLayout } from '../../contexts/LayoutContext';

const Header: React.FC = () => {
  // Alle hooks moeten bovenaan de component worden geplaatst, vóór eventuele condities
  const { isInsideLayout } = useLayout();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, userProfile } = useAuth();
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

  // Navigatiefuncties voor betere controle
  const navigateTo = (path: string) => {
    console.log(`Navigeren naar: ${path}`);
    
    // Voeg extra debug informatie toe voor navigatie naar dashboard
    if (path === '/dashboard') {
      console.log('Dashboard navigatie geactiveerd');
      console.log('Huidige gebruikers status:', { currentUser, userProfile });
    }
    
    navigate(path);
  };

  // Functie specifiek voor het navigeren naar het dashboard
  const goToDashboard = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    navigate('/dashboard');
  };

  // We tonen de header NIET op de landingspagina omdat deze zijn eigen header heeft
  if (location.pathname === '/') {
    return null;
  }

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
            to="/profile" 
            className={`${isHomePage ? 'text-white' : 'text-gray-700'} hover:opacity-80`}
            onClick={(e) => {
              e.preventDefault(); // Voorkom standaard navigatie
              navigate('/profile', { replace: true });
            }}
          >
            Profiel
          </Link>
          <button 
            onClick={async () => {
              await logout();
              navigate('/login');
            }} 
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
          <div onClick={() => navigateTo('/')} className="flex items-center cursor-pointer">
            <span className={`text-2xl font-bold ${isHomePage ? 'text-white' : 'text-primary-600'}`}>PitchPro</span>
          </div>
          
          {/* Navigatiemenu gebaseerd op gebruikersrol */}
          <nav className="flex space-x-6">
            <div onClick={() => navigateTo('/')} className={`${isHomePage ? 'text-white' : 'text-gray-700'} hover:opacity-80 cursor-pointer`}>
              Home
            </div>
            <div onClick={() => navigateTo('/about')} className={`${isHomePage ? 'text-white' : 'text-gray-700'} hover:opacity-80 cursor-pointer`}>
              Over ons
            </div>
            
            {/* Vacatures alleen tonen als het GEEN recruiter is */}
            {!isRecruiter && (
              <div onClick={() => navigateTo('/jobs')} className={`${isHomePage ? 'text-white' : 'text-gray-700'} hover:opacity-80 cursor-pointer`}>
                Vacatures
              </div>
            )}
            
            {/* Toon 'Kandidaten' alleen voor recruiters */}
            {isRecruiter && (
              <div onClick={() => navigateTo('/candidates')} className={`${isHomePage ? 'text-white' : 'text-gray-700'} hover:opacity-80 cursor-pointer`}>
                Kandidaten
              </div>
            )}
            
            {/* Dashboard voor ingelogde gebruikers */}
            {currentUser && (
              <div
                onClick={goToDashboard}
                className={`${isHomePage ? 'text-white' : 'text-gray-700'} hover:opacity-80 cursor-pointer`}
              >
                Dashboard
              </div>
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