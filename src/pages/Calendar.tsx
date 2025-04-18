import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { isRecruiter } from '../types/user';
import { Navigate } from 'react-router-dom';

interface Meeting {
  id: string;
  title: string;
  candidateName: string;
  dateTime: Timestamp;
  endDateTime: Timestamp;
  description?: string;
  locationType: 'online' | 'locatie';
  location?: string;
  meetingLink?: string;
  status: string;
  candidateEmail?: string;
}

const Calendar: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [selectedDayMeetings, setSelectedDayMeetings] = useState<Meeting[]>([]);

  // Controleer of de gebruiker een recruiter is
  const isUserRecruiter = isRecruiter(userProfile);

  // Direct redirect naar dashboard als de gebruiker geen recruiter is
  if (!isUserRecruiter) {
    return <Navigate to="/dashboard" />;
  }

  // Haal alle meetings op voor deze gebruiker
  useEffect(() => {
    const fetchMeetings = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const meetingsRef = collection(db, 'meetings');
        
        // Alle meetings van de ingelogde gebruiker ophalen
        const q = query(
          meetingsRef,
          where('recruiterId', '==', currentUser.uid),
          orderBy('dateTime', 'asc')
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
            description: data.description,
            locationType: data.locationType,
            location: data.location,
            meetingLink: data.meetingLink,
            status: data.status || 'gepland',
            candidateEmail: data.candidateEmail
          });
        });
        
        setMeetings(fetchedMeetings);
      } catch (err) {
        console.error('Fout bij ophalen van meetings:', err);
        setError('Er is een fout opgetreden bij het ophalen van je afspraken');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMeetings();
  }, [currentUser]);

  // Helpers voor de kalender
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

  // Check of er meetings zijn op een specifieke dag
  const getMeetingsForDay = (date: Date) => {
    return meetings.filter(meeting => {
      const meetingDate = meeting.dateTime.toDate();
      return (
        meetingDate.getDate() === date.getDate() &&
        meetingDate.getMonth() === date.getMonth() &&
        meetingDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Selecteer een dag en toon bijbehorende meetings
  const selectDay = (date: Date) => {
    setSelectedDate(date);
    const dayMeetings = getMeetingsForDay(date);
    setSelectedDayMeetings(dayMeetings);
  };
  
  // Genereer de kalender UI
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = daysInMonth(currentYear, currentMonth);
    
    const days = [];
    
    // Voeg lege dagen toe voor het begin van de maand (zondag = 0, zaterdag = 6)
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-100 bg-gray-50"></div>);
    }
    
    // Voeg dagen toe
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const today = new Date();
      const isToday = 
        today.getDate() === i &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;
      
      const isSelected = 
        selectedDate?.getDate() === i &&
        selectedDate?.getMonth() === currentMonth &&
        selectedDate?.getFullYear() === currentYear;
      
      // Controleer of er meetings zijn op deze dag
      const dayMeetings = getMeetingsForDay(date);
      const hasMeetings = dayMeetings.length > 0;
      
      days.push(
        <div 
          key={`day-${i}`}
          onClick={() => selectDay(date)}
          className={`h-24 p-1 border border-gray-200 overflow-hidden cursor-pointer transition-colors
            ${isToday ? 'bg-blue-50' : 'bg-white'}
            ${isSelected ? 'ring-2 ring-primary-500' : ''}
            ${hasMeetings ? 'hover:bg-primary-50' : 'hover:bg-gray-50'}
          `}
        >
          <div className="flex justify-between items-start">
            <span className={`inline-block rounded-full w-7 h-7 text-center leading-7 text-sm
              ${isToday ? 'bg-primary-500 text-white font-bold' : ''}
            `}>
              {i}
            </span>
            {hasMeetings && (
              <span className="rounded-full w-5 h-5 flex items-center justify-center bg-primary-500 text-white text-xs">
                {dayMeetings.length}
              </span>
            )}
          </div>
          
          {/* Toon maximaal 2 meetings in het kalender vak */}
          <div className="mt-1 overflow-hidden space-y-1">
            {dayMeetings.slice(0, 2).map((meeting, idx) => (
              <div 
                key={`meeting-preview-${meeting.id}-${idx}`}
                className="text-xs truncate px-1 py-0.5 rounded bg-primary-100 text-primary-800"
              >
                {meeting.title}
              </div>
            ))}
            {dayMeetings.length > 2 && (
              <div className="text-xs text-gray-500 pl-1">
                + {dayMeetings.length - 2} meer
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  // Formateer de meeting tijd
  const formatMeetingTime = (start: Timestamp, end: Timestamp): string => {
    const startDate = start.toDate();
    const endDate = end.toDate();
    
    return `${startDate.toLocaleTimeString('nl-NL', { 
      hour: '2-digit', minute: '2-digit', hour12: false 
    })} - ${endDate.toLocaleTimeString('nl-NL', { 
      hour: '2-digit', minute: '2-digit', hour12: false 
    })}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header verwijderd om dubbele headers te voorkomen, deze wordt al via Layout geladen */}
      
      {/* Pagina header */}
      <div className="w-full bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Agenda</h1>
            <p className="text-lg opacity-90">Bekijk en beheer al je geplande afspraken</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6">
              {/* Kalender header met maand en navigatie */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {new Date(currentYear, currentMonth).toLocaleDateString('nl-NL', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={goToPreviousMonth}
                    className="p-2 rounded hover:bg-gray-100"
                    aria-label="Vorige maand"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentMonth(new Date().getMonth());
                      setCurrentYear(new Date().getFullYear());
                    }}
                    className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                  >
                    Vandaag
                  </button>
                  <button 
                    onClick={goToNextMonth}
                    className="p-2 rounded hover:bg-gray-100"
                    aria-label="Volgende maand"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Loading state */}
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg">
                  <p>{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="mt-2 text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Probeer opnieuw
                  </button>
                </div>
              ) : (
                <>
                  {/* Weekdagen header */}
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'].map((day) => (
                      <div key={day} className="h-10 font-medium text-gray-500 text-sm flex items-center justify-center">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Kalender dagen */}
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendar()}
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Geselecteerde dag details */}
          {selectedDate && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  Afspraken op {selectedDate.toLocaleDateString('nl-NL', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h2>
                
                {selectedDayMeetings.length === 0 ? (
                  <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Geen afspraken gepland voor deze dag.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedDayMeetings.map((meeting) => (
                      <div 
                        key={meeting.id} 
                        className="border-l-4 border-primary-500 pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{meeting.title}</h3>
                            <p className="text-primary-700">
                              {formatMeetingTime(meeting.dateTime, meeting.endDateTime)}
                            </p>
                            <p className="text-gray-600 mt-1">Met: {meeting.candidateName}</p>
                            {meeting.candidateEmail && (
                              <p className="text-gray-500 text-sm">{meeting.candidateEmail}</p>
                            )}
                            
                            {meeting.description && (
                              <p className="mt-2 text-gray-700">{meeting.description}</p>
                            )}
                            
                            <div className="mt-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                meeting.locationType === 'online' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {meeting.locationType === 'online' ? 'Online meeting' : 'Op locatie'}
                              </span>
                              
                              {meeting.locationType === 'online' && meeting.meetingLink && (
                                <a 
                                  href={meeting.meetingLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="ml-2 text-primary-600 hover:text-primary-800 text-sm"
                                >
                                  Meeting link
                                </a>
                              )}
                              
                              {meeting.locationType === 'locatie' && meeting.location && (
                                <span className="ml-2 text-gray-600 text-sm">
                                  {meeting.location}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => window.open(`mailto:${meeting.candidateEmail}`, '_blank')}
                              disabled={!meeting.candidateEmail}
                              className={`p-2 rounded hover:bg-gray-200 ${!meeting.candidateEmail ? 'opacity-50 cursor-not-allowed' : ''}`}
                              title={meeting.candidateEmail ? "E-mail versturen" : "Geen e-mailadres beschikbaar"}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Link om een nieuwe afspraak toe te voegen, alleen tonen voor recruiters */}
          {isUserRecruiter && (
            <div className="flex justify-end">
              <a 
                href="/schedule-meeting" 
                className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Nieuwe afspraak plannen
              </a>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Calendar; 