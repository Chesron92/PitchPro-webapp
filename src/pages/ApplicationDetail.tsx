import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/common/Header';
import { JobApplication } from '../types/job';

const ApplicationDetail: React.FC = () => {
  // URL parameters
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  
  // Tab state
  const [activeTab, setActiveTab] = useState<'profiel' | 'sollicitatie' | 'cv'>('profiel');
  
  // State
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [applicantProfile, setApplicantProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [jobDetails, setJobDetails] = useState<any | null>(null);
  
  // Bepaal gebruikersrol
  const isRecruiter = userProfile?.role === 'recruiter';
  const isJobSeeker = userProfile?.role === 'werkzoekende';
  
  // Haal de sollicitatie op
  useEffect(() => {
    const fetchApplicationDetails = async () => {
      if (!applicationId) {
        setError('Geen sollicitatie ID gevonden');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Haal de sollicitatie op uit Firestore
        const applicationRef = doc(db, 'sollicitaties', applicationId);
        const applicationSnapshot = await getDoc(applicationRef);
        
        if (applicationSnapshot.exists()) {
          const data = applicationSnapshot.data() as Omit<JobApplication, 'id'>;
          
          // Controleer of de ingelogde gebruiker de recruiter of de sollicitant is
          if (data.recruiterId !== currentUser?.uid && data.userId !== currentUser?.uid) {
            setError('Je hebt geen toegang tot deze sollicitatie');
            setApplication(null);
            setLoading(false);
            return;
          }
          
          // Stel de sollicitatie data in
          setApplication({
            id: applicationSnapshot.id,
            ...data,
            applicationDate: data.applicationDate || Timestamp.now()
          } as JobApplication);
          
          // Haal het profiel op van de sollicitant als je de recruiter bent
          if (isRecruiter && data.userId) {
            const userRef = doc(db, 'users', data.userId);
            const userSnapshot = await getDoc(userRef);
            
            if (userSnapshot.exists()) {
              setApplicantProfile(userSnapshot.data());
            }
          }
          
          // Haal vacaturegegevens op
          if (data.jobId) {
            const jobRef = doc(db, 'jobs', data.jobId);
            const jobSnapshot = await getDoc(jobRef);
            
            if (jobSnapshot.exists()) {
              setJobDetails(jobSnapshot.data());
            }
          }
          
          setError(null);
        } else {
          setError('Sollicitatie niet gevonden');
          setApplication(null);
        }
      } catch (err) {
        console.error('Fout bij het ophalen van sollicitatiedetails:', err);
        setError('Er is een fout opgetreden bij het laden van de sollicitatie');
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplicationDetails();
  }, [applicationId, currentUser?.uid, isRecruiter]);
  
  // Status bijwerken
  const updateStatus = async (newStatus: JobApplication['status']) => {
    if (!application || !application.id) return;
    
    try {
      setUpdateLoading(true);
      
      // Update de status in Firestore
      const applicationRef = doc(db, 'sollicitaties', application.id);
      await updateDoc(applicationRef, { 
        status: newStatus,
        updatedAt: Timestamp.now()
      });
      
      // Update lokale state
      setApplication({
        ...application,
        status: newStatus,
        updatedAt: Timestamp.now()
      });
      
      setUpdateSuccess(true);
      
      // Reset de success state na 3 seconden
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      console.error('Fout bij het bijwerken van status:', err);
      setError('Er is een fout opgetreden bij het bijwerken van de status');
    } finally {
      setUpdateLoading(false);
    }
  };
  
  // Helper functie om datum te formatteren
  const formatDate = (timestamp: any): string => {
    if (!timestamp) return 'Onbekende datum';
    
    const date = timestamp instanceof Timestamp 
      ? timestamp.toDate() 
      : timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    
    return date.toLocaleDateString('nl-NL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Helper functie voor status tekst en kleur
  const getStatusInfo = (status: string): { text: string, bgColor: string, textColor: string } => {
    switch (status) {
      case 'pending':
        return { text: 'Nieuw', bgColor: 'bg-blue-100', textColor: 'text-blue-800' };
      case 'reviewing':
        return { text: 'In behandeling', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' };
      case 'interview':
        return { text: 'Gesprek ingepland', bgColor: 'bg-green-100', textColor: 'text-green-800' };
      case 'rejected':
        return { text: 'Afgewezen', bgColor: 'bg-red-100', textColor: 'text-red-800' };
      case 'accepted':
        return { text: 'Aangenomen', bgColor: 'bg-emerald-100', textColor: 'text-emerald-800' };
      default:
        return { text: 'Onbekend', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
    }
  };
  
  // Terug naar dashboard
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  // Plan een afspraak met de kandidaat
  const handlePlanMeeting = () => {
    if (application && application.userId) {
      navigate(`/schedule-meeting/${application.userId}`);
    }
  };
  
  // Start een chat met de kandidaat
  const handleStartChat = () => {
    if (application && application.userId) {
      navigate(`/messages/${application.userId}`);
    }
  };
  
  // Tab handler
  const handleTabChange = (tab: 'profiel' | 'sollicitatie' | 'cv') => {
    setActiveTab(tab);
  };
  
  // Render Profiel tab inhoud
  const renderProfileTab = () => {
    if (!application) return null;
    
    // Helper functie om de profielfoto URL te vinden in verschillende mogelijke locaties
    const getProfileImageUrl = (): string | null => {
      if (!applicantProfile) return null;
      
      // Controleer verschillende mogelijke veldnamen voor de profielfoto
      return applicantProfile.profileImage || 
             applicantProfile.profilePhoto || 
             applicantProfile.avatar ||
             (applicantProfile.profile && applicantProfile.profile.profileImage) ||
             (applicantProfile.profile && applicantProfile.profile.profilePhoto) || 
             (applicantProfile.profile && applicantProfile.profile.avatar) ||
             (applicantProfile.userData && applicantProfile.userData.profileImage) ||
             null;
    };
    
    // Haal de profielfoto URL op
    const profileImageUrl = getProfileImageUrl();
    
    // Alleen voor debug doeleinden
    console.log('Applicant profile data:', applicantProfile);
    console.log('Profile image URL found:', profileImageUrl);
    
    return (
      <div className="space-y-6">
        {/* Basis profiel informatie met profielfoto */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:space-x-6">
              {/* Profielfoto */}
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                  {profileImageUrl ? (
                    <img 
                      src={profileImageUrl} 
                      alt={`Profielfoto van ${application.applicantName}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log('Error loading profile image:', e);
                        e.currentTarget.src = 'https://via.placeholder.com/150?text=Geen+foto';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Basis informatie */}
              <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-4">Kandidaat gegevens</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Naam</p>
                    <p className="font-medium text-gray-800">{application.applicantName || 'Onbekend'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">E-mail</p>
                    <p className="font-medium text-gray-800">
                      <a href={`mailto:${application.email}`} className="text-primary-600 hover:underline">
                        {application.email || 'Niet opgegeven'}
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Telefoonnummer</p>
                    <p className="font-medium text-gray-800">
                      {application.phoneNumber ? (
                        <a href={`tel:${application.phoneNumber}`} className="text-primary-600 hover:underline">
                          {application.phoneNumber}
                        </a>
                      ) : 'Niet opgegeven'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Sollicitatie ontvangen op</p>
                    <p className="font-medium text-gray-800">{formatDate(application.applicationDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* LinkedIn en Portfolio links */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-3">Online profielen</h3>
            <div className="space-y-3">
              {application.linkedinUrl && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                  </svg>
                  <a href={application.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    LinkedIn profiel
                  </a>
                </div>
              )}
              
              {application.portfolioUrl && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path>
                  </svg>
                  <a href={application.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Portfolio website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Acties */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handlePlanMeeting}
            className="px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors flex-1 flex justify-center items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Plan een gesprek
          </button>
          
          <button 
            onClick={handleStartChat}
            className="px-6 py-3 bg-white text-primary-600 font-medium rounded-md border border-primary-600 hover:bg-primary-50 transition-colors flex-1 flex justify-center items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            Stuur een bericht
          </button>
        </div>
      </div>
    );
  };
  
  // Render Sollicitatie tab inhoud
  const renderApplicationTab = () => {
    if (!application) return null;
    
    return (
      <div className="space-y-6">
        {/* Status sectie */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <span className="inline-block text-xs font-medium text-gray-500 mb-2">Sollicitatie voor</span>
                <h1 className="text-2xl font-bold text-gray-800">
                  {application.jobTitle || 'Onbekende vacature'}
                </h1>
                <p className="text-gray-600 mt-1">{application.companyName || 'Onbekend bedrijf'}</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                {application.status && (
                  <span className={`${getStatusInfo(application.status).bgColor} ${getStatusInfo(application.status).textColor} px-3 py-2 rounded-md font-medium`}>
                    {getStatusInfo(application.status).text}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Status bijwerken */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-3">Status bijwerken</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateStatus('pending')}
                disabled={updateLoading || application.status === 'pending'}
                className={`px-4 py-2 rounded-md font-medium ${
                  application.status === 'pending' 
                    ? 'bg-blue-100 text-blue-800 cursor-default' 
                    : 'bg-white border border-blue-500 text-blue-700 hover:bg-blue-50'
                }`}
              >
                Nieuw
              </button>
              
              <button
                onClick={() => updateStatus('reviewing')}
                disabled={updateLoading || application.status === 'reviewing'}
                className={`px-4 py-2 rounded-md font-medium ${
                  application.status === 'reviewing' 
                    ? 'bg-yellow-100 text-yellow-800 cursor-default' 
                    : 'bg-white border border-yellow-500 text-yellow-700 hover:bg-yellow-50'
                }`}
              >
                In behandeling
              </button>
              
              <button
                onClick={() => updateStatus('interview')}
                disabled={updateLoading || application.status === 'interview'}
                className={`px-4 py-2 rounded-md font-medium ${
                  application.status === 'interview' 
                    ? 'bg-green-100 text-green-800 cursor-default' 
                    : 'bg-white border border-green-500 text-green-700 hover:bg-green-50'
                }`}
              >
                Gesprek ingepland
              </button>
              
              <button
                onClick={() => updateStatus('rejected')}
                disabled={updateLoading || application.status === 'rejected'}
                className={`px-4 py-2 rounded-md font-medium ${
                  application.status === 'rejected' 
                    ? 'bg-red-100 text-red-800 cursor-default' 
                    : 'bg-white border border-red-500 text-red-700 hover:bg-red-50'
                }`}
              >
                Afwijzen
              </button>
              
              <button
                onClick={() => updateStatus('accepted')}
                disabled={updateLoading || application.status === 'accepted'}
                className={`px-4 py-2 rounded-md font-medium ${
                  application.status === 'accepted' 
                    ? 'bg-emerald-100 text-emerald-800 cursor-default' 
                    : 'bg-white border border-emerald-500 text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                Aannemen
              </button>
            </div>
          </div>
        </div>
          
        {/* Motivatiebrief sectie */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Motivatiebrief</h2>
            <div className="bg-gray-50 p-4 rounded-md text-gray-700 whitespace-pre-line">
              {application.motivationLetter || 'Geen motivatiebrief bijgevoegd'}
            </div>
          </div>
        </div>
          
        {/* Extra notities sectie */}
        {application.notes && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Extra informatie</h2>
              <div className="bg-gray-50 p-4 rounded-md text-gray-700 whitespace-pre-line">
                {application.notes}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Render CV tab inhoud
  const renderCVTab = () => {
    if (!application) return null;
    
    return (
      <div className="space-y-6">
        {/* CV Weergave */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">CV van {application.applicantName}</h2>
            
            {application.cvUrl ? (
              <div className="aspect-[3/4] bg-gray-50 rounded-md border border-gray-200 overflow-hidden">
                {/* CV iframe viewer */}
                <iframe
                  src={application.cvUrl}
                  className="w-full h-full"
                  title={`CV van ${application.applicantName}`}
                ></iframe>
              </div>
            ) : (
              <div className="aspect-[3/4] bg-gray-50 rounded-md border border-gray-200 flex items-center justify-center">
                <div className="text-center p-6">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <p className="text-gray-600">Geen CV bijgevoegd</p>
                </div>
              </div>
            )}
          </div>
          
          {application.cvUrl && (
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <a 
                href={application.cvUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 00-1.414-1.414L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
                Download CV
              </a>
            </div>
          )}
        </div>
        
        {/* Uitgebreide profiel informatie */}
        {applicantProfile && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Uitgebreid profiel</h2>
              
              {applicantProfile.profile && (
                <div className="space-y-6">
                  {/* Vaardigheden */}
                  {applicantProfile.profile.skills && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Vaardigheden</h3>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(applicantProfile.profile.skills) 
                          ? applicantProfile.profile.skills.map((skill: string, index: number) => (
                              <span key={index} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                                {skill}
                              </span>
                            ))
                          : <p className="text-gray-600">Geen vaardigheden opgegeven</p>
                        }
                      </div>
                    </div>
                  )}
                  
                  {/* Beschikbaarheid */}
                  {applicantProfile.profile.availability && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Beschikbaarheid</h3>
                      <p className="text-gray-700">{applicantProfile.profile.availability}</p>
                    </div>
                  )}
                  
                  {/* Werkervaring */}
                  {applicantProfile.profile.experience && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Werkervaring</h3>
                      {Array.isArray(applicantProfile.profile.experience) && applicantProfile.profile.experience.length > 0 ? (
                        <div className="space-y-4">
                          {applicantProfile.profile.experience.map((exp: any, index: number) => (
                            <div key={index} className="border-l-2 border-primary-200 pl-4">
                              <p className="font-medium">{exp.position} bij {exp.company}</p>
                              <p className="text-gray-600 text-sm">{exp.startDate} - {exp.endDate || 'Heden'}</p>
                              {exp.description && <p className="text-gray-700 mt-1">{exp.description}</p>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">Geen werkervaring opgegeven</p>
                      )}
                    </div>
                  )}
                  
                  {/* Opleiding */}
                  {applicantProfile.profile.education && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Opleiding</h3>
                      {Array.isArray(applicantProfile.profile.education) && applicantProfile.profile.education.length > 0 ? (
                        <div className="space-y-4">
                          {applicantProfile.profile.education.map((edu: any, index: number) => (
                            <div key={index} className="border-l-2 border-primary-200 pl-4">
                              <p className="font-medium">{edu.degree}</p>
                              <p className="text-gray-600">{edu.school}</p>
                              <p className="text-gray-600 text-sm">{edu.startDate} - {edu.endDate || 'Heden'}</p>
                              {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">Geen opleiding opgegeven</p>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {(!applicantProfile.profile || Object.keys(applicantProfile.profile).length === 0) && (
                <p className="text-gray-600">Geen uitgebreid profiel beschikbaar</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Render werkzoekende versie - vereenvoudigd statusoverzicht
  const renderJobSeekerView = () => {
    if (!application) return null;
    
    const statusInfo = getStatusInfo(application.status);
    
    // Helperfunctie om statusbeschrijving op te halen
    const getStatusDescription = (status: string): string => {
      switch (status) {
        case 'pending':
          return 'Je sollicitatie is ontvangen en wacht op beoordeling door de recruiter.';
        case 'reviewing':
          return 'De recruiter is momenteel je sollicitatie aan het beoordelen.';
        case 'interview':
          return 'Gefeliciteerd! De recruiter wil graag een gesprek met je plannen. Je kunt binnenkort een uitnodiging verwachten.';
        case 'rejected':
          return 'Helaas heeft de recruiter besloten niet verder te gaan met je sollicitatie. Kijk naar andere vacatures die mogelijk beter passen.';
        case 'accepted':
          return 'Gefeliciteerd! Je bent aangenomen voor deze positie. De recruiter zal contact met je opnemen voor de volgende stappen.';
        default:
          return 'De status van je sollicitatie is onbekend.';
      }
    };
    
    return (
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header met vacature informatie */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-4 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Sollicitatie: {application.jobTitle || 'Onbekende functie'}
          </h1>
          <p className="text-primary-100">
            {application.companyName || 'Onbekend bedrijf'}
          </p>
        </div>
        
        {/* Statusoverzicht */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500">Sollicitatie verzonden op</p>
              <p className="font-medium">{formatDate(application.applicationDate)}</p>
            </div>
            <div>
              <span className={`inline-flex items-center px-4 py-2 rounded-full font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                {statusInfo.text}
              </span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Status van je sollicitatie</h2>
            <div className="p-4 rounded-md bg-gray-50 border border-gray-200">
              <p>{getStatusDescription(application.status)}</p>
            </div>
          </div>
          
          {/* Voortgangsindicator */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Sollicitatieproces</h2>
            <div className="relative">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200"></div>
              <div className="relative flex justify-between">
                {['pending', 'reviewing', 'interview', 'accepted'].map((step, index) => {
                  const isCompleted = 
                    (application.status === 'pending' && index === 0) ||
                    (application.status === 'reviewing' && index <= 1) ||
                    (application.status === 'interview' && index <= 2) ||
                    (application.status === 'accepted' && index <= 3);
                  const isCurrent = 
                    (application.status === 'pending' && index === 0) ||
                    (application.status === 'reviewing' && index === 1) ||
                    (application.status === 'interview' && index === 2) ||
                    (application.status === 'accepted' && index === 3);
                  
                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${isCurrent ? 'ring-4 ring-primary-100 bg-primary-600 text-white' : isCompleted ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {index + 1}
                      </div>
                      <p className={`mt-2 text-sm ${isCurrent ? 'font-medium text-primary-600' : 'text-gray-500'}`}>
                        {index === 0 && 'Ontvangen'}
                        {index === 1 && 'In behandeling'}
                        {index === 2 && 'Gesprek'}
                        {index === 3 && 'Aangenomen'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Sollicitatiedetails */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Jouw sollicitatie</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-500">Motivatiebrief</h3>
                <div className="mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-line">
                  {application.motivationLetter || 'Geen motivatiebrief bijgevoegd'}
                </div>
              </div>
              
              {application.cvUrl && (
                <div>
                  <h3 className="text-sm text-gray-500">CV</h3>
                  <div className="mt-1">
                    <a
                      href={application.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <svg className="mr-2 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Bekijk je CV
                    </a>
                  </div>
                </div>
              )}
              
              {application.notes && (
                <div>
                  <h3 className="text-sm text-gray-500">Extra informatie</h3>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-line">
                    {application.notes}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Contact en acties */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Contact met recruiter</h2>
            <button 
              onClick={handleStartChat}
              className="w-full px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors flex justify-center items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              Stuur een bericht aan de recruiter
            </button>
          </div>
        </div>
        
        {/* Footer met terug knop */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <button 
            onClick={handleBackToDashboard}
            className="flex items-center text-primary-600 hover:text-primary-800"
          >
            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Terug naar dashboard
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 mt-12">
        <div className="max-w-5xl mx-auto">
          {/* Terug knop */}
          <button 
            onClick={handleBackToDashboard}
            className="mb-6 flex items-center text-primary-600 hover:text-primary-800"
          >
            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Terug naar dashboard
          </button>
          
          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              <span className="ml-3">Sollicitatie details laden...</span>
            </div>
          )}
          
          {/* Error state */}
          {error && (
            <div className="bg-red-50 text-red-700 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-2">Er is een probleem opgetreden</h3>
              <p>{error}</p>
            </div>
          )}
          
          {/* Success message */}
          {updateSuccess && (
            <div className="bg-green-50 text-green-700 p-6 rounded-lg mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <p>Status bijgewerkt</p>
            </div>
          )}
          
          {/* Application Details met conditonele rendering op basis van rol */}
          {!loading && !error && application && (
            <>
              {isJobSeeker ? (
                // Werkzoekende view
                renderJobSeekerView()
              ) : (
                // Recruiter view - de bestaande complexe weergave met tabs
                <div>
                  {/* Header met applicatie naam en badge */}
                  <div className="bg-white shadow-md rounded-t-lg p-6 mb-0 border border-gray-200 border-b-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                          {application.applicantName || 'Onbekende kandidaat'}
                        </h1>
                        <p className="text-gray-600">
                          Sollicitatie voor {application.jobTitle || 'Onbekende functie'} bij {application.companyName || 'Onbekend bedrijf'}
                        </p>
                      </div>
                      
                      <div className="mt-4 md:mt-0">
                        {application.status && (
                          <span className={`${getStatusInfo(application.status).bgColor} ${getStatusInfo(application.status).textColor} px-3 py-2 rounded-md font-medium`}>
                            {getStatusInfo(application.status).text}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Tabs */}
                  <div className="bg-white border-x border-t border-gray-200">
                    <nav className="flex border-b border-gray-200">
                      <button
                        onClick={() => handleTabChange('profiel')}
                        className={`px-6 py-4 text-center w-1/3 font-medium text-sm focus:outline-none ${
                          activeTab === 'profiel'
                            ? 'border-b-2 border-primary-500 text-primary-600'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        Profiel
                      </button>
                      <button
                        onClick={() => handleTabChange('sollicitatie')}
                        className={`px-6 py-4 text-center w-1/3 font-medium text-sm focus:outline-none ${
                          activeTab === 'sollicitatie'
                            ? 'border-b-2 border-primary-500 text-primary-600'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        Sollicitatie
                      </button>
                      <button
                        onClick={() => handleTabChange('cv')}
                        className={`px-6 py-4 text-center w-1/3 font-medium text-sm focus:outline-none ${
                          activeTab === 'cv'
                            ? 'border-b-2 border-primary-500 text-primary-600'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        CV
                      </button>
                    </nav>
                  </div>
                  
                  {/* Tab inhoud */}
                  <div className="p-6 bg-gray-50 border-x border-b border-gray-200 rounded-b-lg">
                    {activeTab === 'profiel' && renderProfileTab()}
                    {activeTab === 'sollicitatie' && renderApplicationTab()}
                    {activeTab === 'cv' && renderCVTab()}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail; 