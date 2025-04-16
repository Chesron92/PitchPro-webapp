import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import Header from '../components/common/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/common/Footer';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';

// Interface aangepast aan de daadwerkelijke structuur in Firebase
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
  recruiterId?: string; // Toegevoegd om te matchen met Firestore regels
}

const Jobs: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>("");
  const { userProfile, currentUser } = useAuth();
  const { addFavorite, removeFavorite, isFavorite, loading: favoritesLoading } = useFavorites();
  const user = userProfile || currentUser || {};

  const addDebugInfo = (info: string) => {
    console.log(info);
    setDebugInfo(prev => prev + "\n" + info);
  };

  // Dummy vacature data voor als er geen vacatures worden gevonden
  const dummyJobs: Job[] = [
    {
      id: 'dummy1',
      title: 'Frontend Developer',
      company: 'Test Bedrijf',
      location: 'Amsterdam',
      description: 'Een test vacature voor frontend developer met React en TypeScript ervaring.',
      salary: '3000-4000',
      isFullTime: true,
      isRemote: false,
      requirements: 'Ervaring met React, TypeScript en responsive design',
    },
    {
      id: 'dummy2',
      title: 'UX Designer',
      company: 'Creative Solutions',
      location: 'Rotterdam',
      description: 'Een test vacature voor een ervaren UX Designer.',
      salary: '2800-3800',
      isFullTime: true,
      isRemote: true,
      requirements: 'Ervaring met Figma, user testing en wireframing',
    }
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // LET OP: Wijziging naar 'jobs' collectie, maar dit vereist update van security rules
        const jobsRef = collection(db, 'jobs');
        
        addDebugInfo("Query uitgevoerd op collectie: jobs");
        
        // Query zonder filters - haal alle vacatures op
        const q = query(jobsRef);
        
        const querySnapshot = await getDocs(q);
        
        addDebugInfo(`Er zijn ${querySnapshot.size} vacatures gevonden in Firestore (jobs collectie)`);
        
        // Verwerk de resultaten
        const fetchedJobs: Job[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          addDebugInfo(`Vacature ID: ${doc.id}, Titel: ${data.title || 'Onbekend'}`);
          
          fetchedJobs.push({
            id: doc.id,
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
        });
        
        if (fetchedJobs.length > 0) {
          setJobs(fetchedJobs);
          addDebugInfo("Vacatures succesvol geladen uit jobs collectie");
        } else {
          // ALLEEN VOOR TESTING: Gebruik dummy data als er geen vacatures zijn
          addDebugInfo("Geen echte vacatures gevonden, toon dummy data voor testing");
          setJobs(dummyJobs);
        }
        
        setError(null);
      } catch (err) {
        console.error("Fout bij het ophalen van vacatures:", err);
        addDebugInfo(`Error: ${err instanceof Error ? err.message : String(err)}`);
        const errorMessage = err instanceof Error ? err.message : String(err);
        
        // Specifiek foutbericht als het een permissieprobleem is
        if (errorMessage.includes("permission-denied")) {
          addDebugInfo("BELANGRIJK: De Firebase security rules geven geen toegang tot de 'jobs' collectie.");
          addDebugInfo("Je moet de security rules aanpassen om de 'jobs' collectie te kunnen lezen.");
          setError("Geen toegangsrechten voor de vacature-database. Neem contact op met de beheerder.");
        } else {
          setError("Er is een fout opgetreden bij het laden van de vacatures. Probeer het later opnieuw.");
        }
        
        // ALLEEN VOOR TESTING: Gebruik dummy data bij een fout
        addDebugInfo("Fout bij ophalen, toon dummy data voor testing");
        setJobs(dummyJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // Update profile photo when user data changes
    const photoUrl = userProfile?.profile?.profilePhoto || userProfile?.profilePhoto || currentUser?.photoURL || '';
    console.log('User profile data updated, photo URL:', photoUrl);
    if (photoUrl && photoUrl !== profilePhotoUrl) {
      setProfilePhotoUrl(photoUrl);
    }
  }, [userProfile, currentUser]);

  const handleProfilePhotoUpload = async (file: File) => {
    try {
      setLoading(true);
      const storage = getStorage();
      
      // Controleer eerst of er een gebruikers-ID beschikbaar is
      const userId = userProfile?.id || currentUser?.uid;
      if (!userId) {
        throw new Error('Geen gebruikers-ID beschikbaar voor het uploaden van foto');
      }
      
      const storageRef = ref(storage, `profile-photos/${userId}/${Date.now()}_${file.name}`);
      
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Update zowel de lokale state als het formulier
      setProfilePhotoUrl(downloadURL);
      
      // Nu is userId gegarandeerd een string, dus geen TypeScript-fout meer
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        profilePhoto: downloadURL,
        'profile.profilePhoto': downloadURL // Sla ook op in het nested profile object
      });
      
      return downloadURL;
    } catch (err) {
      console.error('Fout bij uploaden profielfoto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Functie om naar detail pagina te navigeren
  const handleViewJobDetail = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  // Functie voor het toevoegen of verwijderen van een favoriet
  const handleToggleFavorite = async (e: React.MouseEvent, job: Job) => {
    e.stopPropagation(); // Voorkom dat de klik doorgaat naar de vacature detail pagina
    e.preventDefault(); // Extra preventie van doorklikken
    
    if (!currentUser) {
      // Als gebruiker niet is ingelogd, redirect naar login pagina
      navigate('/login', { state: { from: `/jobs` } });
      return;
    }

    try {
      // Toon lokaal direct feedback door de state aan te passen
      const isFav = isFavorite(job.id);
      
      if (isFav) {
        await removeFavorite(job.id);
        console.log(`Vacature ${job.id} verwijderd uit favorieten`);
      } else {
        await addFavorite(job.id, job);
        console.log(`Vacature ${job.id} toegevoegd aan favorieten`);
      }
    } catch (err) {
      console.error('Fout bij favoriet markeren:', err);
      // Toon foutmelding aan gebruiker indien nodig
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero sectie */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white pt-20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Vacatures
            </h1>
            <p className="text-xl mb-8 text-primary-100">
            Ontdek uitdagende vacatures die perfect aansluiten bij jouw unieke vaardigheden en ambities. Ons platform biedt kansen waarin jouw talenten volledig tot hun recht komen, met volop ruimte voor groei en ontwikkeling. Vind de baan die jouw professionele toekomst vormgeeft.
            </p>
          </div>
        </div>
      </div>

      {/* Vacature lijst */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Linker zijbalk met filters */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              {/* Zoekbalk */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Zoeken
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Zoek op trefwoord"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Locatie filter */}
              <div className="mb-6">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Locatie
                </label>
                <input
                  type="text"
                  id="location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Bijv. Amsterdam"
                />
              </div>
              
              {/* Locatie straal */}
              <div className="mb-6">
                <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">
                  Straal
                </label>
                <select
                  id="radius"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecteer afstand</option>
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="25">25 km</option>
                  <option value="50">50 km</option>
                  <option value="100">100 km</option>
                </select>
              </div>
              
              {/* Functie filter */}
              <div className="mb-6">
                <label htmlFor="function" className="block text-sm font-medium text-gray-700 mb-1">
                  Functie
                </label>
                <input
                  type="text"
                  id="function"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Bijv. Developer"
                />
              </div>
              
              {/* Salaris range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salaris range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Max"
                  />
                </div>
              </div>
              
              {/* Plaatsingsdatum */}
              <div className="mb-6">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Geplaatst sinds
                </label>
                <select
                  id="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Alle datums</option>
                  <option value="1">Laatste 24 uur</option>
                  <option value="7">Afgelopen week</option>
                  <option value="30">Afgelopen maand</option>
                  <option value="90">Afgelopen 3 maanden</option>
                </select>
              </div>
              
              {/* Ervaringsniveau */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ervaringsniveau
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="starter" type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                    <label htmlFor="starter" className="ml-2 text-sm text-gray-700">Starter</label>
                  </div>
                  <div className="flex items-center">
                    <input id="medior" type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                    <label htmlFor="medior" className="ml-2 text-sm text-gray-700">Medior</label>
                  </div>
                  <div className="flex items-center">
                    <input id="senior" type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                    <label htmlFor="senior" className="ml-2 text-sm text-gray-700">Senior</label>
                  </div>
                </div>
              </div>
              
              {/* Soort baan */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soort baan
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="fulltime" type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                    <label htmlFor="fulltime" className="ml-2 text-sm text-gray-700">Fulltime</label>
                  </div>
                  <div className="flex items-center">
                    <input id="parttime" type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                    <label htmlFor="parttime" className="ml-2 text-sm text-gray-700">Parttime</label>
                  </div>
                  <div className="flex items-center">
                    <input id="contract" type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                    <label htmlFor="contract" className="ml-2 text-sm text-gray-700">Contract</label>
                  </div>
                  <div className="flex items-center">
                    <input id="tijdelijk" type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                    <label htmlFor="tijdelijk" className="ml-2 text-sm text-gray-700">Tijdelijk</label>
                  </div>
                  <div className="flex items-center">
                    <input id="zzp" type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                    <label htmlFor="zzp" className="ml-2 text-sm text-gray-700">ZZP</label>
                  </div>
                </div>
              </div>
              
              {/* Op afstand */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Werklocatie
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="onsite" type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                    <label htmlFor="onsite" className="ml-2 text-sm text-gray-700">Op locatie</label>
                  </div>
                  <div className="flex items-center">
                    <input id="hybrid" type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                    <label htmlFor="hybrid" className="ml-2 text-sm text-gray-700">Hybride</label>
                  </div>
                  <div className="flex items-center">
                    <input id="remote" type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                    <label htmlFor="remote" className="ml-2 text-sm text-gray-700">Op afstand</label>
                  </div>
                </div>
              </div>
              
              {/* Filter knoppen */}
              <div className="flex flex-col space-y-2">
                <button className="w-full py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                  Filters toepassen
                </button>
                <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  Filters wissen
                </button>
              </div>
            </div>
          </div>
          
          {/* Rechter gedeelte met vacatures */}
          <div className="md:col-span-3">
            {/* Loading en error states */}
            {loading && (
              <div className="flex justify-center items-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                <span className="ml-3">Vacatures laden...</span>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                <p>{error}</p>
              </div>
            )}
            
            {/* Geen vacatures gevonden message */}
            {!loading && !error && jobs.length === 0 && (
              <div className="bg-gray-50 p-12 rounded-lg text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Geen vacatures gevonden</h3>
                <p className="text-gray-500">Er zijn momenteel geen vacatures beschikbaar. Kom later terug voor nieuwe mogelijkheden.</p>
              </div>
            )}
            
            {/* Vacature kaarten */}
            {!loading && !error && jobs.length > 0 && (
              <div className="space-y-6">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                          {job.title}
                          <button 
                            onClick={(e) => handleToggleFavorite(e, job)}
                            className={`ml-2 focus:outline-none transition-colors ${isFavorite(job.id) ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'}`}
                            aria-label={isFavorite(job.id) ? "Verwijder uit favorieten" : "Voeg toe aan favorieten"}
                            disabled={favoritesLoading}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        </h2>
                        <span className="mt-2 md:mt-0 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                          {job.isFullTime ? "Fulltime" : "Parttime"}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
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
                          {job.location} {job.isRemote && <span className="ml-1 text-primary-600">(Remote mogelijk)</span>}
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
                      
                      <p className="text-gray-700 mb-4">
                        {job.description}
                      </p>
                      
                      {job.requirements && (
                        <div className="mb-4">
                          <h3 className="text-md font-medium mb-2">Vereisten:</h3>
                          <p className="text-gray-700">{job.requirements}</p>
                        </div>
                      )}
                      
                      <div className="mt-4 flex justify-end">
                        <button 
                          onClick={() => handleViewJobDetail(job.id)}
                          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                        >
                          Bekijk vacature
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jobs; 
