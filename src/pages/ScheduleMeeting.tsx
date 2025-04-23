import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, Timestamp, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Footer from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';
import { isRecruiter } from '../types/user';

interface CandidateBasicData {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
}

interface MeetingFormInputs {
  date: Date;
  time: string;
  endTime: string;
  title: string;
  description: string;
  meetingType: 'sollicitatiegesprek' | 'kennismaking';
  locationType: 'online' | 'locatie';
  location?: string;
  // Voor online meetings
  meetingLink?: string;
  // Voor handmatige toevoeging van kandidaten
  candidateId?: string;
  candidateName?: string;
  candidateEmail?: string;
}

const ScheduleMeeting: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  const [candidate, setCandidate] = useState<CandidateBasicData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<CandidateBasicData[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  // State voor huidige maand en jaar in de kalender
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  
  // Controleer of de gebruiker een recruiter is
  const isUserRecruiter = isRecruiter(userProfile);

  // Direct redirect naar dashboard als de gebruiker geen recruiter is
  if (!isUserRecruiter) {
    return <Navigate to="/dashboard" />;
  }
  
  const { 
    register, 
    handleSubmit, 
    control, 
    watch, 
    formState: { errors }, 
    setValue,
    reset
  } = useForm<MeetingFormInputs>({
    defaultValues: {
      date: new Date(),
      time: '10:00',
      endTime: '11:00',
      title: '',
      description: '',
      meetingType: 'kennismaking',
      locationType: 'online',
    }
  });
  
  // Kijk of de locatie een lokale afspraak is of online
  const locationType = watch('locationType');
  
  // Haal kandidaat gegevens op als er een ID is
  useEffect(() => {
    const fetchCandidate = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const candidateDoc = await getDoc(doc(db, 'users', id));
        
        if (candidateDoc.exists()) {
          const candidateData = candidateDoc.data();
          const candidateInfo = {
            id: candidateDoc.id,
            name: candidateData.displayName || candidateData.name || 'Onbekende kandidaat',
            email: candidateData.email,
            phoneNumber: candidateData.phoneNumber
          };
          setCandidate(candidateInfo);
          
          // Vul automatisch de kandidaatinformatie in het formulier
          setValue('candidateId', candidateInfo.id);
          setValue('candidateName', candidateInfo.name);
          setValue('candidateEmail', candidateInfo.email || '');
        } else {
          setError('Kandidaat niet gevonden');
        }
      } catch (err) {
        console.error('Error fetching candidate:', err);
        setError('Er is een fout opgetreden bij het laden van de kandidaat');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCandidate();
  }, [id, setValue]);
  
  // Zoek kandidaten op basis van zoekterm
  const searchCandidates = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      setIsSearching(true);
      setError(null);
      
      // Zoek in de users collectie op displayName, name of email
      const usersRef = collection(db, 'users');
      
      // Helaas ondersteunt Firebase niet het zoeken met LIKE of case-insensitive, 
      // dus we halen alle gebruikers op en filteren client-side
      const querySnapshot = await getDocs(usersRef);
      
      const results: CandidateBasicData[] = [];
      
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        // Filter gebruikers met werkzoekende/jobseeker rol
        if (userData.role === 'werkzoekende' || userData.userType === 'werkzoekende' || 
            userData.role === 'jobseeker' || userData.userType === 'jobseeker') {
          
          const name = userData.displayName || userData.name || '';
          const email = userData.email || '';
          
          // Voeg toe als naam of email de zoekterm bevat (case-insensitive)
          if (name.toLowerCase().includes(searchTerm.toLowerCase()) || 
              email.toLowerCase().includes(searchTerm.toLowerCase())) {
            
            results.push({
              id: doc.id,
              name: name,
              email: email,
              phoneNumber: userData.phoneNumber
            });
          }
        }
      });
      
      setSearchResults(results);
      
      if (results.length === 0) {
        setError('Geen kandidaten gevonden met deze zoekopdracht');
      }
    } catch (err) {
      console.error('Fout bij zoeken kandidaten:', err);
      setError('Er is een fout opgetreden bij het zoeken naar kandidaten');
    } finally {
      setIsSearching(false);
    }
  };
  
  // Selecteer een kandidaat uit de zoekresultaten
  const selectCandidate = (selectedCandidate: CandidateBasicData) => {
    setCandidate(selectedCandidate);
    setValue('candidateId', selectedCandidate.id);
    setValue('candidateName', selectedCandidate.name);
    setValue('candidateEmail', selectedCandidate.email || '');
    setSearchResults([]);
    setSearchTerm('');
  };
  
  // Handmatig een kandidaat toevoegen
  const addManualCandidate = () => {
    const manualName = watch('candidateName');
    const manualEmail = watch('candidateEmail');
    
    if (!manualName) {
      setError('Vul tenminste een naam in voor de kandidaat');
      return;
    }
    
    // Stel een tijdelijke kandidaat in voor de UI
    setCandidate({
      id: 'manual', // Dit wordt vervangen door de firestore ID na het aanmaken
      name: manualName,
      email: manualEmail,
    });
    
    setSearchResults([]);
    setSearchTerm('');
  };
  
  // Afspraak toevoegen aan de database
  const onSubmit: SubmitHandler<MeetingFormInputs> = async (data) => {
    if (!currentUser) return;
    
    // Check of er een kandidaat geselecteerd of handmatig toegevoegd is
    const candidateId = data.candidateId || (candidate ? candidate.id : null);
    const candidateName = data.candidateName || (candidate ? candidate.name : null);
    
    if (!candidateId && !candidateName) {
      setError('Selecteer een kandidaat of voeg handmatig een kandidaat toe');
      return;
    }
    
    try {
      setLoading(true);
      
      // Combineer datum en tijd
      const dateTime = new Date(data.date);
      const [hours, minutes] = data.time.split(':').map(Number);
      dateTime.setHours(hours, minutes);
      
      // Bereken eindtijd
      const endDateTime = new Date(data.date);
      const [endHours, endMinutes] = data.endTime.split(':').map(Number);
      endDateTime.setHours(endHours, endMinutes);
      
      // Als het een handmatig toegevoegde kandidaat is zonder ID, 
      // maak eerst een gebruiker aan
      let finalCandidateId = candidateId;
      
      if (candidateId === 'manual' || !candidateId) {
        // Maak een nieuwe gebruiker aan in de users collectie
        const newUserRef = await addDoc(collection(db, 'users'), {
          displayName: candidateName,
          email: data.candidateEmail || null,
          role: 'werkzoekende',
          userType: 'werkzoekende',
          createdAt: Timestamp.now(),
          createdBy: currentUser.uid,
          isManuallyAdded: true
        });
        
        finalCandidateId = newUserRef.id;
      }
      
      // Voorbereid de meeting data
      const meetingData = {
        candidateId: finalCandidateId,
        candidateName: candidateName,
        candidateEmail: data.candidateEmail || null,
        recruiterId: currentUser.uid,
        recruiterName: userProfile?.displayName || 'Onbekende recruiter',
        title: data.title,
        description: data.description,
        meetingType: data.meetingType,
        locationType: data.locationType,
        location: data.locationType === 'locatie' ? data.location : null,
        meetingLink: data.locationType === 'online' ? data.meetingLink : null,
        dateTime: Timestamp.fromDate(dateTime),
        endDateTime: Timestamp.fromDate(endDateTime),
        status: 'gepland',
        createdAt: Timestamp.now()
      };
      
      // Voeg de meeting toe aan de database
      await addDoc(collection(db, 'meetings'), meetingData);
      
      // Succes!
      setSuccess(true);
      
      // Wacht 2 seconden en ga terug naar dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
      // Reset het formulier met de huidige data om waarden te behouden
      reset(data);
      
    } catch (err) {
      console.error('Error creating meeting:', err);
      
      let errorMessage = 'Er is een fout opgetreden bij het plannen van de afspraak';
      
      if (err instanceof Error) {
        console.error('Foutdetails:', err.message);
        
        if (err.message.includes('permission-denied')) {
          errorMessage = 'Je hebt geen toestemming om afspraken te plannen. Controleer of je de juiste rechten hebt.';
        } else if (err.message.includes('network')) {
          errorMessage = 'Er lijkt een netwerkprobleem te zijn. Controleer je internetverbinding en probeer het opnieuw.';
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  // Calendar UI helpers
  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Navigeer naar de vorige maand
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  // Navigeer naar de volgende maand
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = daysInMonth(currentYear, currentMonth);
    
    const days = [];
    
    // Voeg lege dagen toe voor het begin van de maand
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 border border-gray-200"></div>);
    }
    
    // Voeg dagen toe
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const today = new Date();
      const isToday = today.getDate() === i && 
                      today.getMonth() === currentMonth && 
                      today.getFullYear() === currentYear;
      const isSelected = selectedDate?.getDate() === i && 
                         selectedDate?.getMonth() === currentMonth && 
                         selectedDate?.getFullYear() === currentYear;
      
      days.push(
        <div 
          key={`day-${i}`}
          onClick={() => {
            setSelectedDate(date);
            setValue('date', date);
          }}
          className={`h-12 flex items-center justify-center cursor-pointer hover:bg-primary-100 transition-colors
            ${isToday ? 'font-bold' : ''}
            ${isSelected ? 'bg-primary-500 text-white hover:bg-primary-600' : 'bg-white'}
            border border-gray-200`}
        >
          {i}
        </div>
      );
    }
    
    return days;
  };
  
  // Loading state
  if (loading && !candidate) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Bezig met laden...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Error state
  if (loading && id) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Bezig met laden...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      
      {/* Blauwe header sectie, identiek aan de kandidaat pagina */}
      <div className="w-full bg-gradient-to-r from-primary-600 to-primary-800 text-white py-32 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">Afspraak plannen</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            {candidate 
              ? `Plan een afspraak met ${candidate.name}`
              : 'Plan een afspraak met een kandidaat'}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Kandidaat selectie formulier */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Kandidaat selecteren</h2>
              
              {/* Zoekbalk */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Zoek een kandidaat
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Voer naam of e-mail in..."
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="button"
                    onClick={searchCandidates}
                    disabled={isSearching}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSearching ? 'Zoeken...' : 'Zoek'}
                  </button>
                </div>
              </div>
              
              {/* Zoekresultaten */}
              {searchResults.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Gevonden kandidaten</h3>
                  <div className="max-h-60 overflow-y-auto border rounded-md">
                    {searchResults.map((result) => (
                      <div 
                        key={result.id}
                        onClick={() => selectCandidate(result)}
                        className="p-3 border-b hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{result.name}</p>
                          {result.email && <p className="text-sm text-gray-600">{result.email}</p>}
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Selecteren
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Toon melding als geen resultaten gevonden zijn */}
              {searchTerm && searchResults.length === 0 && !isSearching && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800">
                    Geen kandidaten gevonden. Controleer de spelling of zoek op een andere naam of e-mail.
                  </p>
                </div>
              )}
              
              {/* OF handmatig toevoegen */}
              <div className="mb-6">
                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-600">OF</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
              </div>
              
              {/* Handmatig kandidaat toevoegen */}
              <div className="space-y-4">
                <h3 className="font-medium">Voeg handmatig een kandidaat toe</h3>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="candidateName">
                    Naam kandidaat *
                  </label>
                  <input
                    id="candidateName"
                    {...register('candidateName', { required: 'Naam is verplicht' })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Volledige naam"
                  />
                  {errors.candidateName && (
                    <p className="text-red-500 text-xs italic mt-1">{errors.candidateName.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="candidateEmail">
                    E-mail kandidaat
                  </label>
                  <input
                    id="candidateEmail"
                    {...register('candidateEmail', { 
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Ongeldig e-mailadres"
                      }
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="E-mailadres"
                  />
                  {errors.candidateEmail && (
                    <p className="text-red-500 text-xs italic mt-1">{errors.candidateEmail.message}</p>
                  )}
                </div>
                
                <div>
                  <button
                    type="button"
                    onClick={addManualCandidate}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                  >
                    Bevestig kandidaat
                  </button>
                </div>
              </div>
              
              {/* Geselecteerde kandidaat weergave */}
              {candidate && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-medium mb-2">Geselecteerde kandidaat</h3>
                  <p className="text-xl font-bold">{candidate.name}</p>
                  {candidate.email && <p className="text-gray-600">{candidate.email}</p>}
                  <button
                    type="button"
                    onClick={() => setCandidate(null)}
                    className="mt-2 text-red-600 hover:text-red-800 text-sm"
                  >
                    Verwijderen
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Kalender gedeelte */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Datum selecteren</h2>
              
              {/* Maand en jaar */}
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={goToPreviousMonth}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Vorige maand"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <h3 className="text-lg font-medium">
                  {new Date(currentYear, currentMonth).toLocaleDateString('nl-NL', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h3>
                <button 
                  onClick={goToNextMonth}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Volgende maand"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Weekdagen */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'].map((day) => (
                  <div key={day} className="h-10 flex items-center justify-center font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Kalender dagen */}
              <div className="grid grid-cols-7 gap-1">
                {generateCalendar()}
              </div>
              
              {/* Geselecteerde datum weergave */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Geselecteerde datum</h3>
                <p className="text-xl font-bold">
                  {selectedDate ? selectedDate.toLocaleDateString('nl-NL', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  }) : 'Geen datum geselecteerd'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Formulier gedeelte */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Afspraak details</h2>
              
              {success ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  Afspraak succesvol gepland! Pagina wordt omgeleid...
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Titel */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                      Titel afspraak *
                    </label>
                    <input
                      id="title"
                      {...register('title', { required: 'Titel is verplicht' })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Bijv. Kennismakingsgesprek met [naam]"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-xs italic mt-1">{errors.title.message}</p>
                    )}
                  </div>
                  
                  {/* Tijdstip */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                      Begintijd *
                    </label>
                    <input
                      id="time"
                      {...register('time', { required: 'Begintijd is verplicht' })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="time"
                    />
                    {errors.time && (
                      <p className="text-red-500 text-xs italic mt-1">{errors.time.message}</p>
                    )}
                  </div>
                  
                  {/* Eindtijd */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
                      Eindtijd *
                    </label>
                    <input
                      id="endTime"
                      {...register('endTime', { required: 'Eindtijd is verplicht' })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="time"
                    />
                    {errors.endTime && (
                      <p className="text-red-500 text-xs italic mt-1">{errors.endTime.message}</p>
                    )}
                  </div>
                  
                  {/* Type afspraak */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meetingType">
                      Type afspraak *
                    </label>
                    <select
                      id="meetingType"
                      {...register('meetingType', { required: true })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="kennismaking">Kennismakingsgesprek</option>
                      <option value="sollicitatiegesprek">Sollicitatiegesprek</option>
                    </select>
                  </div>
                  
                  {/* Locatie type */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Locatie type *
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          {...register('locationType')} 
                          value="online" 
                          className="form-radio"
                        />
                        <span className="ml-2">Online meeting</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          {...register('locationType')} 
                          value="locatie" 
                          className="form-radio"
                        />
                        <span className="ml-2">Op locatie</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Conditionele velden op basis van locatietype */}
                  {locationType === 'online' ? (
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meetingLink">
                        Meeting link
                      </label>
                      <input
                        id="meetingLink"
                        {...register('meetingLink')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Bijv. https://meet.google.com/..."
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                        Adres locatie *
                      </label>
                      <input
                        id="location"
                        {...register('location', { 
                          required: locationType === 'locatie' ? 'Adres is verplicht voor afspraken op locatie' : false 
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Bijv. Hoofdstraat 1, 1234 AB Amsterdam"
                      />
                      {errors.location && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.location.message}</p>
                      )}
                    </div>
                  )}
                  
                  {/* Beschrijving */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                      Beschrijving
                    </label>
                    <textarea
                      id="description"
                      {...register('description')}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows={4}
                      placeholder="Geef extra details over deze afspraak..."
                    ></textarea>
                  </div>
                  
                  {/* Submit knop */}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => navigate(`/candidate/${id}`)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Annuleren
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Bezig...' : 'Afspraak plannen'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ScheduleMeeting; 