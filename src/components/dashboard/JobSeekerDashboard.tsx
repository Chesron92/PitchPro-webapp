import React, { useState, useEffect } from 'react';
import { BaseUser } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, Timestamp, doc, getDoc } from 'firebase/firestore';
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

// Voeg interface toe voor favoriete vacature
interface FavoriteJob {
  id: string;
  jobId: string;
  title: string;
  company: string;
  location?: string;
  type?: string;
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
  const [favorites, setFavorites] = useState<FavoriteJob[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [profileViews, setProfileViews] = useState<number>(0);
  const [loadingProfileViews, setLoadingProfileViews] = useState(true);

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
    navigate(`/application/${applicationId}`);
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
      if (
        user[field] ||
        (user.address && typeof user.address === 'object' && (user.address as Record<string, any>)[field])
      ) {
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

  // ------ NIEUW: Afspraken ophalen ------
  useEffect(() => {
    const fetchEvents = async () => {
      if (!user.id) return;

      try {
        setLoadingAppointments(true);
        const q = query(
          collection(db, 'events'),
          where('jobSeekerID', '==', user.id),
          orderBy('date', 'asc')
        );

        const snapshot = await getDocs(q);
        const eventsData: CandidateCalendarEvent[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data();
          eventsData.push({
            id: docSnap.id,
            title: data.title,
            startDate: data.date,
            endDate: data.date,
            location: data.locationDetails,
            description: data.eventType,
            withRecruiter: data.recruiterEmail,
            recruiterId: data.recruiterID,
            candidateId: data.jobSeekerID,
          });
        });
        setUpcomingAppointments(eventsData);
      } catch (err) {
        console.error('Fout bij ophalen events:', err);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchEvents();
  }, [user.id]);

  // ------ NIEUW: Favorieten ophalen ------
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user.id) return;

      try {
        setLoadingFavorites(true);
        const q = query(
          collection(db, 'favorites'),
          where('userId', '==', user.id)
        );
        const snap = await getDocs(q);
        const favData: FavoriteJob[] = [];
        for (const favDoc of snap.docs) {
          const fav = favDoc.data();
          let title = fav.jobTitle || '';
          let company = fav.company || '';

          // Als title of company ontbreekt, fetch job document
          if ((!title || !company) && fav.jobId) {
            try {
              const jobRef = doc(db, 'jobs', fav.jobId);
              const jobSnap = await getDoc(jobRef);
              if (jobSnap.exists()) {
                const jobInfo = jobSnap.data();
                title = title || jobInfo.title;
                company = company || jobInfo.company;
              }
            } catch (e) {
              console.warn('Kon job-details niet ophalen voor favorite', fav.jobId);
            }
          }

          favData.push({
            id: favDoc.id,
            jobId: fav.jobId,
            title,
            company,
            location: fav.location || '',
            type: fav.type || '',
          });
        }
        setFavorites(favData);
      } catch (err) {
        console.error('Fout bij ophalen favorites:', err);
      } finally {
        setLoadingFavorites(false);
      }
    };

    fetchFavorites();
  }, [user.id]);

  // fetch profile views
  useEffect(()=>{
    const fetchViews = async ()=>{
      if(!user.id) return;
      try{
        setLoadingProfileViews(true);
        const q = query(collection(db,'profileViews'), where('jobSeekerID','==',user.id));
        const snap = await getDocs(q);
        setProfileViews(snap.size);
      }catch(err){
        console.error('Fout bij ophalen profiel views:',err);
      }finally{
        setLoadingProfileViews(false);
      }
    };
    fetchViews();
  },[user.id]);

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
          
          {/* Agenda / Afspraken */}
          <div className="bg-white border rounded-lg shadow-sm p-5 col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Mijn Afspraken</h3>
            </div>
            {loadingAppointments ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map(ev => (
                  <div key={ev.id} className="border-l-4 border-blue-500 pl-3 py-2 hover:bg-gray-50 cursor-pointer" onClick={()=>navigate(`/event/${ev.id}`)}>
                    <p className="font-medium">{ev.title}</p>
                    <p className="text-sm text-gray-600">
                      Tijd: {ev.startDate instanceof Timestamp ? format(ev.startDate.toDate(),'HH:mm') : ''}
                    </p>
                    <p className="text-sm text-gray-600">Locatie: {ev.location}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">Geen afspraken gepland.</p>
            )}
          </div>

          {/* Favoriete vacatures */}
          <div className="bg-white border rounded-lg shadow-sm p-5 col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Favoriete vacatures</h3>
              <a href="/jobs" className="text-primary-600 hover:text-primary-800 text-sm font-medium">Bekijk alle vacatures</a>
            </div>
            {loadingFavorites ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-x-auto pb-2">
                {favorites.map(fav => (
                  <div key={fav.id} className="bg-primary-50 p-4 rounded shadow-sm min-w-[250px] hover:bg-primary-100 cursor-pointer" onClick={()=>goToJobDetail(fav.jobId)}>
                    <p className="font-semibold">{fav.title}</p>
                    <p className="text-sm text-gray-600">{fav.company}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">Je hebt nog geen favoriete vacatures.</p>
            )}
          </div>

          {/* Statistieken overzicht */}
          <div className="bg-white border rounded-lg shadow-sm p-5 col-span-1 md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Statistieken Overzicht</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatTile label="Verzonden Sollicitaties" value={applications.length} />
              <StatTile label="In Behandeling" value={applications.filter(a=>a.status==='reviewing').length} />
              <StatTile label="Uitgenodigd" value={applications.filter(a=>a.status==='interview').length} />
              <StatTile label="Geplande Gesprekken" value={upcomingAppointments.length} />
              <StatTile label="Profiel Bekeken" value={profileViews} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatTile: React.FC<{label:string; value:number}> = ({ label, value }) => (
  <div className="flex flex-col items-center bg-primary-50 rounded-lg p-4 shadow-sm">
    <span className="text-3xl font-bold text-primary-700">{value}</span>
    <span className="text-sm text-gray-600 text-center mt-1">{label}</span>
  </div>
);

export default JobSeekerDashboard; 