import React, { useState, useEffect } from 'react';
import { BaseUser } from '../../types/user';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, limit, Timestamp, doc, getDoc, getFirestore, deleteDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';

// Firebase configuratie (direct uit config bestand kopiëren om initialisatieproblemen te voorkomen)
const firebaseConfig = {
  apiKey: "AIzaSyAiTY14VexbFUQTf3yKhDPhrCtKjRzhMwQ",
  authDomain: "pitchpro-29e90.firebaseapp.com",
  projectId: "pitchpro-29e90",
  storageBucket: "pitchpro-29e90.firebasestorage.app",
  messagingSenderId: "121788535713",
  appId: "1:121788535713:web:9c5ddf4ff9af0a0e2ff1e0",
  measurementId: "G-QGBR93ZYCM"
};

// Zorg ervoor dat we altijd een Firebase instantie hebben
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

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

interface FavoriteCandidate {
  id: string;
  candidateId: string;
  candidateName: string;
  jobTitle: string;
  experience?: string;
  profilePhotoUrl?: string;
  userType: string;
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
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState<boolean>(true);
  const [applicationsError, setApplicationsError] = useState<string | null>(null);
  const [favoriteCandidates, setFavoriteCandidates] = useState<FavoriteCandidate[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState<boolean>(true);
  const [favoritesError, setFavoritesError] = useState<string | null>(null);

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
      // Gebruik beide mogelijke ID velden
      const recruiterId = currentUser?.uid || user.id || user.uid;
      
      if (!recruiterId) {
        console.log('Geen gebruikers-ID gevonden om afspraken mee op te halen');
        return;
      }
      
      try {
        setMeetingsLoading(true);
        setMeetingsError(null);
        
        const now = Timestamp.now();
        const fetchedMeetings: Meeting[] = [];
        let meetingsFound = false;
        
        // Probeer EERST uit 'events' collectie
        try {
          console.log('Afspraken ophalen uit events collectie...');
          const eventsRef = collection(firestore, 'events');
          
          // Haal ALLE events op zonder filters
          console.log('Alle events ophalen en dan lokaal filteren op recruiterId:', recruiterId);
          const querySnapshot = await getDocs(eventsRef);
          
          console.log(`Aantal gevonden events in totaal: ${querySnapshot.size}`);
          
          if (querySnapshot.size > 0) {
            // Debug: Toon alle events om te analyseren
            console.log('Alle events in de collectie:');
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              console.log(`- Event ID: ${doc.id}`, {
                recruiterId: data.recruiterId || data.recruiter_id || data.recruiterId || data.recruitID || data.recruiterUid || data.recruiterUID || data.userId || data.user_id || data.uid,
                attendees: data.attendees || data.deelnemers || data.participants || data.gasten,
                date: data.date, 
                start: data.start,
                startTijd: data.startTijd,
                dateTime: data.dateTime,
                eventType: data.eventType,
                title: data.title || data.naam,
                candidateName: data.candidateName || data.kandidaatNaam || data.metWie,
                allKeys: Object.keys(data)
              });
            });
            
            // Filter lokaal op recruiterId en datum
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              
              // Controleer of dit event bij deze recruiter hoort als organisator of als deelnemer
              const eventRecruiterId = data.recruiterId || data.recruiter_id || data.recruiterId || data.recruitID || data.recruiterUid || data.recruiterUID || data.userId || data.user_id || data.uid;
              
              // Vergelijk ID's als strings om type-mismatch te voorkomen
              const currentRecruiterId = String(recruiterId).trim();
              const eventRecruiterIdStr = eventRecruiterId ? String(eventRecruiterId).trim() : '';
              
              // Check alle mogelijke arrays van deelnemers
              const attendees = data.attendees || data.deelnemers || data.participants || data.gasten || [];
              const attendeesArray = Array.isArray(attendees) ? attendees : typeof attendees === 'string' ? [attendees] : [];
              
              // Check of recruiter een deelnemer is (kan een array van IDs of een array van objecten zijn)
              const isAttendee = attendeesArray.some(attendee => {
                if (typeof attendee === 'string') {
                  return String(attendee).trim() === currentRecruiterId;
                } else if (typeof attendee === 'object' && attendee !== null) {
                  // Check verschillende mogelijke ID velden in een deelnemer object
                  const attendeeId = attendee.id || attendee.uid || attendee.userId || attendee.email;
                  return attendeeId && String(attendeeId).trim() === currentRecruiterId;
                }
                return false;
              });
              
              // Als deze recruiter niet de organisator is EN geen deelnemer is, sla over
              if (eventRecruiterIdStr !== currentRecruiterId && !isAttendee) {
                // console.log(`Event ${doc.id} is niet voor deze recruiter (organisator: ${eventRecruiterIdStr}, deelnemer: ${isAttendee}), overslaan...`);
                return;
              }
              
              // Controleer of dit event in de toekomst is
              let eventDate: Timestamp | null = null;
              
              // Probeer verschillende mogelijke veldnamen voor de datum
              if (data.date && data.date instanceof Timestamp) {
                eventDate = data.date;
              } else if (data.start && data.start instanceof Timestamp) {
                eventDate = data.start;
              } else if (data.startTijd && data.startTijd instanceof Timestamp) {
                eventDate = data.startTijd;
              } else if (data.dateTime && data.dateTime instanceof Timestamp) {
                eventDate = data.dateTime;
              }
              
              // Als we geen geldige datum hebben kunnen vinden, of als het event in het verleden is, sla over
              if (!eventDate || eventDate.seconds < now.seconds) {
                console.log(`Event ${doc.id} is in het verleden of heeft geen geldige datum, overslaan...`);
                return;
              }
              
              console.log(`Event gevonden voor deze recruiter (organisator: ${eventRecruiterIdStr === currentRecruiterId}, deelnemer: ${isAttendee}): ${doc.id}`, data);
              meetingsFound = true;
              
              fetchedMeetings.push({
                id: doc.id,
                title: data.title || data.naam || data.eventType || 'Ongetitelde afspraak',
                candidateName: data.candidateName || data.kandidaatNaam || data.metWie || data.jobSeekerEmail || 'Onbekende kandidaat',
                dateTime: eventDate,
                endDateTime: data.end || data.eindTijd || new Timestamp(eventDate.seconds + 3600, 0),
                locationType: data.locationType || data.locatieType || data.locationtype || 'online',
                location: data.location || data.locatie || data.locationDetails || '',
                meetingLink: data.meetingLink || data.link || '',
                status: data.status || 'gepland'
              });
            });
            
