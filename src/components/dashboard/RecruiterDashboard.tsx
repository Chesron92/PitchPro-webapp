import React, { useState, useEffect } from 'react';
import { BaseUser } from '../../types/user';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  createdAt: any;
  status?: string;
}

interface Meeting {
  id: string;
  title: string;
  candidateName: string;
  dateTime: Timestamp;
  endDateTime: Timestamp;
  locationType: 'online' | 'locatie';
  location?: string;
  meetingLink?: string;
  status: string;
}

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  userId: string;
  applicantName: string;
  status: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
  applicationDate: Timestamp;
  location?: string;
}

interface RecruiterDashboardProps {
  user: BaseUser;
}

const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ user }) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [meetingsLoading, setMeetingsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [meetingsError, setMeetingsError] = useState<string | null>(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>('');
  const { userProfile, currentUser } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState<boolean>(true);
  const [applicationsError, setApplicationsError] = useState<string | null>(null);

  // Bereken completeness van het profiel
  const calculateProfileCompletion = (): number => {
    let totalFields = 0;
    let filledFields = 0;
    
    // Basisvelden
    const baseFields = ['displayName', 'email', 'phoneNumber'];
    totalFields += baseFields.length;
    
    baseFields.forEach(field => {
      if (user[field]) filledFields++;
    });
    
    // Bedrijfsgegevens
    const companyFields = [
      'companyName', 
      'companyAddress', 
      'companyCity', 
      'companyPostalCode',
      'kvkNumber'
    ];
    totalFields += companyFields.length;
    
    companyFields.forEach(field => {
      if (user[field]) filledFields++;
    });
    
    // Profiel specifieke velden
    if (user.profile) {
      const profileFields = ['company', 'position', 'companyLogo', 'companyWebsite', 'companyDescription'];
      totalFields += profileFields.length;
      
      profileFields.forEach(field => {
        if (user.profile && (user.profile as Record<string, any>)[field]) {
          filledFields++;
        }
      });
    }
    
    return Math.round((filledFields / totalFields) * 100);
  };
  
  const profileCompletion = calculateProfileCompletion();
  
  // Bepaal de kleur van de voortgangsbalk
  const getProfileCompletionColor = (): string => {
    if (profileCompletion < 40) return 'bg-red-500';
    if (profileCompletion < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Haal de bedrijfsnaam op uit verschillende mogelijke velden
  const getCompanyName = (): string => {
    if (user.profile && (user.profile as Record<string, any>).company) {
      return (user.profile as Record<string, any>).company;
    }
    if (user.companyName) {
      return user.companyName;
    }
    return 'Je bedrijf';
  };
  
  // Functie om naar de pagina voor het aanmaken van een nieuwe vacature te navigeren
  const handleCreateJob = () => {
    navigate('/create-job');
  };

  // Functie om naar de vacature detailpagina te navigeren
  const handleViewJob = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };
  
  const handleAddAppointment = () => {
    navigate('/schedule-meeting');
  };
  
  // Haal de geplande meetings op voor deze recruiter
  useEffect(() => {
    const fetchMeetings = async () => {
      if (!currentUser) return;
      
      try {
        setMeetingsLoading(true);
        setMeetingsError(null);
        
        const now = Timestamp.now();
        const meetingsRef = collection(db, 'meetings');
        
        // Haal meetings op waar de recruiterId overeenkomt met de huidige gebruiker
        // en de meeting in de toekomst plaatsvindt
        const q = query(
          meetingsRef,
          where('recruiterId', '==', currentUser.uid),
          where('dateTime', '>=', now),
          orderBy('dateTime', 'asc'),
          limit(5) // Toon alleen de eerst komende 5 meetings
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedMeetings: Meeting[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedMeetings.push({
            id: doc.id,
            title: data.title || 'Ongetitelde afspraak',
            candidateName: data.candidateName || 'Onbekende kandidaat',
            dateTime: data.dateTime,
            endDateTime: data.endDateTime,
            locationType: data.locationType,
            location: data.location,
            meetingLink: data.meetingLink,
            status: data.status || 'gepland'
          });
        });
        
        setMeetings(fetchedMeetings);
      } catch (err) {
        console.error('Fout bij ophalen van meetings:', err);
        setMeetingsError('Er is een fout opgetreden bij het ophalen van je afspraken');
      } finally {
        setMeetingsLoading(false);
      }
    };
    
    fetchMeetings();
  }, [currentUser]);
  
  // Haal vacatures op die gemaakt zijn door deze recruiter
  useEffect(() => {
    const fetchJobs = async () => {
      // BELANGRIJK: Controleer welke ID velden beschikbaar zijn
      console.log('Gebruiker ID velden:', {
        id: user.id,
        uid: user.uid,
        allKeys: Object.keys(user)
      });
      
      // Gebruik beide mogelijke ID velden, geef voorrang aan id
      const recruiterId = user.id || user.uid;
      
      if (!recruiterId) {
        console.log('Geen gebruikers-ID gevonden om vacatures mee op te halen', user);
        setError('Gebruikers-ID niet gevonden. Probeer opnieuw in te loggen.');
        return;
      }
      
      console.log('Vacatures ophalen voor recruiterId:', recruiterId);
      setLoading(true);
      setError(null);
      
      try {
        const jobsRef = collection(db, 'jobs');
        
        // Probeer eerst zonder orderBy - alleen op recruiterId filteren
        const q = query(
          jobsRef, 
          where('recruiterId', '==', recruiterId),
          // De volgende regel kan een index error veroorzaken
          // orderBy('createdAt', 'desc')
          // Gebruik liever een limiet dan een sortering als je problemen hebt
          limit(50) // Haal maximaal 50 vacatures op
        );
        
        console.log('Query uitgevoerd...');
        const querySnapshot = await getDocs(q);
        console.log(`Aantal gevonden vacatures: ${querySnapshot.size}`);
        
        const jobsData: Job[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Vacature data:', {
            id: doc.id,
            title: data.title,
            recruiterId: data.recruiterId,
            createdAt: data.createdAt
          });
          
          jobsData.push({
            id: doc.id,
            title: data.title || 'Onbekende functie',
            company: data.company || 'Onbekend bedrijf',
            location: data.location || 'Onbekende locatie',
            createdAt: data.createdAt,
            status: data.status || 'active'
          });
        });
        
        // Sorteer hier lokaal na het ophalen, dit vermijdt Firebase index problemen
        jobsData.sort((a, b) => {
          // Als createdAt undefined is, zet het item onderaan
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          
          // Probeer te sorteren op basis van Firestore timestamp of Date object
          try {
            const dateA = a.createdAt instanceof Timestamp 
              ? a.createdAt.toDate() 
              : a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
            
            const dateB = b.createdAt instanceof Timestamp 
              ? b.createdAt.toDate() 
              : b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
              
            return dateB.getTime() - dateA.getTime(); // Nieuwste eerst
          } catch (err) {
            console.error('Fout bij sorteren:', err);
            return 0;
          }
        });
        
        console.log('Opgehaalde vacatures (gesorteerd):', jobsData);
        setJobs(jobsData);
      } catch (err) {
        console.error('Fout bij ophalen van vacatures:', err);
        setError('Er is een fout opgetreden bij het ophalen van je vacatures');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [user]);
  
  // Haal sollicitaties op
  useEffect(() => {
    const fetchApplications = async () => {
      if (!user.id) return;
      
      try {
        setApplicationsLoading(true);
        setApplicationsError(null);
        
        const q = query(
          collection(db, 'sollicitaties'),
          where('recruiterId', '==', user.id),
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
            userId: data.userId,
            applicantName: data.applicantName || 'Onbekende kandidaat',
            status: data.status || 'pending',
            applicationDate: data.applicationDate,
            location: data.location
          });
        });
        
        setApplications(applicationsData);
      } catch (error) {
        console.error('Fout bij ophalen sollicitaties:', error);
        setApplicationsError('Er is een fout opgetreden bij het laden van sollicitaties');
      } finally {
        setApplicationsLoading(false);
      }
    };
    
    fetchApplications();
  }, [user.id]);
  
  // Helper functie om datum te formatteren
  const formatApplicationDate = (timestamp: Timestamp): string => {
    if (!timestamp) return 'Onbekende datum';
    
    const date = timestamp.toDate();
    return date.toLocaleDateString('nl-NL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  // Helper functie om status badge te krijgen
  const getStatusBadge = (status: string): { color: string, bg: string, text: string } => {
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
  
  // Navigeer naar sollicitatie detail pagina
  const handleViewApplication = (applicationId: string) => {
    navigate(`/applications/${applicationId}`);
  };
  
  // Helper functie om meeting datum/tijd te formatteren
  const formatMeetingDateTime = (dateTime: Timestamp, endDateTime: Timestamp): string => {
    const startDate = dateTime.toDate();
    const endDate = endDateTime.toDate();
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check of het vandaag of morgen is
    let dayPrefix = '';
    if (startDate.toDateString() === today.toDateString()) {
      dayPrefix = 'Vandaag';
    } else if (startDate.toDateString() === tomorrow.toDateString()) {
      dayPrefix = 'Morgen';
    } else {
      // Anders gebruik datum in nl-NL formaat
      dayPrefix = startDate.toLocaleDateString('nl-NL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
    }
    
    // Formatteer tijd
    const startTime = startDate.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    const endTime = endDate.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    return `${dayPrefix}, ${startTime} - ${endTime}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header met welkomstbericht */}
        <div className="p-6 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
          <h1 className="text-3xl font-bold">Welkom, {user.displayName || 'Recruiter'}</h1>
          <p className="mt-2 text-primary-100">
            Beheer je vacatures en vind de juiste kandidaten voor {getCompanyName()}
          </p>
        </div>
        
        {/* Profielstatus sectie */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Bedrijfsprofiel</h2>
              <p className="text-gray-600 mt-1">
                Maak je bedrijfsprofiel compleet om meer geschikte kandidaten te vinden
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="flex items-center">
                <div className="relative w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full ${getProfileCompletionColor()}`} 
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
                <span className="ml-3 font-medium">{profileCompletion}% compleet</span>
              </div>
              
              <a href="/profile/recruiter" className="mt-2 inline-block text-primary-600 hover:text-primary-800 font-medium">
                Profiel verbeteren →
              </a>
            </div>
          </div>
        </div>
        
        {/* Dashboard content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Geplaatste vacatures */}
          <div className="bg-white border rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Mijn vacatures</h3>
              <button 
                onClick={handleCreateJob}
                className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-md"
              >
                + Nieuwe vacature
              </button>
            </div>
            
            {loading && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600"></div>
                <span className="ml-2">Laden...</span>
              </div>
            )}
            
            {error && (
              <div className="text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-md">
                <p className="font-medium">Er is een fout opgetreden:</p>
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 text-primary-600 hover:text-primary-800 font-medium"
                >
                  Probeer opnieuw
                </button>
              </div>
            )}
            
            {!loading && !error && jobs.length === 0 && (
              <div className="space-y-3">
                <p className="text-gray-500 text-sm italic">Je hebt nog geen vacatures geplaatst.</p>
                
                <Link 
                  to="/create-job" 
                  className="block text-primary-600 hover:text-primary-800 font-medium"
                >
                  Aan de slag met je eerste vacature
                </Link>
              </div>
            )}
            
            {!loading && !error && jobs.length > 0 && (
              <div className="space-y-3">
                {jobs.map((job) => (
                  <div 
                    key={job.id}
                    onClick={() => handleViewJob(job.id)}
                    className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{job.title}</h4>
                        <p className="text-sm text-gray-600">
                          {job.company} • {job.location}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {job.createdAt?.toDate ? 
                            new Date(job.createdAt.toDate()).toLocaleDateString('nl-NL', {
                              year: 'numeric', month: 'long', day: 'numeric'
                            }) : 
                            'Datum onbekend'
                          }
                        </p>
                      </div>
                      <div>
                        <span 
                          className={`px-2 py-1 text-xs rounded-full ${
                            job.status === 'active' ? 'bg-green-100 text-green-800' : 
                            job.status === 'paused' ? 'bg-yellow-100 text-yellow-800' : 
                            job.status === 'deleted' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {job.status === 'active' ? 'Actief' : 
                           job.status === 'paused' ? 'Gepauzeerd' : 
                           job.status === 'closed' ? 'Gesloten' :
                           job.status === 'deleted' ? 'Verwijderd' :
                           'Onbekend'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-4">
                  <Link 
                    to="/create-job" 
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                  >
                    + Nog een vacature plaatsen
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Ontvangen sollicitaties */}
          <div className="bg-white border rounded-lg shadow-sm p-5">
            <h3 className="font-semibold text-lg mb-4">Ontvangen sollicitaties</h3>
            
            <div className="space-y-3">
              {applicationsLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="mt-2 text-gray-500 text-sm">Sollicitaties laden...</p>
                </div>
              ) : applicationsError ? (
                <div className="text-red-500 text-sm py-2">{applicationsError}</div>
              ) : applications.length > 0 ? (
                <div className="space-y-3">
                  {applications.map((application) => {
                    const statusBadge = getStatusBadge(application.status);
                    return (
                      <div key={application.id} className={`border-l-4 border-${statusBadge.color}-500 pl-3 py-2 hover:bg-gray-50 cursor-pointer`} onClick={() => handleViewApplication(application.id)}>
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{application.applicantName}</p>
                            <p className="text-sm text-gray-600">{application.jobTitle} {application.location ? `• ${application.location}` : ''}</p>
                          </div>
                          <span className={`text-xs bg-${statusBadge.bg} text-${statusBadge.color}-800 px-2 py-1 rounded flex items-center h-fit`}>
                            {statusBadge.text}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Sollicitatie ontvangen op {formatApplicationDate(application.applicationDate)}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <p className="text-gray-500 text-sm italic">
                    Je hebt nog geen sollicitaties ontvangen.
                  </p>
                  
                  <a 
                    href="/create-job" 
                    className="block text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Plaats een vacature om sollicitaties te ontvangen
                  </a>
                </>
              )}
            </div>
          </div>
          
          {/* Statistieken */}
          <div className="bg-white border rounded-lg shadow-sm p-5 md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Statistieken</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-700">{jobs.length}</p>
                <p className="text-sm text-blue-800">Actieve vacatures</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-700">{applications.length}</p>
                <p className="text-sm text-green-800">Sollicitaties ontvangen</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-700">0</p>
                <p className="text-sm text-purple-800">Interviews ingepland</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-yellow-700">0</p>
                <p className="text-sm text-yellow-800">Kandidaten benaderd</p>
              </div>
            </div>
          </div>
          
          {/* Favoriete kandidaten */}
          <div className="bg-white border rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Favoriete kandidaten</h3>
              <a href="/candidates" className="px-3 py-1 text-primary-600 hover:text-primary-700 text-sm">
                Alle kandidaten bekijken →
              </a>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-500 text-sm italic">Je hebt nog geen favoriete kandidaten toegevoegd.</p>
              
              <div className="hidden">
                {/* Dit blok wordt zichtbaar wanneer er favoriete kandidaten zijn */}
                <div className="border rounded-md p-3 flex items-center hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold mr-3">
                    JD
                  </div>
                  <div>
                    <h4 className="font-medium">Jan de Vries</h4>
                    <p className="text-sm text-gray-600">Frontend Developer • 4 jaar ervaring</p>
                  </div>
                  <div className="ml-auto flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-primary-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <a 
                href="/candidates" 
                className="block text-primary-600 hover:text-primary-800 font-medium"
              >
                Zoek kandidaten om toe te voegen
              </a>
            </div>
          </div>
          
          {/* Agenda */}
          <div className="bg-white border rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Agenda</h3>
              <button 
                onClick={handleAddAppointment}
                className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-md"
              >
                + Afspraak toevoegen
              </button>
            </div>
            
            <div className="space-y-3">
              {meetingsLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="mt-2 text-gray-500 text-sm">Agenda laden...</p>
                </div>
              ) : meetingsError ? (
                <div className="text-red-500 text-sm py-2">{meetingsError}</div>
              ) : meetings.length === 0 ? (
                <p className="text-gray-500 text-sm italic">Je hebt geen geplande afspraken voor de komende dagen.</p>
              ) : (
                <div className="space-y-3">
                  {meetings.map((meeting) => (
                    <div key={meeting.id} className="border-l-4 border-primary-500 pl-3 py-2">
                      <div className="flex items-center">
                        <div className="mr-3 text-primary-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">{meeting.title}</p>
                          <p className="text-sm text-gray-600">
                            {formatMeetingDateTime(meeting.dateTime, meeting.endDateTime)}
                          </p>
                          <p className="text-xs text-gray-500">Met {meeting.candidateName}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex justify-center mt-4">
                <a 
                  href="/agenda" 
                  className="inline-block text-primary-600 hover:text-primary-800 font-medium"
                >
                  Beheer je agenda
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard; 