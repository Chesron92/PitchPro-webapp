import React, { useState, useEffect } from 'react';
import { JobSeeker, BaseUser } from '../../types/user';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, Timestamp, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';

interface JobSeekerDashboardProps {
  user: BaseUser;
}

// Interface voor sollicitaties
interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  status: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
  applicationDate: Timestamp;
}

const JobSeekerDashboard: React.FC<JobSeekerDashboardProps> = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { favorites, loading: favoritesLoading, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  // State voor sollicitaties
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState<boolean>(true);

  const handleRemoveFavorite = async (jobId: string) => {
    try {
      await removeFavorite(jobId);
    } catch (err) {
      console.error('Fout bij verwijderen favoriet:', err);
    }
  };

  const goToJobDetail = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };
  
  // Navigeer naar sollicitatie detail pagina
  const viewApplicationDetail = (applicationId: string) => {
    navigate(`/applications/${applicationId}`);
  };

  // Bereken hoeveel % van het profiel is ingevuld
  const calculateProfileCompletion = (): number => {
    let totalFields = 0;
    let filledFields = 0;
    
    // Basisvelden
    const baseFields = ['displayName', 'email', 'phoneNumber'];
    totalFields += baseFields.length;
    
    baseFields.forEach(field => {
      if (user[field]) filledFields++;
    });
    
    // Adresvelden
    const addressFields = ['street', 'houseNumber', 'postalCode', 'city', 'country'];
    totalFields += addressFields.length;
    
    addressFields.forEach(field => {
      if (user[field] || (user.address && typeof user.address === 'object' && 
         (user.address as Record<string, any>)[field])) {
        filledFields++;
      }
    });
    
    // Profiel specifieke velden
    if (user.profile) {
      const profileFields = ['skills', 'availability', 'cv', 'linkedin', 'portfolio', 'experience', 'education'];
      totalFields += profileFields.length;
      
      profileFields.forEach(field => {
        if (user.profile && user.profile[field]) {
          // Voor arrays zoals skills, check of er tenminste één item is
          if (Array.isArray(user.profile[field])) {
            if (user.profile[field].length > 0) filledFields++;
          } else {
            filledFields++;
          }
        }
      });
    }
    
    return Math.round((filledFields / totalFields) * 100);
  };
  
  const profileCompletion = calculateProfileCompletion();
  
  // Functie om het profiel compleet te maken
  const getProfileCompletionColor = (): string => {
    if (profileCompletion < 40) return 'bg-red-500';
    if (profileCompletion < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Haal sollicitaties op
  useEffect(() => {
    const fetchApplications = async () => {
      if (!user.id) return;
      
      try {
        setApplicationsLoading(true);
        const q = query(
          collection(db, 'sollicitaties'),
          where('userId', '==', user.id),
          orderBy('applicationDate', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const applicationsData: Application[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          applicationsData.push({
            id: doc.id,
            jobId: data.jobId,
            jobTitle: data.jobTitle || 'Onbekende functie',
            companyName: data.companyName || 'Onbekend bedrijf',
            status: data.status || 'pending',
            applicationDate: data.applicationDate
          });
        });
        
        setApplications(applicationsData);
      } catch (error) {
        console.error('Fout bij ophalen sollicitaties:', error);
      } finally {
        setApplicationsLoading(false);
      }
    };
    
    fetchApplications();
  }, [user.id]);
  
  // Helper functie om datum te formatteren
  const formatDate = (timestamp: Timestamp): string => {
    if (!timestamp) return 'Onbekende datum';
    
    const date = timestamp.toDate();
    return date.toLocaleDateString('nl-NL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  // Helper functie om status kleurcodering te krijgen
  const getStatusStyle = (status: string): { color: string, bg: string, text: string } => {
    switch (status) {
      case 'pending':
        return { color: 'blue', bg: 'blue-100', text: 'Nieuw' };
      case 'reviewing':
        return { color: 'yellow', bg: 'yellow-100', text: 'In behandeling' };
      case 'interview':
        return { color: 'green', bg: 'green-100', text: 'Gesprek ingepland' };
      case 'rejected':
        return { color: 'red', bg: 'red-100', text: 'Afgewezen' };
      case 'accepted':
        return { color: 'emerald', bg: 'emerald-100', text: 'Aangenomen' };
      default:
        return { color: 'gray', bg: 'gray-100', text: 'Onbekend' };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header met welkomstbericht */}
        <div className="p-6 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
          <h1 className="text-3xl font-bold">Welkom, {user.displayName || 'Werkzoekende'}</h1>
          <p className="mt-2 text-primary-100">
            Beheer je profiel en sollicitaties vanaf je persoonlijke dashboard
          </p>
        </div>
        
        {/* Profielstatus sectie */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Mijn profiel</h2>
              <p className="text-gray-600 mt-1">
                Zorg dat je profiel compleet is om je kansen op een baan te vergroten
              </p>
            </div>
            
            <a href="/profile" className="mt-4 md:mt-0 inline-block px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md">
              Profiel bekijken
            </a>
          </div>
        </div>
        
        {/* Dashboard content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Verstuurde sollicitaties */}
          <div className="bg-white border rounded-lg shadow-sm p-5">
            <h3 className="font-semibold text-lg mb-4">Verstuurde sollicitaties</h3>
            
            <div className="space-y-3">
              {applicationsLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600"></div>
                </div>
              ) : applications.length > 0 ? (
                <div className="space-y-3">
                  {applications.map((application) => {
                    const statusStyle = getStatusStyle(application.status);
                    return (
                      <div 
                        key={application.id} 
                        className={`border-l-4 border-${statusStyle.color}-500 pl-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-200`}
                        onClick={() => viewApplicationDetail(application.id)}
                      >
                        <p className="font-medium">{application.jobTitle} bij {application.companyName}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600">
                            Ingediend op {formatDate(application.applicationDate)}
                          </p>
                          <span className={`text-xs font-medium bg-${statusStyle.bg} text-${statusStyle.color}-800 px-2 py-1 rounded-full`}>
                            {statusStyle.text}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <p className="text-gray-500 text-sm italic">Je hebt nog geen sollicitaties verstuurd.</p>
                  
                  <a 
                    href="/jobs" 
                    className="block text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Zoek vacatures om te solliciteren
                  </a>
                </>
              )}
            </div>
          </div>
          
          {/* Favoriete vacatures */}
          <div className="bg-white border rounded-lg shadow-sm p-5">
            <h3 className="font-semibold text-lg mb-4">Favoriete vacatures</h3>
            
            <div className="space-y-3">
              {favoritesLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600"></div>
                </div>
              ) : favorites.length > 0 ? (
                <div className="space-y-3">
                  {favorites.map((favorite) => (
                    <div key={favorite.id} className="border rounded-md p-3 hover:bg-gray-50">
                      <div className="flex justify-between">
                        <p className="font-medium">{favorite.job?.title || 'Onbekende functie'}</p>
                        <button 
                          onClick={() => handleRemoveFavorite(favorite.jobId)}
                          className="text-yellow-500 hover:text-yellow-600"
                          aria-label="Verwijder uit favorieten"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{favorite.job?.company || 'Onbekend bedrijf'}, {favorite.job?.location || 'Onbekende locatie'}</p>
                      <div className="mt-2 flex justify-between items-center">
                        {favorite.job?.salary && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">€{favorite.job.salary}</span>
                        )}
                        <button 
                          onClick={() => goToJobDetail(favorite.jobId)}
                          className="text-primary-600 hover:text-primary-800 text-sm"
                        >
                          Bekijken →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-gray-500 text-sm italic">Je hebt nog geen vacatures als favoriet gemarkeerd.</p>
                  
                  <a 
                    href="/jobs" 
                    className="block text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Ontdek interessante vacatures
                  </a>
                </>
              )}
            </div>
          </div>
          
          {/* Agenda - nu col-span-2 op alle schermformaten voor volledige breedte */}
          <div className="bg-white border rounded-lg shadow-sm p-5 col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Mijn Agenda</h3>
            </div>
            
            <div className="space-y-3">
              <p className="text-gray-500 text-sm italic">Je hebt geen geplande sollicitatiegesprekken of afspraken.</p>
              
              <div className="hidden">
                {/* Dit blok wordt zichtbaar wanneer er afspraken zijn */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-l-4 border-blue-500 pl-3 py-2">
                    <div className="flex items-center">
                      <div className="mr-3 text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Sollicitatiegesprek bij TechCorp</p>
                        <p className="text-sm text-gray-600">Morgen, 10:00 - 11:00</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-3 py-2">
                    <div className="flex items-center">
                      <div className="mr-3 text-green-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Telefonische screening InnovateCo</p>
                        <p className="text-sm text-gray-600">Woensdag, 14:30 - 15:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                <a 
                  href="/jobs" 
                  className="inline-block text-primary-600 hover:text-primary-800 font-medium"
                >
                  Vind interessante vacatures
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard; 