            // Sorteer op datum (oplopend)
            fetchedMeetings.sort((a, b) => a.dateTime.seconds - b.dateTime.seconds);
            
            // Beperk tot 5 eerstvolgende afspraken
            if (fetchedMeetings.length > 5) {
              console.log(`${fetchedMeetings.length} afspraken gevonden, beperken tot 5 eerstvolgende`);
              fetchedMeetings.splice(5);
            }
          }
        } catch (err) {
          console.error('Fout bij ophalen uit events collectie:', err);
        }
        
        // Als er geen afspraken gevonden zijn in events, probeer dan meetings collectie
        if (!meetingsFound) {
          try {
            console.log('Afspraken ophalen uit meetings collectie...');
            const meetingsRef = collection(firestore, 'meetings');
            
            const q = query(
              meetingsRef,
              where('recruiterId', '==', recruiterId),
              where('dateTime', '>=', now),
              orderBy('dateTime', 'asc'),
              limit(5) // Toon alleen de eerst komende 5 meetings
            );
            
            const querySnapshot = await getDocs(q);
            console.log(`Aantal gevonden afspraken in meetings collectie: ${querySnapshot.size}`);
            
            if (querySnapshot.size > 0) {
              meetingsFound = true;
              
              querySnapshot.forEach((doc) => {
                const data = doc.data();
                fetchedMeetings.push({
                  id: doc.id,
                  title: data.title || 'Ongetitelde afspraak',
                  candidateName: data.candidateName || data.kandidaatNaam || 'Onbekende kandidaat',
                  dateTime: data.dateTime,
                  endDateTime: data.endDateTime || new Timestamp(data.dateTime.seconds + 3600, 0), // 1 uur later als fallback
                  locationType: data.locationType || 'online',
                  location: data.location,
                  meetingLink: data.meetingLink,
                  status: data.status || 'gepland'
                });
              });
            }
          } catch (err) {
            console.error('Fout bij ophalen uit meetings collectie:', err);
          }
        }
        
        console.log('Opgehaalde afspraken:', fetchedMeetings);
        
        if (fetchedMeetings.length === 0) {
          console.log('Geen afspraken gevonden. Controleer of er data in de events/meetings collecties staat.');
        }
        
        setMeetings(fetchedMeetings);
      } catch (err) {
        console.error('Fout bij ophalen van afspraken:', err);
        setMeetingsError('Er is een fout opgetreden bij het ophalen van je afspraken');
      } finally {
        setMeetingsLoading(false);
      }
    };
    
    fetchMeetings();
  }, [currentUser, user.id, user.uid]);
  
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
        // Probeer eerst uit de 'jobs' collectie
        const jobsData: Job[] = [];
        let jobsFound = false;
        
        try {
          const jobsRef = collection(firestore, 'jobs');
          const q = query(
            jobsRef, 
            where('recruiterId', '==', recruiterId),
            limit(50)
          );
          
          console.log('Query uitvoeren op jobs collectie...');
          const querySnapshot = await getDocs(q);
          console.log(`Aantal gevonden vacatures in jobs collectie: ${querySnapshot.size}`);
          
          if (querySnapshot.size > 0) {
            jobsFound = true;
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              console.log('Vacature data uit jobs:', {
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
          }
        } catch (err) {
          console.error('Fout bij ophalen uit jobs collectie:', err);
        }
        
        // Als er geen jobs gevonden zijn in de 'jobs' collectie, probeer dan 'vacatures' collectie
        if (!jobsFound) {
          try {
            const vacaturesRef = collection(firestore, 'vacatures');
            const q = query(
              vacaturesRef, 
              where('recruiterId', '==', recruiterId),
              limit(50)
            );
            
            console.log('Query uitvoeren op vacatures collectie...');
            const querySnapshot = await getDocs(q);
            console.log(`Aantal gevonden vacatures in vacatures collectie: ${querySnapshot.size}`);
            
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              console.log('Vacature data uit vacatures:', {
                id: doc.id,
                title: data.title || data.functie,
                recruiterId: data.recruiterId,
                createdAt: data.createdAt || data.aanmaakDatum
              });
              
              jobsData.push({
                id: doc.id,
                title: data.title || data.functie || 'Onbekende functie',
                company: data.company || data.bedrijf || 'Onbekend bedrijf',
                location: data.location || data.locatie || 'Onbekende locatie',
                createdAt: data.createdAt || data.aanmaakDatum,
                status: data.status || data.status || 'active'
              });
            });
          } catch (err) {
            console.error('Fout bij ophalen uit vacatures collectie:', err);
          }
        }
        
        // Sorteer hier lokaal na het ophalen
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
        
        if (jobsData.length === 0) {
          console.log('Geen vacatures gevonden. Controleer of er data in de jobs/vacatures collecties staat.');
        }
        
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
      // Gebruik beide mogelijke ID velden, geef voorrang aan id
      const recruiterId = user.id || user.uid;
      
      if (!recruiterId) {
        console.log('Geen gebruikers-ID gevonden om sollicitaties mee op te halen');
        return;
      }
      
      try {
        setApplicationsLoading(true);
        setApplicationsError(null);
        
        const applicationsData: Application[] = [];
        let applicationsFound = false;
        
        // Probeer eerst uit 'sollicitaties' collectie
        try {
          console.log('Sollicitaties ophalen uit sollicitaties collectie...');
          const q = query(
            collection(firestore, 'sollicitaties'),
            where('recruiterId', '==', recruiterId),
            orderBy('applicationDate', 'desc')
          );
          
          const querySnapshot = await getDocs(q);
          console.log(`Aantal gevonden sollicitaties in sollicitaties collectie: ${querySnapshot.size}`);
          
          if (querySnapshot.size > 0) {
            applicationsFound = true;
            
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              applicationsData.push({
                id: doc.id,
                jobId: data.jobId || data.vacatureId,
                jobTitle: data.jobTitle || data.vacatureTitle || 'Onbekende functie',
                userId: data.userId || data.kandidaatId,
                applicantName: data.applicantName || data.kandidaatNaam || 'Onbekende kandidaat',
                status: data.status || 'pending',
                applicationDate: data.applicationDate || data.sollicitatieDatum,
                location: data.location || data.locatie
              });
            });
          }
        } catch (err) {
          console.error('Fout bij ophalen uit sollicitaties collectie:', err);
        }
        
        // Als er geen sollicitaties gevonden zijn, probeer eventuele alternatieve collecties
        if (!applicationsFound) {
          try {
            console.log('Sollicitaties ophalen uit applications collectie...');
            const q = query(
              collection(firestore, 'applications'),
              where('recruiterId', '==', recruiterId),
              orderBy('createdAt', 'desc')
            );
            
            const querySnapshot = await getDocs(q);
            console.log(`Aantal gevonden sollicitaties in applications collectie: ${querySnapshot.size}`);
            
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              applicationsData.push({
                id: doc.id,
                jobId: data.jobId || data.vacatureId,
                jobTitle: data.jobTitle || data.vacatureTitle || 'Onbekende functie',
                userId: data.userId || data.kandidaatId,
                applicantName: data.applicantName || data.kandidaatNaam || 'Onbekende kandidaat',
                status: data.status || 'pending',
                applicationDate: data.createdAt || data.applicationDate || new Timestamp(0, 0),
                location: data.location || data.locatie
              });
            });
          } catch (err) {
            console.error('Fout bij ophalen uit applications collectie:', err);
          }
        }
        
        console.log('Opgehaalde sollicitaties:', applicationsData);
        
        if (applicationsData.length === 0) {
          console.log('Geen sollicitaties gevonden. Controleer of er data in de sollicitaties/applications collecties staat.');
        }
        
        setApplications(applicationsData);
      } catch (error) {
        console.error('Fout bij ophalen sollicitaties:', error);
        setApplicationsError('Er is een fout opgetreden bij het laden van sollicitaties');
      } finally {
        setApplicationsLoading(false);
      }
    };
    
    fetchApplications();
  }, [user.id, user.uid]);
  
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
    navigate(`/application/${applicationId}`);
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

  // Haal favoriete kandidaten op
  useEffect(() => {
    const fetchFavoriteCandidates = async () => {
      // Gebruik beide mogelijke ID velden
      const recruiterId = user.id || user.uid;
      
      if (!recruiterId) {
        console.log('Geen gebruikers-ID gevonden om favorieten mee op te halen');
        return;
      }
      
      try {
        setFavoritesLoading(true);
        setFavoritesError(null);
        
        const favoritesData: FavoriteCandidate[] = [];
        
        // Probeer uit de 'favorites' collectie
        try {
          console.log('Favoriete kandidaten ophalen met userId filter...');
          const favoritesRef = collection(firestore, 'favorites');
          
          const q = query(
            favoritesRef,
            where('userId', '==', recruiterId),
            limit(10)
          );
          
          const querySnapshot = await getDocs(q);
          console.log(`Aantal gevonden favorieten: ${querySnapshot.size}`);
          
          // Voor elke favoriet, haal extra kandidaat informatie op indien nodig
          for (const docSnap of querySnapshot.docs) {
            const data = docSnap.data();
            const candidateId = data.candidateId || data.candidate_id || (data.userId && data.userId !== recruiterId ? data.userId : null);
            
            // Overslaan als er geen geldig kandidaat-ID is
            if (!candidateId) {
              console.log('Favoriet overgeslagen: geen geldig kandidaat-ID gevonden', data);
              continue;
            }
            
            let candidateName = data.candidateName || 'Onbekende kandidaat';
            let jobTitle = data.jobTitle || 'Functie onbekend';
            let experience = data.experience || '';
            let profilePhotoUrl = data.profilePhotoUrl || '';
            let userType = '';
            
            // Haal kandidaat-informatie op
            try {
              const userRef = doc(firestore, 'users', candidateId);
              const userSnap = await getDoc(userRef);
              
              if (userSnap.exists()) {
                const userData = userSnap.data();
                
                // Controleer of dit een werkzoekende is, geen recruiter
                userType = userData.userType || userData.role || '';
                const isRecruiter = 
                  userType.toLowerCase() === 'recruiter' || 
                  userType.toLowerCase() === 'recruitment' || 
                  userType.toLowerCase() === 'employer';
                
                if (isRecruiter) {
                  console.log(`Favoriet overgeslagen: ${candidateId} is een recruiter, geen kandidaat`);
                  continue;
                }
                
                candidateName = userData.displayName || userData.name || 'Onbekende kandidaat';
                
                // Probeer ook andere gegevens te krijgen als beschikbaar
                jobTitle = userData.jobTitle || userData.functie || userData.position || jobTitle;
                profilePhotoUrl = userData.profilePhotoUrl || userData.photoURL || profilePhotoUrl;
                
                if (userData.profile) {
                  jobTitle = userData.profile.jobTitle || userData.profile.functie || userData.profile.position || jobTitle;
                  experience = userData.profile.experience || userData.profile.ervaring || experience;
                }
              } else {
                console.log(`Favoriet gebruiker ${candidateId} bestaat niet meer`);
                continue;
              }
            } catch (err) {
              console.error('Fout bij ophalen kandidaat gegevens:', err);
              continue;
            }
            
            favoritesData.push({
              id: docSnap.id,
              candidateId,
              candidateName,
              jobTitle,
              experience,
              profilePhotoUrl,
              userType
            });
          }
        } catch (err: any) {
          console.error('Fout bij ophalen uit favorites collectie:', err);
          // Zet de foutmelding specifiek voor de gebruiker
          if (err && err.code === 'permission-denied') {
            setFavoritesError('Je hebt geen rechten om favorieten op te halen. Controleer de Firestore regels.');
          } else {
            setFavoritesError('Er is een fout opgetreden bij het ophalen van favoriete kandidaten.');
          }
        }
        
        console.log('Opgehaalde favoriete kandidaten:', favoritesData);
        setFavoriteCandidates(favoritesData);
      } catch (err: any) {
        console.error('Algemene fout bij ophalen van favoriete kandidaten:', err);
        setFavoritesError('Er is een algemene fout opgetreden.');
      } finally {
        setFavoritesLoading(false);
      }
    };
    
    fetchFavoriteCandidates();
  }, [user.id, user.uid, firestore]);

  // Functie om naar een kandidaat te navigeren
  const handleViewCandidate = (candidateId: string) => {
    navigate(`/candidate/${candidateId}`);
  };
  
  // Functie om een bericht naar een kandidaat te sturen
  const handleMessageCandidate = (e: React.MouseEvent, candidateId: string) => {
    e.stopPropagation(); // Voorkom navigatie naar de kandidaat
    navigate(`/messages/new?recipientId=${candidateId}`);
  };
  
  // Functie om een kandidaat uit de favorieten te verwijderen
  const handleRemoveFavorite = async (e: React.MouseEvent, favoriteId: string) => {
    e.stopPropagation(); // Voorkom navigatie naar de kandidaat
    
    try {
      // Daadwerkelijke delete operatie uit Firebase uitvoeren
      console.log('Favoriet verwijderen met ID:', favoriteId);
      
      // Voer de verwijdering uit in Firebase
      await deleteDoc(doc(firestore, 'favorites', favoriteId));
      
      // Update de UI (optimistic update)
      setFavoriteCandidates(prev => prev.filter(fav => fav.id !== favoriteId));
      
      console.log('Favoriet succesvol verwijderd');
    } catch (err) {
      console.error('Fout bij verwijderen van favoriet:', err);
      // Toon foutmelding aan de gebruiker
      console.log("De favoriet kon niet worden verwijderd. Probeer het later opnieuw.");
    }
  };

  // Bereken statistieken
  const getActiveJobsCount = (): number => {
    return jobs.filter(job => job.status === 'active').length || jobs.length;
  };
  
  const getInterviewsCount = (): number => {
    return applications.filter(app => app.status === 'interview').length;
  };
  
  const getScheduledMeetingsCount = (): number => {
    return meetings.length;
  };
  
  const getReceivedApplicationsCount = (): number => {
    return applications.length;
  };

  return (
    <div className="min-h-screen bg-white">
      
      <div className="max-w-6xl mx-auto px-4 py-20">
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
                
                <Link to="/profile/recruiter" className="mt-2 inline-block text-primary-600 hover:text-primary-800 font-medium">
                  Profiel verbeteren →
                </Link>
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
                  <p className="text-2xl font-bold text-blue-700">{getActiveJobsCount()}</p>
                  <p className="text-sm text-blue-800">Actieve vacatures</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-700">{getReceivedApplicationsCount()}</p>
                  <p className="text-sm text-green-800">Sollicitaties ontvangen</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-700">{getInterviewsCount()}</p>
                  <p className="text-sm text-purple-800">Interviews ingepland</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-yellow-700">{getScheduledMeetingsCount()}</p>
                  <p className="text-sm text-yellow-800">Geplande afspraken</p>
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
              
              {favoritesLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="mt-2 text-gray-500 text-sm">Favorieten laden...</p>
                </div>
              ) : favoritesError ? (
                <div className="text-red-500 text-sm py-2">{favoritesError}</div>
              ) : favoriteCandidates.length > 0 ? (
                <div className="space-y-4">
                  {favoriteCandidates.map(candidate => (
                    <div 
                      key={candidate.id} 
                      className="border rounded-md p-3 flex items-center hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleViewCandidate(candidate.candidateId)}
                    >
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold mr-3 overflow-hidden">
                        {candidate.profilePhotoUrl ? (
                          <img 
                            src={candidate.profilePhotoUrl} 
                            alt={candidate.candidateName} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          candidate.candidateName.substring(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{candidate.candidateName}</h4>
                        <p className="text-sm text-gray-600">
                          {candidate.jobTitle}
                          {candidate.experience && ` • ${candidate.experience}`}
                        </p>
                      </div>
                      <div className="ml-auto flex space-x-2">
                        <button 
                          className="p-1 text-gray-400 hover:text-primary-600"
                          onClick={(e) => handleMessageCandidate(e, candidate.candidateId)}
                          aria-label="Stuur bericht"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </button>
                        <button 
                          className="p-1 text-red-400 hover:text-red-600"
                          onClick={(e) => handleRemoveFavorite(e, candidate.id)}
                          aria-label="Verwijder favoriet"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#ffcc04" stroke="#ffcc04">
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-500 text-sm italic">Je hebt nog geen favoriete kandidaten toegevoegd.</p>
                  
                  <a 
                    href="/candidates" 
                    className="block text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Zoek kandidaten om toe te voegen
                  </a>
                </div>
              )}
            </div>
            
            {/* Agenda */}
            <div className="bg-white border rounded-lg shadow-sm p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Mijn afspraken</h3>
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
                    <p className="mt-2 text-gray-500 text-sm">Afspraken laden...</p>
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
                  <Link 
                    to="/meetings" 
                    className="inline-block text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Beheer je afspraken
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default RecruiterDashboard; 