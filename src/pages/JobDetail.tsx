import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { useMessages } from '../contexts/MessageContext';
import Header from '../components/common/Header';

// Interface voor vacature
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  isFullTime?: boolean;
  isRemote?: boolean;
  status?: string;
  requirements?: string;
  createdAt?: any;
  updatedAt?: any;
  userId?: string;
  recruiterId?: string;
}

const JobDetail: React.FC = () => {
  // URL parameters (jobId)
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  const { createNewChat } = useMessages();
  
  // State
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  
  // Controleer of de gebruiker een werkzoekende is
  const isJobSeeker = userProfile?.role === 'werkzoekende';
  const isRecruiter = userProfile?.role === 'recruiter';
  
  // Controleer of de ingelogde recruiter de eigenaar van de vacature is
  const isOwner = currentUser && job?.recruiterId === currentUser.uid;
  
  useEffect(() => {
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
  }, [jobId]);
  
  // Handlers
  const handleApply = () => {
    if (!currentUser) {
      // Als gebruiker niet is ingelogd, redirect naar login pagina
      navigate('/login', { state: { from: `/job/${jobId}` } });
      return;
    }
    
    // Navigeer naar de sollicitatie pagina
    navigate(`/job-application/${jobId}`);
  };
  
  const handleChat = async () => {
    if (!currentUser) {
      // Als gebruiker niet is ingelogd, redirect naar login pagina
      navigate('/login', { state: { from: `/job/${jobId}` } });
      return;
    }
    
    if (!job?.recruiterId) {
      alert('Er is geen recruiter gekoppeld aan deze vacature');
      return;
    }
    
    try {
      setChatLoading(true);
      
      // Controleer of de gebruiker dezelfde persoon is als de recruiter
      if (currentUser.uid === job.recruiterId) {
        alert('Je kunt geen chat starten met jezelf');
        setChatLoading(false);
        return;
      }
      
      // Maak een nieuwe chat aan of gebruik een bestaande chat
      // createNewChat checkt al automatisch of er een bestaande chat is
      const chatId = await createNewChat(job.recruiterId);
      
      // Navigeer naar de berichtenpagina
      navigate(`/messages/${chatId}`);
    } catch (err) {
      console.error('Fout bij het starten van de chat:', err);
      alert('Er is een fout opgetreden bij het starten van de chat. Probeer het later opnieuw.');
      setChatLoading(false);
    }
  };
  
  // Terug naar vacatures pagina
  const handleBackToJobs = () => {
    navigate('/jobs');
  };

  // Handler voor het bewerken van de vacature
  const handleEditJob = () => {
    navigate(`/edit-job/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12 mt-12">
        <div className="max-w-4xl mx-auto">
          {/* Terug knop */}
          <button 
            onClick={handleBackToJobs}
            className="mb-6 flex items-center text-primary-600 hover:text-primary-800"
          >
            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Terug naar alle vacatures
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
          
          {/* Vacature details */}
          {!loading && !error && job && (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              {/* Header sectie */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{job.title}</h1>
                  <span className="mt-2 md:mt-0 px-4 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                    {job.isFullTime ? "Fulltime" : "Parttime"}
                    {job.isRemote && ", Remote mogelijk"}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2h-.5a.5.5 0 01-.5-.5v-2a.5.5 0 01.5-.5H6v-1h8v1h1.5a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H15z" clipRule="evenodd" />
                    </svg>
                    {job.company}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {job.location}
                  </div>
                  {job.salary && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      €{job.salary}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content sectie */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Functieomschrijving</h2>
                <div className="mb-6 text-gray-700 whitespace-pre-line">
                  {job.description}
                </div>
                
                {job.requirements && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Functie-eisen</h2>
                    <div className="text-gray-700 whitespace-pre-line">
                      {job.requirements}
                    </div>
                  </div>
                )}
                
                {/* Actie knoppen - Alleen zichtbaar voor werkzoekenden */}
                {isJobSeeker && (
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={handleApply}
                      className="px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors flex-1"
                    >
                      Solliciteer direct
                    </button>
                    <button 
                      onClick={handleChat}
                      disabled={chatLoading}
                      className="px-6 py-3 bg-white text-primary-600 font-medium rounded-md border border-primary-600 hover:bg-primary-50 transition-colors flex-1 flex justify-center items-center"
                    >
                      {chatLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-600 mr-2"></div>
                          <span>Bezig...</span>
                        </>
                      ) : (
                        "Chat met recruiter"
                      )}
                    </button>
                  </div>
                )}
                
                {/* Bewerk knop - Alleen zichtbaar voor de eigenaar van de vacature */}
                {isRecruiter && isOwner && (
                  <div className="mt-8 flex justify-end">
                    <button 
                      onClick={handleEditJob}
                      className="px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
                    >
                      Vacature bewerken
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail; 