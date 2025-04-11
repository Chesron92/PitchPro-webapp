import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useNavigate } from 'react-router-dom';

interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  skills: string[];
  location: string;
  available: boolean;
  profileImage?: string;
}

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Query naar gebruikers die een jobseeker profiel hebben
        const q = query(
          collection(db, 'users'), 
          where('userType', 'in', ['jobseeker', 'werkzoekende'])
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
            'Wordt getoond (data.profile?.isAvailableForWork === true)': data.profile?.isAvailableForWork === true
          });
          
          // Controleer hier of de gebruiker beschikbaar is voor werk
          // Alleen gebruikers toevoegen die beschikbaar zijn voor werk
          if (data.profile?.isAvailableForWork === true || data.isAvailableForWork === true) {
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
                      data.skills || [],
              location: data.location || data.city || 'Locatie onbekend',
              available: data.profile?.isAvailableForWork === true || data.isAvailableForWork === true,
              profileImage: data.profilePhoto || data.profileImageURL || data.photoURL || data.profile?.profilePhoto || undefined
            });
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
  }, []);

  // Fallback voor wanneer er geen data is
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
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
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
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
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
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
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
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
            <div key={candidate.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                {/* Profielfoto */}
                <div className="flex justify-center mb-4">
                  {candidate.profileImage ? (
                    <>
                      <img 
                        src={candidate.profileImage} 
                        alt={`Profielfoto van ${candidate.name}`}
                        className="w-24 h-24 rounded-full object-cover border-2 border-primary-200"
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
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl border-2 border-gray-300 hidden fallback-avatar">
                        {candidate.name.charAt(0).toUpperCase()}
                      </div>
                    </>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl border-2 border-gray-300">
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
  );
};

export default Candidates; 