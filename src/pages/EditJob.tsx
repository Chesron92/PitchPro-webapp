import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
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
  status: string;
}

const EditJob: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unauthorized, setUnauthorized] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<JobFormData>();

  // Laad bestaande vacature data
  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId || !currentUser) {
        setError('Ongeldige vacature ID of gebruiker niet ingelogd');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const jobRef = doc(db, 'jobs', jobId);
        const jobSnapshot = await getDoc(jobRef);
        
        if (!jobSnapshot.exists()) {
          setError('Vacature niet gevonden');
          setIsLoading(false);
          return;
        }
        
        const jobData = jobSnapshot.data();
        
        // Controleer of deze vacature van de ingelogde recruiter is
        if (jobData.recruiterId !== currentUser.uid) {
          setUnauthorized(true);
          setIsLoading(false);
          return;
        }
        
        // Stel formulier in met bestaande data
        reset({
          title: jobData.title || '',
          company: jobData.company || '',
          location: jobData.location || '',
          description: jobData.description || '',
          requirements: jobData.requirements || '',
          salary: jobData.salary || '',
          isFullTime: jobData.isFullTime || false,
          isRemote: jobData.isRemote || false,
          status: jobData.status || 'active'
        });
        
        setIsLoading(false);
      } catch (err) {
        console.error('Fout bij ophalen vacature:', err);
        setError('Er is een fout opgetreden bij het laden van de vacature');
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId, currentUser, reset]);

  const onSubmit = async (data: JobFormData) => {
    if (!currentUser || !jobId) {
      setError('Je moet ingelogd zijn en een geldige vacature ID hebben');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const jobRef = doc(db, 'jobs', jobId);
      
      const updatedJob = {
        ...data,
        updatedAt: serverTimestamp()
      };

      await updateDoc(jobRef, updatedJob);
      
      // Navigeer terug naar de detail pagina
      navigate(`/job/${jobId}`);
    } catch (err) {
      console.error('Fout bij bijwerken vacature:', err);
      setError('Er is een fout opgetreden bij het bijwerken van de vacature. Probeer het later opnieuw.');
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/job/${jobId}`);
  };

  const handleDelete = async () => {
    if (!confirm("Weet je zeker dat je deze vacature wilt verwijderen? Dit kan niet ongedaan worden gemaakt.")) {
      return;
    }
    
    if (!currentUser || !jobId) {
      setError('Je moet ingelogd zijn en een geldige vacature ID hebben');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const jobRef = doc(db, 'jobs', jobId);
      
      // We markeren de vacature als verwijderd in plaats van echt te verwijderen
      await updateDoc(jobRef, {
        status: 'deleted',
        updatedAt: serverTimestamp()
      });
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Fout bij verwijderen vacature:', err);
      setError('Er is een fout opgetreden bij het verwijderen van de vacature');
      setIsSubmitting(false);
    }
  };

  if (unauthorized) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>Je hebt geen toestemming om deze vacature te bewerken.</p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Terug naar dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Vacature bewerken</h1>
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
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-gray-600">Vacature laden...</span>
          </div>
        ) : (
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
              
              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  {...register("status", { required: "Status is verplicht" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="active">Actief</option>
                  <option value="paused">Gepauzeerd</option>
                  <option value="closed">Gesloten</option>
                </select>
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
              
              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Vacature verwijderen
                </button>
                
                <div className="flex space-x-4">
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
                      'Wijzigingen opslaan'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditJob; 