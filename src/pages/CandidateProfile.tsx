import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import Footer from '../components/common/Footer';

// Opleidingsgegevens interface
interface Education {
  id: string;
  opleiding: string;
  instituut: string;
  beschrijving: string;
  startDatum: any; // Firebase timestamp
  eindDatum: any; // Firebase timestamp
  isHuidigeOpleiding: boolean;
}

// Certificaat interface
interface Certificate {
  id: string;
  naam?: string;
  uitgever?: string;
  datum?: any; // Firebase timestamp
  beschrijving?: string;
}

// Stage interface
interface Internship {
  id: string;
  bedrijf: string;
  functie: string;
  beschrijving: string;
  startDatum: any; // Firebase timestamp
  eindDatum: any; // Firebase timestamp
  isHuidigeStage: boolean;
}

// Werkervaring interface
interface WorkExperience {
  id: string;
  bedrijf: string;
  functie: string;
  beschrijving: string;
  startDatum: any; // Firebase timestamp
  eindDatum: any; // Firebase timestamp of null
  isHuidigeFunctie: boolean;
}

// CV gegevens interface
interface CV {
  certificaten?: Certificate[];
  opleiding?: Education[];
  overMij?: string;
  stages?: Internship[];
  werkervaring?: WorkExperience[];
}

interface CandidateData {
  id: string;
  name: string;
  displayName?: string;
  role?: string;
  jobTitle?: string;
  professionalDetails?: {
    jobTitle?: string;
    yearsOfExperience?: number;
    skills?: string[];
    bio?: string;
  };
  profile?: {
    jobTitle?: string;
    experience?: string;
    skills?: string[];
    bio?: string;
    cv?: string;
    profilePhoto?: string;
    isAvailableForWork?: boolean;
    pitchVideo?: string; // URL naar de persoonlijke video pitch
  };
  experience?: string;
  skills?: string[];
  location?: string;
  city?: string;
  bio?: string;
  about?: string;
  available: boolean;
  email?: string;
  phoneNumber?: string;
  profileImage?: string;
  // Toegevoegde velden voor profielfoto's
  profilePhoto?: string;
  profileImageURL?: string;
  photoURL?: string;
  // Ook beschikbaar op het root niveau
  isAvailableForWork?: boolean;
  // Video pitch
  pitchVideo?: string; // URL naar de persoonlijke video pitch
  // CV gegevens
  cv?: CV;
}

const CandidateProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<CandidateData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // CV tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'cv'>('overview');
  const [imageError, setImageError] = useState<boolean>(false);
  const profileImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fetchCandidateData = async () => {
      if (!id) {
        setError("Geen kandidaat ID gevonden");
        setLoading(false);
        return;
      }

      try {
        // Haal het gebruikersdocument op
        const candidateRef = doc(db, 'users', id);
        const candidateSnapshot = await getDoc(candidateRef);
        
        if (candidateSnapshot.exists()) {
          const userData = candidateSnapshot.data() as Omit<CandidateData, 'id'>;
          
          console.log("Gebruikersgegevens geladen:", userData);
          // Log alle mogelijke profielfoto velden voor debugging
          console.log("Profile photo fields:", {
            photoURL: userData.photoURL,
            profilePhoto: userData.profilePhoto,
            profileImageURL: userData.profileImageURL, 
            profileImage: userData.profileImage,
            'profile.profilePhoto': userData.profile?.profilePhoto
          });
          
          // Debug log voor beschikbaarheid
          console.log("Beschikbaarheid velden:", {
            'isAvailableForWork (root)': userData.isAvailableForWork,
            'profile.isAvailableForWork': userData.profile?.isAvailableForWork,
            'available na toewijzing': userData.isAvailableForWork === true || userData.profile?.isAvailableForWork === true
          });
          
          // Probeer eerst de cv subcollectie te bekijken
          const cvCollectionRef = collection(db, 'users', id, 'cv');
          const cvQuerySnapshot = await getDocs(cvCollectionRef);
          
          console.log("CV collectie bestaat. Aantal documenten:", cvQuerySnapshot.size);
          console.log("CV documenten IDs:", cvQuerySnapshot.docs.map(doc => doc.id));
          
          // Als er documenten zijn, gebruik het eerste document (of 'main' als het bestaat)
          let cvData;
          let cvDocId = 'main'; // Standaard document ID
          
          // Controleer of er cv documenten zijn
          if (!cvQuerySnapshot.empty) {
            // Zoek eerst naar 'main' document
            const mainDoc = cvQuerySnapshot.docs.find(doc => doc.id === 'main');
            
            if (mainDoc) {
              cvData = mainDoc.data();
              console.log("CV 'main' document gevonden:", cvData);
            } else {
              // Als geen 'main' document, gebruik het eerste document
              cvDocId = cvQuerySnapshot.docs[0].id;
              cvData = cvQuerySnapshot.docs[0].data();
              console.log(`Geen 'main' document gevonden, gebruikte eerste document met ID ${cvDocId}:`, cvData);
            }
          } else {
            console.log("Geen CV documenten gevonden in de subcollectie");
          }
          
          // Combineer gebruiker en CV-gegevens
          setCandidate({
            id: candidateSnapshot.id,
            ...userData,
            name: userData.displayName || userData.name || 'Onbekende naam',
            // Normaliseer het profileImage veld om alle mogelijke foto velden te gebruiken
            profileImage: userData.profilePhoto || userData.profileImageURL || 
                        userData.photoURL || userData.profile?.profilePhoto,
            // Zorg ervoor dat beschikbaarheid consistent is met Candidates.tsx
            // Controleer beide niveaus van beschikbaarheid
            available: userData.isAvailableForWork === true || userData.profile?.isAvailableForWork === true,
            // Voeg CV-gegevens toe als deze bestaan
            cv: cvData as CV || undefined
          });
          
          console.log("CV gegevens in candidate state:", cvData);
        } else {
          setError("Kandidaat niet gevonden");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching candidate:", err);
        setError("Er is een fout opgetreden bij het laden van de kandidaat");
        setLoading(false);
      }
    };

    fetchCandidateData();
  }, [id]);

  // Log profielfoto status
  useEffect(() => {
    if (candidate) {
      // Controleer alle mogelijke velden
      const photoField = candidate.profilePhoto || candidate.profileImageURL || 
                        candidate.photoURL || candidate.profile?.profilePhoto;
      if (photoField) {
        console.log("Profielfoto URL gevonden:", photoField);
        console.log("Veld dat wordt gebruikt:", 
          candidate.profilePhoto ? "profilePhoto" :
          candidate.profileImageURL ? "profileImageURL" :
          candidate.photoURL ? "photoURL" : 
          "profile.profilePhoto");
      } else {
        console.log("Geen profielfoto URL beschikbaar");
      }
    }
  }, [candidate]);

  // Valideer de afbeelding URL
  const isValidImageUrl = (url: string): boolean => {
    if (!url) return false;
    
    // Controle of de URL geldig is
    try {
      new URL(url); // Dit werpt een fout als de URL niet geldig is
    } catch (e) {
      console.error("Ongeldige URL format:", url);
      return false;
    }
    
    // Check of het een Firebase Storage URL is (die zijn bijna altijd geldig)
    if (url.includes('firebasestorage.googleapis.com')) {
      return true;
    }
    
    // Check op bekende afbeeldingsextensies
    if (url.match(/\.(jpeg|jpg|gif|png|webp|svg|bmp)$/i) !== null) {
      return true;
    }
    
    // Check voor data-URIs van afbeeldingen
    if (url.startsWith('data:image/')) {
      return true;
    }
    
    // Voor andere http URLs, controleer of ze op een afbeelding eindigen
    if (url.startsWith('http')) {
      // URLs zonder extensie markeren we als twijfelachtig, maar we proberen ze wel te laden
      console.warn("URL zonder duidelijke afbeeldingsextensie:", url);
      return true;
    }
    
    return false;
  };

  const handleImageError = () => {
    console.error("Profielfoto kon niet worden geladen:", candidate?.profileImage);
    setImageError(true);
  };

  const handleScheduleMeeting = () => {
    // Navigeer naar een formulier voor het inplannen van een afspraak
    navigate(`/schedule-meeting/${id}`);
  };

  const handleStartChat = () => {
    // Navigeer naar de chat pagina of open een chat modal
    navigate(`/chat/${id}`);
  };

  // Helper functie voor het formatteren van datum
  const formatDate = (timestamp: any): string => {
    if (!timestamp) return 'Heden';
    
    try {
      // Als het een Firebase timestamp is, converteer naar JavaScript Date
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('nl-NL', { 
        year: 'numeric', 
        month: 'long'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Onbekende datum';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-32 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Kandidaat niet gevonden</h2>
            <p className="text-gray-600 mb-6">{error || 'Deze kandidaat bestaat niet of is verwijderd.'}</p>
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

  // Helper functie om de juiste waarde uit de geneste objecten te halen
  const getDataField = (fieldName: string, defaultValue: string = ''): string => {
    const field = fieldName as keyof CandidateData;
    if (candidate[field] && typeof candidate[field] === 'string') {
      return candidate[field] as string;
    }
    
    if (candidate.professionalDetails && candidate.professionalDetails[fieldName as keyof typeof candidate.professionalDetails]) {
      return candidate.professionalDetails[fieldName as keyof typeof candidate.professionalDetails] as string;
    }
    
    if (candidate.profile && candidate.profile[fieldName as keyof typeof candidate.profile]) {
      return candidate.profile[fieldName as keyof typeof candidate.profile] as string;
    }
    
    return defaultValue;
  };

  // Haal de juiste gegevens op
  const role = getDataField('jobTitle', 'Functie onbekend');
  const bio = getDataField('bio', getDataField('about', ''));
  const skills = candidate.skills || candidate.professionalDetails?.skills || candidate.profile?.skills || [];
  const location = candidate.location || candidate.city || 'Locatie onbekend';

  // CV gerelateerde data
  const cvData = candidate.cv;
  console.log("CV data in render:", cvData);
  
  // Veilige toegang tot arrays met typecontrole
  const safeArray = <T,>(arr: any): T[] => {
    if (!arr) return [];
    if (!Array.isArray(arr)) return [];
    return arr as T[];
  };
  
  const aboutMe = cvData?.overMij || bio;
  const workExperience = safeArray<WorkExperience>(cvData?.werkervaring);
  const education = safeArray<Education>(cvData?.opleiding);
  const internships = safeArray<Internship>(cvData?.stages);
  const certificates = safeArray<Certificate>(cvData?.certificaten);
  
  console.log("CV sectie gegevens:");
  console.log("- aboutMe:", aboutMe);
  console.log("- workExperience:", workExperience, "length:", workExperience?.length);
  console.log("- education:", education, "length:", education?.length);
  console.log("- internships:", internships, "length:", internships?.length);
  console.log("- certificates:", certificates, "length:", certificates?.length);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-32">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/candidates')} 
            className="text-primary-600 hover:text-primary-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Terug naar kandidaten
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full text-primary-600 flex items-center justify-center text-4xl font-bold mb-4 md:mb-0 md:mr-6 overflow-hidden border-4 border-white shadow-lg relative">
                {/* Check alle mogelijke profielfoto velden */}
                {(candidate?.profileImage || candidate?.profilePhoto || candidate?.profileImageURL || 
                  candidate?.photoURL || candidate?.profile?.profilePhoto) && !imageError && isValidImageUrl(candidate?.profileImage || candidate?.profilePhoto || candidate?.profileImageURL || 
                  candidate?.photoURL || candidate?.profile?.profilePhoto || '') ? (
                  <>
                    <img 
                      ref={profileImageRef}
                      src={candidate.profileImage || candidate.profilePhoto || candidate.profileImageURL || 
                          candidate.photoURL || candidate.profile?.profilePhoto} 
                      alt={candidate.name} 
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                    <div 
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 opacity-0"
                      style={{ opacity: imageError ? 1 : 0 }}
                    >
                      {candidate?.name ? candidate.name.substring(0, 2).toUpperCase() : 'KP'}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                    {candidate?.name ? candidate.name.substring(0, 2).toUpperCase() : 'KP'}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{candidate.name}</h1>
                <p className="text-xl text-primary-100">{role}</p>
                <div className="flex items-center mt-3">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${candidate.available ? 'bg-green-400' : 'bg-red-400'}`}></span>
                  <span className="text-primary-50">
                    {candidate.available ? 'Beschikbaar voor nieuwe kansen' : 'Momenteel niet beschikbaar'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabbladen voor overzicht en CV */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overzicht
              </button>
              <button
                onClick={() => setActiveTab('cv')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'cv'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                CV
              </button>
            </nav>
          </div>
          
          {activeTab === 'overview' ? (
            // Overzicht tabblad
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Over mij</h2>
                    <p className="text-gray-700 whitespace-pre-line">
                      {aboutMe || 'Deze kandidaat heeft nog geen bio toegevoegd.'}
                    </p>
                  </section>
                  
                  {/* Video Pitch sectie */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Video Pitch</h2>
                    {candidate.pitchVideo || candidate.profile?.pitchVideo ? (
                      <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                        <video 
                          controls
                          className="w-full h-full"
                          poster="/images/video-thumbnail.jpg"
                        >
                          <source src={candidate.pitchVideo || candidate.profile?.pitchVideo} type="video/mp4" />
                          Uw browser ondersteunt geen video weergave.
                        </video>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Deze kandidaat heeft nog geen video pitch toegevoegd.</p>
                    )}
                  </section>
                  
                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Vaardigheden</h2>
                    {skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Geen vaardigheden opgegeven</p>
                    )}
                  </section>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Details</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm text-gray-500 mb-1">Locatie</h4>
                        <p className="text-gray-800">{location}</p>
                      </div>
                      
                      {candidate.email && (
                        <div>
                          <h4 className="text-sm text-gray-500 mb-1">E-mail</h4>
                          <p className="text-gray-800">{candidate.email}</p>
                        </div>
                      )}
                      
                      {candidate.phoneNumber && (
                        <div>
                          <h4 className="text-sm text-gray-500 mb-1">Telefoonnummer</h4>
                          <p className="text-gray-800">{candidate.phoneNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Lege div toegevoegd om layout consistent te houden */}
                  <div className="mt-6 space-y-4">
                    <button 
                      onClick={handleScheduleMeeting}
                      className="w-full flex items-center justify-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Afspraak maken
                    </button>
                    
                    <button 
                      onClick={handleStartChat}
                      className="w-full flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      Chatten
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // CV tabblad
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                {/* Over Mij sectie */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Over Mij</h2>
                  {aboutMe ? (
                    <div className="bg-white rounded-md shadow-sm p-6 border border-gray-100">
                      <p className="text-gray-700 whitespace-pre-line">{aboutMe}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Geen persoonlijke informatie toegevoegd</p>
                  )}
                </section>
                
                {/* Werkervaring sectie */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Werkervaring</h2>
                  
                  {workExperience.length > 0 ? (
                    <div className="space-y-8">
                      {workExperience.map((job) => (
                        <div key={job.id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary-100">
                          <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-primary-600 -ml-2"></div>
                          <h3 className="text-xl font-semibold text-gray-800">{job.functie}</h3>
                          <p className="text-primary-700 font-medium">{job.bedrijf}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(job.startDatum)} - {job.isHuidigeFunctie ? 'Heden' : formatDate(job.eindDatum)}
                          </p>
                          {job.beschrijving && (
                            <p className="mt-3 text-gray-700">{job.beschrijving}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Geen werkervaring toegevoegd</p>
                  )}
                </section>
                
                {/* Opleiding sectie */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Opleiding</h2>
                  
                  {education.length > 0 ? (
                    <div className="space-y-8">
                      {education.map((edu) => (
                        <div key={edu.id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary-100">
                          <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-primary-600 -ml-2"></div>
                          <h3 className="text-xl font-semibold text-gray-800">{edu.opleiding}</h3>
                          <p className="text-primary-700 font-medium">{edu.instituut}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(edu.startDatum)} - {edu.isHuidigeOpleiding ? 'Heden' : formatDate(edu.eindDatum)}
                          </p>
                          {edu.beschrijving && (
                            <p className="mt-3 text-gray-700">{edu.beschrijving}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Geen opleiding toegevoegd</p>
                  )}
                </section>
                
                {/* Stages sectie - alleen tonen als er stages zijn */}
                {internships.length > 0 && (
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Stages</h2>
                    
                    <div className="space-y-8">
                      {internships.map((stage) => (
                        <div key={stage.id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary-100">
                          <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-primary-600 -ml-2"></div>
                          <h3 className="text-xl font-semibold text-gray-800">{stage.functie}</h3>
                          <p className="text-primary-700 font-medium">{stage.bedrijf}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(stage.startDatum)} - {stage.isHuidigeStage ? 'Heden' : formatDate(stage.eindDatum)}
                          </p>
                          {stage.beschrijving && (
                            <p className="mt-3 text-gray-700">{stage.beschrijving}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                
                {/* Certificaten sectie - alleen tonen als er certificaten zijn */}
                {certificates.length > 0 && (
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Certificaten</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {certificates.map((cert) => (
                        <div key={cert.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                          <h3 className="text-lg font-semibold text-gray-800">{cert.naam || 'Certificaat'}</h3>
                          {cert.uitgever && (
                            <p className="text-primary-700">{cert.uitgever}</p>
                          )}
                          {cert.datum && (
                            <p className="text-sm text-gray-500 mt-1">{formatDate(cert.datum)}</p>
                          )}
                          {cert.beschrijving && (
                            <p className="mt-3 text-gray-700">{cert.beschrijving}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                
                {/* Vaardigheden sectie */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Vaardigheden</h2>
                  
                  {skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Geen vaardigheden opgegeven</p>
                  )}
                </section>
                
                {/* Contactgegevens sectie */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Contactgegevens</h2>
                  
                  <div className="bg-white rounded-md shadow-sm p-6 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Locatie</h3>
                        <p className="mt-1 text-gray-800">{location}</p>
                      </div>
                      
                      {candidate.email && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">E-mail</h3>
                          <p className="mt-1 text-gray-800">{candidate.email}</p>
                        </div>
                      )}
                      
                      {candidate.phoneNumber && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Telefoonnummer</h3>
                          <p className="mt-1 text-gray-800">{candidate.phoneNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
                
                {/* Actie knoppen onderaan CV */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button 
                    onClick={handleScheduleMeeting}
                    className="flex-1 flex items-center justify-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Afspraak maken
                  </button>
                  
                  <button 
                    onClick={handleStartChat}
                    className="flex-1 flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    Chatten met {candidate.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CandidateProfile; 