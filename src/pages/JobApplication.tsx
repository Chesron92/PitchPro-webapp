import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/common/Header';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Job, JobApplication } from '../types/job';

// Interface voor het formulier
interface IFormInput {
  motivationLetter: string;
  cv?: FileList;
  phoneNumber?: string;
  email: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  additionalNotes?: string;
}

const JobApplicationForm: React.FC = () => {
  // URL parameters (jobId)
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  
  // State
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  
  // React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      email: currentUser?.email || '',
      phoneNumber: userProfile?.phoneNumber || '',
      linkedinUrl: userProfile?.profile?.linkedin || '',
      portfolioUrl: userProfile?.profile?.portfolio || ''
    }
  });
  
  // Controleer of de gebruiker een werkzoekende is
  const isJobSeeker = userProfile?.role === 'werkzoekende';
  
  useEffect(() => {
    // Controleer of de gebruiker is ingelogd
    if (!currentUser) {
      navigate('/login', { state: { from: `/job-application/${jobId}` } });
      return;
    }
    
    // Controleer of de gebruiker een werkzoekende is
    if (userProfile && userProfile.role !== 'werkzoekende') {
      setError('Alleen werkzoekenden kunnen solliciteren');
      setLoading(false);
      return;
    }
    
    const fetchJobDetails = async () => {
      if (!jobId) {
        setError('Geen vacature ID gevonden');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // Haal de vacature op uit Firestore
        const jobRef = doc(db, 'jobs', jobId);
        const jobSnapshot = await getDoc(jobRef);
        
        if (jobSnapshot.exists()) {
          const data = jobSnapshot.data();
          setJob({
            id: jobSnapshot.id,
            title: data.title || 'Onbekende functie',
            company: data.company || 'Onbekend bedrijf',
            location: data.location || 'Locatie onbekend',
            description: data.description || 'Geen beschrijving beschikbaar',
            salary: data.salary,
            isFullTime: data.isFullTime,
            isRemote: data.isRemote,
            status: data.status,
            requirements: data.requirements,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            userId: data.userId,
            recruiterId: data.recruiterId
          });
          setError(null);
        } else {
          setError('Vacature niet gevonden');
          setJob(null);
        }
      } catch (err) {
        console.error('Fout bij het ophalen van vacaturedetails:', err);
        setError('Er is een fout opgetreden bij het laden van de vacature');
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobDetails();
  }, [jobId, currentUser, navigate, userProfile]);
  
  // Bestand upload functie
  const uploadCv = async (file: File): Promise<string> => {
    if (!currentUser) throw new Error('Niet ingelogd');
    
    const fileExtension = file.name.split('.').pop();
    const fileName = `cv_${currentUser.uid}_${Date.now()}.${fileExtension}`;
    const cvRef = ref(storage, `cv/${fileName}`);
    
    await uploadBytes(cvRef, file);
    return getDownloadURL(cvRef);
  };
  
  // Form submit handler
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!currentUser || !job || !job.recruiterId) {
      setError('Er ontbreken gegevens om de sollicitatie te kunnen versturen');
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      // Upload CV als die is bijgevoegd
      let cvUrl = userProfile?.profile?.cv || '';
      if (data.cv && data.cv.length > 0) {
        cvUrl = await uploadCv(data.cv[0]);
      }
      
      // Maak de sollicitatie aan
      const application: Omit<JobApplication, 'id'> = {
        jobId: job.id,
        userId: currentUser.uid,
        recruiterId: job.recruiterId,
        jobTitle: job.title,
        companyName: job.company,
        applicantName: userProfile?.displayName || currentUser.displayName || '',
        motivationLetter: data.motivationLetter,
        cvUrl,
        phoneNumber: data.phoneNumber || '',
        email: data.email,
        linkedinUrl: data.linkedinUrl || '',
        portfolioUrl: data.portfolioUrl || '',
        status: 'pending',
        applicationDate: serverTimestamp(),
        updatedAt: serverTimestamp(),
        notes: data.additionalNotes || ''
      };
      
      // Sla de sollicitatie op in Firestore
      const applicationsRef = collection(db, 'applications');
      await addDoc(applicationsRef, application);
      
      setSuccess(true);
      
      // Redirect na 3 seconden
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      console.error('Fout bij het versturen van de sollicitatie:', err);
      setError('Er is een fout opgetreden bij het versturen van je sollicitatie');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Bestandskeuze handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvFileName(e.target.files[0].name);
    } else {
      setCvFileName(null);
    }
  };
  
  // Terug naar vacature pagina
  const handleBackToJob = () => {
    navigate(`/job/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12 mt-12">
        <div className="max-w-4xl mx-auto">
          {/* Terug knop */}
          <button 
            onClick={handleBackToJob}
            className="mb-6 flex items-center text-primary-600 hover:text-primary-800"
          >
            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Terug naar vacature
          </button>
          
          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              <span className="ml-3">Vacature details laden...</span>
            </div>
          )}
          
          {/* Error state */}
          {error && (
            <div className="bg-red-50 text-red-700 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-2">Er is een probleem opgetreden</h3>
              <p>{error}</p>
            </div>
          )}
          
          {/* Succes state */}
          {success && (
            <div className="bg-green-50 text-green-700 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-2">Sollicitatie verstuurd!</h3>
              <p>Je sollicitatie is succesvol verstuurd. Je wordt nu doorgestuurd naar je dashboard.</p>
            </div>
          )}
          
          {/* Formulier */}
          {!loading && !error && job && !success && (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              {/* Header sectie */}
              <div className="bg-primary-50 p-6 border-b border-gray-200">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Solliciteren op: {job.title}
                </h1>
                <p className="text-gray-600">
                  {job.company} • {job.location}
                </p>
              </div>
              
              {/* Formulier */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                {/* Motivatiebrief */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="motivationLetter">
                    Motivatiebrief <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('motivationLetter', { required: 'Motivatiebrief is verplicht' })}
                    id="motivationLetter"
                    rows={8}
                    className={`w-full px-3 py-2 border ${errors.motivationLetter ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    placeholder="Vertel waarom je geïnteresseerd bent in deze functie en waarom je de ideale kandidaat bent..."
                  ></textarea>
                  {errors.motivationLetter && (
                    <p className="mt-1 text-sm text-red-500">{errors.motivationLetter.message}</p>
                  )}
                </div>
                
                {/* CV Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cv">
                    Upload je CV (PDF)
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      {...register('cv')}
                      id="cv"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="cv"
                      className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-800 rounded-md border border-gray-300 hover:bg-gray-200"
                    >
                      Kies bestand
                    </label>
                    <span className="ml-3 text-sm text-gray-500">
                      {cvFileName ? cvFileName : userProfile?.profile?.cv ? 'Bestaand CV wordt gebruikt' : 'Geen bestand gekozen'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {userProfile?.profile?.cv ? 'Je hebt al een CV geüpload in je profiel. Als je geen nieuw bestand kiest, gebruiken we je bestaande CV.' : 'Maximaal 5MB. Ondersteunde formaten: PDF, DOC, DOCX'}
                  </p>
                </div>
                
                {/* Contactgegevens */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 text-gray-800">Contactgegevens</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                        E-mailadres <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('email', { 
                          required: 'E-mailadres is verplicht',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Voer een geldig e-mailadres in"
                          }
                        })}
                        type="email"
                        id="email"
                        className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                        placeholder="jouw@email.nl"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    
                    {/* Telefoonnummer */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phoneNumber">
                        Telefoonnummer
                      </label>
                      <input
                        {...register('phoneNumber')}
                        type="tel"
                        id="phoneNumber"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="06 12345678"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Online profielen */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 text-gray-800">Online profielen</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* LinkedIn */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="linkedinUrl">
                        LinkedIn URL
                      </label>
                      <input
                        {...register('linkedinUrl')}
                        type="url"
                        id="linkedinUrl"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="https://linkedin.com/in/jouwnaam"
                      />
                    </div>
                    
                    {/* Portfolio */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="portfolioUrl">
                        Portfolio / Website
                      </label>
                      <input
                        {...register('portfolioUrl')}
                        type="url"
                        id="portfolioUrl"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="https://jouwportfolio.nl"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Extra notities */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="additionalNotes">
                    Extra informatie
                  </label>
                  <textarea
                    {...register('additionalNotes')}
                    id="additionalNotes"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Is er nog iets anders dat je wilt delen met de recruiter?"
                  ></textarea>
                </div>
                
                {/* Submit knop */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center disabled:bg-primary-400"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Versturen...
                      </>
                    ) : (
                      'Sollicitatie versturen'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm; 