import React, { useState, useEffect } from 'react';
import { BaseUser } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

// Definieer het ontbrekende type
interface CandidateCalendarEvent {
  id: string;
  title: string;
  startDate: Date | Timestamp;
  endDate: Date | Timestamp;
  location?: string;
  description?: string;
  withRecruiter?: string;
  recruiterId?: string;
  candidateId?: string;
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

function JobSeekerDashboard({ user }: { user: BaseUser }) {
  const navigate = useNavigate();
  // Remove the unused state variable
  // const [isExpanded, setIsExpanded] = useState(false);
  const [upcomingAppointments, setUpcomingAppointments] = useState<CandidateCalendarEvent[]>([]);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [profileCompletionPercentage, setProfileCompletionPercentage] = useState(0);
  
  // Remove these unused functions
  // const handleAddAppointment = () => {
  //  navigate('/kalender');
  // };
  
  // State voor sollicitaties
  const [applications, setApplications] = useState<Application[]>([]);

  const handleRemoveFavorite = async (jobId: string) => {
    try {
      // Implement the logic to remove a favorite job
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
        setLoadingApplications(true);
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
        setLoadingApplications(false);
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header met welkomstbericht */}
        <div className="p-6 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
          <h1 className="text-3xl font-bold">Welkom, {user.displayName || 'Werkzoekende'}</h1>
          <p className="mt-2 text-primary-100">
            Vind je droombaan en beheer je sollicitaties op één plek
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
              {loadingApplications ? (
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
              {/* Implement the logic to fetch and display favorite jobs */}
            </div>
          </div>
          
          {/* Agenda - nu col-span-2 op alle schermformaten voor volledige breedte */}
          <div className="bg-white border rounded-lg shadow-sm p-5 col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Mijn Agenda</h3>
              {/* Geen knop voor werkzoekenden */}
            </div>
            
            <div className="space-y-3">
              <p className="text-gray-500 text-sm italic">Je hebt geen geplande sollicitatiegesprekken of afspraken.</p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Info:</span> Als werkzoekende kun je alleen afspraken ontvangen van recruiters. 
                  Je kunt zelf geen afspraken plannen.
                </p>
              </div>
              
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSeekerDashboard; 