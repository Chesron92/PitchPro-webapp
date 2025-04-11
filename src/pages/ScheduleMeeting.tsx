import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';

interface CandidateBasicData {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
}

interface MeetingFormInputs {
  date: Date;
  time: string;
  title: string;
  description: string;
  meetingType: 'sollicitatiegesprek' | 'kennismaking';
  locationType: 'online' | 'locatie';
  location?: string;
  // Voor online meetings
  meetingLink?: string;
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
  
  const { 
    register, 
    handleSubmit, 
    control, 
    watch, 
    formState: { errors }, 
    setValue
  } = useForm<MeetingFormInputs>({
    defaultValues: {
      date: new Date(),
      time: '10:00',
      title: '',
      description: '',
      meetingType: 'kennismaking',
      locationType: 'online',
    }
  });
  
  // Kijk of de locatie een lokale afspraak is of online
  const locationType = watch('locationType');
  
  // Haal kandidaat gegevens op
  useEffect(() => {
    const fetchCandidate = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const candidateDoc = await getDoc(doc(db, 'users', id));
        
        if (candidateDoc.exists()) {
          const candidateData = candidateDoc.data();
          setCandidate({
            id: candidateDoc.id,
            name: candidateData.displayName || candidateData.name || 'Onbekende kandidaat',
            email: candidateData.email,
            phoneNumber: candidateData.phoneNumber
          });
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
  }, [id]);
  
  // Afspraak toevoegen aan de database
  const onSubmit: SubmitHandler<MeetingFormInputs> = async (data) => {
    if (!id || !currentUser || !candidate) return;
    
    try {
      setLoading(true);
      
      // Combineer datum en tijd
      const dateTime = new Date(data.date);
      const [hours, minutes] = data.time.split(':').map(Number);
      dateTime.setHours(hours, minutes);
      
      // Voorbereid de meeting data
      const meetingData = {
        candidateId: id,
        candidateName: candidate.name,
        recruiterId: currentUser.uid,
        recruiterName: userProfile?.displayName || 'Onbekende recruiter',
        title: data.title,
        description: data.description,
        meetingType: data.meetingType,
        locationType: data.locationType,
        location: data.locationType === 'locatie' ? data.location : null,
        meetingLink: data.locationType === 'online' ? data.meetingLink : null,
        dateTime: Timestamp.fromDate(dateTime),
        status: 'gepland',
        createdAt: Timestamp.now()
      };
      
      // Voeg de meeting toe aan de database
      await addDoc(collection(db, 'meetings'), meetingData);
      
      // Succes!
      setSuccess(true);
      
      // Wacht 2 seconden en ga terug naar kandidaat profiel
      setTimeout(() => {
        navigate(`/candidate/${id}`);
      }, 2000);
      
    } catch (err) {
      console.error('Error creating meeting:', err);
      setError('Er is een fout opgetreden bij het plannen van de afspraak');
    } finally {
      setLoading(false);
    }
  };
  
  // Calendar UI helpers
  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const generateCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(year, month);
    
    const days = [];
    
    // Voeg lege dagen toe voor het begin van de maand
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 border border-gray-200"></div>);
    }
    
    // Voeg dagen toe
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      const isToday = today.getDate() === i && 
                      today.getMonth() === month && 
                      today.getFullYear() === year;
      const isSelected = selectedDate?.getDate() === i && 
                         selectedDate?.getMonth() === month && 
                         selectedDate?.getFullYear() === year;
      
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
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Bezig met laden...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Error state
  if (error || !candidate) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Fout bij het laden</h2>
            <p className="text-gray-600 mb-6">{error || 'Kandidaat niet gevonden'}</p>
            <button 
              onClick={() => navigate('/candidates')} 
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Terug naar kandidaten
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Blauwe header sectie, identiek aan de kandidaat pagina */}
      <div className="w-full bg-gradient-to-r from-primary-600 to-primary-800 text-white py-32 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">Afspraak plannen</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Plan een afspraak met <span className="font-bold">{candidate.name}</span>
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Kalender gedeelte */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Datum selecteren</h2>
              
              {/* Maand en jaar */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {new Date().toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}
                </h3>
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
                      Tijdstip *
                    </label>
                    <input
                      id="time"
                      {...register('time', { required: 'Tijdstip is verplicht' })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="time"
                    />
                    {errors.time && (
                      <p className="text-red-500 text-xs italic mt-1">{errors.time.message}</p>
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