import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/common/Header';
import { useForm } from 'react-hook-form';

interface JobFormData {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  salary: string;
  isFullTime: boolean;
  isRemote: boolean;
}

const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<JobFormData>({
    defaultValues: {
      title: '',
      company: userProfile?.profile?.company || userProfile?.companyName || '',
      location: '',
      description: '',
      requirements: '',
      salary: '',
      isFullTime: true,
      isRemote: false
    }
  });

  const onSubmit = async (data: JobFormData) => {
    if (!currentUser) {
      setError('Je moet ingelogd zijn om een vacature te plaatsen');
      return;
    }

    if (userProfile?.role !== 'recruiter') {
      console.error('Gebruiker is geen recruiter, kan geen vacature plaatsen', userProfile);
      setError('Alleen recruiters kunnen vacatures plaatsen');
      return;
    }

    console.log('Vacature aanmaken voor gebruiker:', {
      uid: currentUser.uid,
      email: currentUser.email,
      role: userProfile?.role
    });

    setIsSubmitting(true);
    setError(null);

    try {
      const jobsRef = collection(db, 'jobs');
      
      const now = new Date();
      const timeStamp = {
        seconds: Math.floor(now.getTime() / 1000),
        nanoseconds: now.getMilliseconds() * 1000000
      };

      const newJob = {
        ...data,
        recruiterId: currentUser.uid,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        createdAtFallback: timeStamp,
        updatedAt: serverTimestamp(),
        updatedAtFallback: timeStamp,
        status: 'active'
      };

      console.log('Nieuw vacature data om op te slaan:', newJob);

      console.log('Firebase connection status check vóór toevoegen vacature');

      const docRef = await addDoc(jobsRef, newJob);
      console.log('Vacature toegevoegd met ID:', docRef.id);
      
      navigate(`/job/${docRef.id}`);
    } catch (err) {
      console.error('Fout bij het toevoegen van vacature:', err);
      
      let errorMessage = 'Er is een fout opgetreden bij het plaatsen van de vacature. ';
      
      if (err instanceof Error) {
        console.error('Foutdetails:', err.message);
        
        if (err.message.includes('permission-denied')) {
          errorMessage += 'Je hebt geen toestemming om vacatures te plaatsen. Controleer of je bent ingelogd als recruiter.';
        } else if (err.message.includes('network')) {
          errorMessage += 'Er lijkt een netwerkprobleem te zijn. Controleer je internetverbinding en probeer het opnieuw.';
        } else {
          errorMessage += 'Probeer het later opnieuw.';
        }
      } else {
        errorMessage += 'Probeer het later opnieuw.';
      }
      
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Nieuwe vacature plaatsen</h1>
          <button 
            onClick={handleCancel}
            className="text-gray-600 hover:text-gray-800"
          >
            Annuleren
          </button>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{error}</p>
          </div>
        )}
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Functie titel */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Functietitel <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: "Functietitel is verplicht" })}
                className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                placeholder="bijv. Frontend Developer"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            
            {/* Bedrijfsnaam */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Bedrijfsnaam <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                {...register("company", { required: "Bedrijfsnaam is verplicht" })}
                className={`w-full px-3 py-2 border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                placeholder="bijv. Tech Solutions BV"
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
              )}
            </div>
            
            {/* Locatie */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Locatie <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                {...register("location", { required: "Locatie is verplicht" })}
                className={`w-full px-3 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                placeholder="bijv. Amsterdam"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>
            
            {/* Salarisindicatie */}
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                Salarisindicatie
              </label>
              <input
                type="text"
                id="salary"
                {...register("salary")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="bijv. €3000-€4000 per maand"
              />
            </div>
            
            {/* Type aanstelling */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFullTime"
                  {...register("isFullTime")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isFullTime" className="ml-2 block text-sm text-gray-700">
                  Fulltime
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isRemote"
                  {...register("isRemote")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isRemote" className="ml-2 block text-sm text-gray-700">
                  Mogelijkheid tot thuiswerken
                </label>
              </div>
            </div>
            
            {/* Functieomschrijving */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Functieomschrijving <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                {...register("description", { required: "Functieomschrijving is verplicht" })}
                rows={6}
                className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                placeholder="Beschrijf de functie, taken en verantwoordelijkheden..."
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
            
            {/* Functie-eisen */}
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                Functie-eisen
              </label>
              <textarea
                id="requirements"
                {...register("requirements")}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Beschrijf de kennis, vaardigheden en ervaring die nodig zijn voor deze functie..."
              ></textarea>
            </div>
            
            <div className="pt-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Annuleren
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
                    Bezig met opslaan...
                  </>
                ) : (
                  'Vacature plaatsen'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob; 