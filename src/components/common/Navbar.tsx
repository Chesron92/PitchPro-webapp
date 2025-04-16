import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Fout bij uitloggen:', error);
    }
  };
  
  // Controleer of gebruiker een werkzoekende is door zowel role als userType te checken
  const isJobSeeker = userProfile?.role === 'werkzoekende' || userProfile?.userType === 'werkzoekende';
  
  // Controleer of gebruiker een recruiter is door zowel role als userType te checken
  const isRecruiter = userProfile?.role === 'recruiter' || userProfile?.userType === 'recruiter';
  
  return (
    <nav className="bg-primary-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">PitchPro</span>
            </Link>
            
            {currentUser && (
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                >
                  Dashboard
                </Link>
                
                {isJobSeeker && (
                  <Link 
                    to="/profile/jobseeker" 
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                  >
                    Mijn Profiel
                  </Link>
                )}
                
                {isRecruiter && (
                  <Link 
                    to="/profile/recruiter" 
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                  >
                    Mijn Profiel
                  </Link>
                )}
              </div>
            )}
          </div>
          
          {currentUser && (
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="text-sm mr-4">
                  {userProfile?.displayName || currentUser.email}
                </span>
                
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700"
                >
                  Uitloggen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 