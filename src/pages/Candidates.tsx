import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Footer from '../components/common/Footer';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutProvider } from '../contexts/LayoutContext';

interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  skills: string[];
  location: string;
  available: boolean;
  profileImage?: string;
  isFavorite?: boolean;
}

const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();

  // Ophalen van favorieten uit Firebase
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!currentUser) return;
      
      try {
        // Log voor debugging
        console.log("Starten met ophalen van favorieten voor gebruiker:", currentUser.uid);
        
        // Query naar favorieten collectie voor de huidige gebruiker
        // Uitgebreide query die ook favorieten van de iOS-app ophaalt
        const favoritesQuery = query(
          collection(db, 'favorites'),
          where('userId', '==', currentUser.uid)
        );
        
        console.log("Favorieten query uitgevoerd");
        const querySnapshot = await getDocs(favoritesQuery);
        console.log("Aantal gevonden favorieten:", querySnapshot.size);
        
        const favoriteCandidateIds: string[] = [];
        
        querySnapshot.forEach((document) => {
          const data = document.data();
          console.log("Favoriet document data:", data);
          
          // Controleer verschillende veldnamen die mogelijk gebruikt worden
          // in verschillende apps (web, iOS)
          if (data.candidateId) {
            favoriteCandidateIds.push(data.candidateId);
            console.log("Kandidaat toegevoegd aan favorieten via candidateId:", data.candidateId);
          } else if (data.candidate_id) {
            favoriteCandidateIds.push(data.candidate_id);
            console.log("Kandidaat toegevoegd aan favorieten via candidate_id:", data.candidate_id);
          } else if (data.jobseekerId) {
            favoriteCandidateIds.push(data.jobseekerId);
            console.log("Kandidaat toegevoegd aan favorieten via jobseekerId:", data.jobseekerId);
          } else if (data.userId && data.userId !== currentUser.uid) {
            // Als er een ander userId veld is dan dat van de huidige gebruiker
            // dan is dat mogelijk het ID van de werkzoekende
            favoriteCandidateIds.push(data.userId);
            console.log("Kandidaat toegevoegd aan favorieten via tweede userId veld:", data.userId);
          }
        });
        
        // Voor het geval favorieten in een subcollectie van de user worden opgeslagen
        // Dit is een alternatieve manier die soms in iOS/mobiele apps wordt gebruikt
        try {
          const userFavoritesRef = collection(db, 'users', currentUser.uid, 'favorites');
          const userFavoritesSnapshot = await getDocs(userFavoritesRef);
          
          if (!userFavoritesSnapshot.empty) {
            console.log("Favorieten gevonden in gebruiker subcollectie:", userFavoritesSnapshot.size);
            
            userFavoritesSnapshot.forEach((doc) => {
              const data = doc.data();
              // In dit geval kan het ID van het document zelf het kandidaat-ID zijn
              // of het kan in een veld worden opgeslagen
              if (data.candidateId) {
                if (!favoriteCandidateIds.includes(data.candidateId)) {
                  favoriteCandidateIds.push(data.candidateId);
                  console.log("Kandidaat uit subcollectie toegevoegd via candidateId:", data.candidateId);
                }
              } else if (data.id) {
                if (!favoriteCandidateIds.includes(data.id)) {
                  favoriteCandidateIds.push(data.id);
                  console.log("Kandidaat uit subcollectie toegevoegd via id veld:", data.id);
                }
              } else if (!favoriteCandidateIds.includes(doc.id)) {
                // Als laatste optie, gebruik het document ID
                favoriteCandidateIds.push(doc.id);
                console.log("Kandidaat uit subcollectie toegevoegd via document ID:", doc.id);
              }
            });
          }
        } catch (err) {
          console.log("Geen favorieten subcollectie gevonden of toegang geweigerd:", err);
        }
        
        setFavorites(favoriteCandidateIds);
        console.log("Alle geladen favorieten:", favoriteCandidateIds);
      } catch (err) {
        console.error("Fout bij ophalen favorieten:", err);
      }
    };
    
    fetchFavorites();
  }, [currentUser]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Query naar gebruikers die een jobseeker profiel hebben
        const q = query(
          collection(db, 'users'), 
          where('userType', 'in', ['jobseeker', 'werkzoekende', 'Werkzoekende'])
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedCandidates: Candidate[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Candidate data:", data); // Log de data voor debugging
          
          // Debug log voor beschikbaarheid
          console.log(`Beschikbaarheid voor ${data.displayName || data.name || 'onbekend'}:`, {
            'isAvailableForWork (root)': data.isAvailableForWork,
            'profile.isAvailableForWork': data.profile?.isAvailableForWork,
            'isAvailable (root)': data.isAvailable,
            'isAvailable === true': data.isAvailable === true,
            'Wordt getoond (conditie)': data.profile?.isAvailableForWork === true || data.isAvailable === true
          });
          
          // Controleer hier of de gebruiker beschikbaar is voor werk
          // Alleen gebruikers toevoegen die beschikbaar zijn voor werk
          if (data.profile?.isAvailableForWork === true || data.isAvailable === true) {
            // Voeg alle jobseeker gebruikers toe, ook met onvolledig profiel
            fetchedCandidates.push({
              id: doc.id,
              name: data.displayName || data.name || 'Onbekende naam',
              role: data.professionalDetails?.jobTitle || 
                    data.profile?.jobTitle || 
                    data.jobTitle || 'Geen functie opgegeven',
              experience: data.professionalDetails?.yearsOfExperience 
                ? `${data.professionalDetails.yearsOfExperience} jaar` 
                : data.profile?.experience || data.experience || 'Ervaring onbekend',
              skills: data.professionalDetails?.skills || 
                      data.profile?.skills || 
                      data.skills || 
                      data.vaardigheden || [], // Ook vaardigheden uit hoofdniveau proberen
              location: data.location || data.city || 
                       (data.personalAddress ? `${data.personalAddress.city || ''}` : '') || 
                       'Locatie onbekend',
              available: data.profile?.isAvailableForWork === true || data.isAvailable === true,
              profileImage: data.profilePhoto || data.profileImageURL || data.photoURL || data.profile?.profilePhoto || undefined,
              isFavorite: favorites.includes(doc.id) // Controleer of kandidaat in favorieten zit
            });
            
            // Debug voor kandidaten met favoriet markering
            if (favorites.includes(doc.id)) {
              console.log(`Kandidaat ${data.displayName || data.name || 'onbekend'} (${doc.id}) is gemarkeerd als favoriet!`);
            }
          }
        });
        
        setCandidates(fetchedCandidates);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError("Er is een fout opgetreden bij het laden van de kandidaten.");
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [favorites]); // Kandidaten opnieuw ophalen als favorieten veranderen

  // Toggle favoriet status voor een kandidaat
  const toggleFavorite = async (candidateId: string, candidateName: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Voorkom navigatie naar kandidaatprofiel
    
    if (!currentUser) return;
    
    try {
      const isFavorite = favorites.includes(candidateId);
      console.log("Toggle favoriet status voor kandidaat:", candidateId, "Huidige status:", isFavorite);
      
      if (isFavorite) {
        // Verwijder uit favorieten
        // Uitgebreide query om alle mogelijke favorieten te vinden van de iOS- en webapp
        console.log("Verwijderen van favoriet. Zoeken in favorites collectie...");
        let favorietVerwijderd = false;
        
        // 1. Controleer standaard favorieten met candidateId
        const favoritesQuery = query(
          collection(db, 'favorites'),
          where('userId', '==', currentUser.uid),
          where('candidateId', '==', candidateId)
        );
        
        const querySnapshot = await getDocs(favoritesQuery);
        if (!querySnapshot.empty) {
          console.log(`Gevonden ${querySnapshot.size} favorieten met candidateId`);
          favorietVerwijderd = true;
          for (const document of querySnapshot.docs) {
            console.log("Verwijderen favoriet document:", document.id);
            await deleteDoc(doc(db, 'favorites', document.id));
          }
        }
        
        // 2. Controleer alternatieve favoriet velden (iOS app)
        const iosQuery = query(
          collection(db, 'favorites'),
          where('userId', '==', currentUser.uid)
        );
        
        const iosSnapshot = await getDocs(iosQuery);
        for (const document of iosSnapshot.docs) {
          const data = document.data();
          if (
            (data.candidate_id && data.candidate_id === candidateId) ||
            (data.jobseekerId && data.jobseekerId === candidateId) ||
            (data.userId && data.userId !== currentUser.uid && data.userId === candidateId)
          ) {
            console.log("Verwijderen iOS favoriet document:", document.id);
            await deleteDoc(doc(db, 'favorites', document.id));
            favorietVerwijderd = true;
          }
        }
        
        // 3. Controleer subcollectie favorieten
        try {
          const userFavoritesRef = collection(db, 'users', currentUser.uid, 'favorites');
          const userFavoritesSnapshot = await getDocs(userFavoritesRef);
          
          for (const document of userFavoritesSnapshot.docs) {
            const data = document.data();
            if (
              document.id === candidateId ||
              (data.candidateId && data.candidateId === candidateId) ||
              (data.id && data.id === candidateId)
            ) {
              console.log("Verwijderen subcollectie favoriet document:", document.id);
              await deleteDoc(doc(db, 'users', currentUser.uid, 'favorites', document.id));
              favorietVerwijderd = true;
            }
          }
        } catch (err) {
          console.log("Geen toegang tot favorieten subcollectie:", err);
        }
        
        if (favorietVerwijderd) {
          console.log("Favoriet succesvol verwijderd");
          // Update lokale state
          setFavorites(favorites.filter(id => id !== candidateId));
        } else {
          console.log("Geen favoriet document gevonden om te verwijderen");
        }
      } else {
        // Voeg toe aan favorieten
        const newFavoriteRef = doc(collection(db, 'favorites'));
        const favoriteData = {
          userId: currentUser.uid,
          candidateId: candidateId,
          candidateName: candidateName,
          createdAt: new Date()
        };
        
        console.log("Toevoegen nieuw favoriet document met data:", favoriteData);
        await setDoc(newFavoriteRef, favoriteData);
        
        // Update lokale state
        setFavorites([...favorites, candidateId]);
        console.log("Favoriet succesvol toegevoegd");
      }
      
      // Update onmiddellijk de status in de candidates array voor betere UI-feedback
      const updatedCandidates = candidates.map(candidate => 
        candidate.id === candidateId 
          ? {...candidate, isFavorite: !isFavorite} 
          : candidate
      );
      
      setCandidates(updatedCandidates);
      console.log("Kandidaten bijgewerkt, nieuwe isFavorite status:", !isFavorite);
      
    } catch (error) {
      console.error("Fout bij bijwerken favoriet:", error);
    }
  };

  if (!currentUser || !userProfile || userProfile.role !== 'recruiter') {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <LayoutProvider isInsideLayout={false}>
        <div className="w-full min-h-screen bg-gray-50">
        {/* Blauwe header sectie, identiek aan Over ons pagina */}
        <div className="w-full bg-gradient-to-r from-primary-600 to-primary-800 text-white py-32 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-6 text-center">Kandidaten</h1>
            <div className="h-4 bg-primary-300 bg-opacity-30 rounded w-2/3 mx-auto mb-8"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[1, 2, 3, 4].map(j => (
                        <div key={j} className="h-6 bg-gray-200 rounded w-16"></div>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      </LayoutProvider>
    );
  }

  if (error) {
    return (
      <LayoutProvider isInsideLayout={false}>
        <div className="w-full min-h-screen bg-gray-50">
        {/* Blauwe header sectie, identiek aan Over ons pagina */}
        <div className="w-full bg-gradient-to-r from-primary-600 to-primary-800 text-white py-32 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-6 text-center">Kandidaten</h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Probleem bij het laden</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Probeer opnieuw
            </button>
          </div>
        </div>
        <Footer />
      </div>
      </LayoutProvider>
    );
  }

  if (candidates.length === 0) {
    return (
      <LayoutProvider isInsideLayout={false}>
        <div className="w-full min-h-screen bg-gray-50">
        {/* Blauwe header sectie, identiek aan Over ons pagina */}
        <div className="w-full bg-gradient-to-r from-primary-600 to-primary-800 text-white py-32 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-6 text-center">Kandidaten</h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 text-primary-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Geen kandidaten gevonden</h2>
            <p className="text-gray-600">
              Er zijn momenteel geen kandidaten beschikbaar in het systeem. Kom later terug om nieuwe profielen te bekijken.
            </p>
          </div>
        </div>
        <Footer />
      </div>
      </LayoutProvider>
    );
  }

  return (
    <LayoutProvider isInsideLayout={false}>
      <div className="w-full min-h-screen bg-gray-50">
      {/* Blauwe header sectie, identiek aan Over ons pagina */}
      <div className="w-full bg-gradient-to-r from-primary-600 to-primary-800 text-white py-32 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">Kandidaten</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Bekijk onze hoogwaardige kandidaten die klaar zijn voor hun volgende uitdaging. Neem contact op om meer te weten te komen.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map(candidate => (
            <div key={candidate.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
              {/* Favoriet ster */}
              <button 
                onClick={(e) => toggleFavorite(candidate.id, candidate.name, e)}
                className="absolute top-3 right-3 z-10"
                title={candidate.isFavorite ? "Verwijder uit favorieten" : "Voeg toe aan favorieten"}
              >
                <svg 
                  className="w-6 h-6" 
                  fill={candidate.isFavorite ? "#ffcc04" : "none"} 
                  stroke={candidate.isFavorite ? "#ffcc04" : "currentColor"} 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  data-favorite={candidate.isFavorite ? "true" : "false"}
                  onClick={() => {
                    console.log(`Ster aangeklikt voor kandidaat ${candidate.id}. isFavorite=${candidate.isFavorite}, favorites bevat id=${favorites.includes(candidate.id)}`);
                  }}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  ></path>
                </svg>
              </button>

              <div className="p-6">
                {/* Profielfoto - 20% kleiner */}
                <div className="flex justify-center mb-4">
                  {candidate.profileImage ? (
                    <>
                      <img 
                        src={candidate.profileImage} 
                        alt={`Profielfoto van ${candidate.name}`}
                        className="w-20 h-20 rounded-full object-cover border-2 border-primary-200"
                        onError={(e) => {
                          console.error(`Fout bij laden profielfoto voor ${candidate.name}:`, candidate.profileImage);
                          // Verberg het image element en toon de fallback
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const fallback = parent.querySelector('.fallback-avatar');
                            if (fallback) {
                              fallback.classList.remove('hidden');
                            }
                          }
                        }}
                      />
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl border-2 border-gray-300 hidden fallback-avatar">
                        {candidate.name.charAt(0).toUpperCase()}
                      </div>
                    </>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl border-2 border-gray-300">
                      {candidate.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <h2 className="text-xl font-semibold mb-2 text-center">{candidate.name}</h2>
                <p className="text-primary-600 font-medium mb-2">{candidate.role}</p>
                <p className="text-gray-600 mb-4">{candidate.location} • {candidate.experience}</p>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Vaardigheden:</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${candidate.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-sm text-gray-600">
                    {candidate.available ? 'Beschikbaar' : 'Niet beschikbaar'}
                  </span>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button 
                  onClick={() => navigate(`/candidate/${candidate.id}`)} 
                  className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
                >
                  Bekijk profiel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
    </LayoutProvider>
  );
};

export default Candidates; 