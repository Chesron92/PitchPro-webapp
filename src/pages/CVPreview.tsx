import React, { useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { DetailedCV, WorkExperience, Education, Internship, Certificate, Language, Hobby, Skill } from '../types/cv';
import { useNavigate } from 'react-router-dom';

// Helper functie voor timestamp conversie naar datum string
const formatDate = (timestamp: any): string => {
  if (!timestamp) return 'Onbekend';
  
  try {
    // Check of het een Firestore timestamp is
    if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleDateString('nl-NL', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    // Als het een Date object is
    if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString('nl-NL', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    // Als het een string is die een datum voorstelt
    if (typeof timestamp === 'string') {
      const date = new Date(timestamp);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('nl-NL', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      }
    }
    
    return String(timestamp);
  } catch (e) {
    console.error('Error formatting date:', e);
    return 'Onbekend';
  }
};

const CVPreview: React.FC = () => {
  const { userProfile, currentUser } = useAuth();
  const [cvData, setCvData] = useState<DetailedCV | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pitchVideoUrl, setPitchVideoUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCVData = async () => {
      if (!currentUser?.uid) {
        setError('Je moet ingelogd zijn om je CV te bekijken');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Haal het gebruikersdocument op
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          
          // Controleer of er een video pitch URL is
          if (userData.pitchVideo) {
            setPitchVideoUrl(userData.pitchVideo);
          } else if (userData.profile?.pitchVideo) {
            setPitchVideoUrl(userData.profile.pitchVideo);
          }
          
          // Controleer eerst of er een detailedCV object is in userData
          if (userData.detailedCV) {
            setCvData(userData.detailedCV);
          } else {
            // Als er geen detailedCV is, probeer dan de subcollectie
            const cvDocRef = doc(db, 'users', currentUser.uid, 'cv', 'main');
            const cvDocSnap = await getDoc(cvDocRef);
            
            if (cvDocSnap.exists()) {
              setCvData(cvDocSnap.data() as DetailedCV);
            } else {
              setError('Geen CV gegevens gevonden. Maak eerst een CV aan.');
            }
          }
        } else {
          setError('Gebruikersprofiel niet gevonden');
        }
      } catch (err) {
        console.error('Fout bij ophalen CV data:', err);
        setError('Er is een fout opgetreden bij het ophalen van je CV gegevens');
      } finally {
        setLoading(false);
      }
    };

    fetchCVData();
  }, [currentUser]);

  // Vaardigheidsniveau naar sterren converteren
  const renderSkillLevel = (level: number): ReactNode => {
    const stars = [];
    const maxStars = 5;
    
    for (let i = 1; i <= maxStars; i++) {
      if (i <= level) {
        // Gevulde ster
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        // Lege ster
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  // Functie om terug te gaan naar het profiel
  const handleBackToProfile = () => {
    navigate('/profile');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-gray-600">CV gegevens laden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">CV Preview</h1>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
          <button
            onClick={handleBackToProfile}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Terug naar profiel
          </button>
        </div>
      </div>
    );
  }

  // De gebruikersnaam uit het profiel halen
  const displayName = userProfile?.displayName || currentUser?.displayName || 'Gebruiker';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header met back button */}
          <div className="p-6 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">CV Preview</h1>
              <button
                onClick={handleBackToProfile}
                className="px-4 py-2 bg-white text-primary-700 rounded-md hover:bg-gray-100"
              >
                Terug naar profiel
              </button>
            </div>
            <p className="mt-2 text-primary-100">
              Dit is hoe je CV eruit zal zien voor recruiters
            </p>
          </div>

          {/* CV Inhoud */}
          <div className="p-8">
            {/* Persoonlijke gegevens */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-primary-700 border-b-2 border-primary-200 pb-2 mb-4">
                {displayName}
              </h2>
              {userProfile?.email && (
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Email:</span> {userProfile.email}
                </p>
              )}
              {userProfile?.phoneNumber && (
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Telefoon:</span> {userProfile.phoneNumber}
                </p>
              )}
              {userProfile?.address && (
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Adres:</span>{' '}
                  {[
                    userProfile.address.street,
                    userProfile.address.houseNumber,
                    userProfile.address.postalCode,
                    userProfile.address.city,
                    userProfile.address.country,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              )}
            </div>

            {/* Over mij */}
            {cvData?.overMij && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Over mij</h2>
                <p className="text-gray-700 whitespace-pre-line">{cvData.overMij}</p>
              </div>
            )}

            {/* Video Pitch */}
            {pitchVideoUrl && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Video Pitch</h2>
                <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                  <video 
                    controls
                    className="w-full h-full"
                    poster="/images/video-thumbnail.jpg"
                  >
                    <source src={pitchVideoUrl} type="video/mp4" />
                    Uw browser ondersteunt geen video weergave.
                  </video>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                  Dit is mijn persoonlijke video pitch waarin ik mezelf kort presenteer.
                </p>
              </div>
            )}

            {/* Werkervaring */}
            {cvData?.werkervaring && cvData.werkervaring.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Werkervaring</h2>
                <div className="space-y-6">
                  {cvData.werkervaring.map((werk: WorkExperience) => (
                    <div key={werk.id} className="pl-4 border-l-2 border-primary-200">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium text-lg text-gray-800">{werk.functie}</h3>
                        <span className="text-gray-500 text-sm">
                          {formatDate(werk.startDatum)} - {werk.isHuidigeFunctie ? 'Heden' : formatDate(werk.eindDatum)}
                        </span>
                      </div>
                      <p className="text-primary-600 font-medium mb-2">{werk.bedrijf}</p>
                      {werk.beschrijving && (
                        <p className="text-gray-700 whitespace-pre-line">{werk.beschrijving}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Opleiding */}
            {cvData?.opleiding && cvData.opleiding.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Opleiding</h2>
                <div className="space-y-6">
                  {cvData.opleiding.map((opl: Education) => (
                    <div key={opl.id} className="pl-4 border-l-2 border-primary-200">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium text-lg text-gray-800">{opl.opleiding}</h3>
                        <span className="text-gray-500 text-sm">
                          {formatDate(opl.startDatum)} - {opl.isHuidigeOpleiding ? 'Heden' : formatDate(opl.eindDatum)}
                        </span>
                      </div>
                      <p className="text-primary-600 font-medium mb-2">{opl.instituut}</p>
                      {opl.beschrijving && (
                        <p className="text-gray-700 whitespace-pre-line">{opl.beschrijving}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stages */}
            {cvData?.stages && cvData.stages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Stages</h2>
                <div className="space-y-6">
                  {cvData.stages.map((stage: Internship) => (
                    <div key={stage.id} className="pl-4 border-l-2 border-primary-200">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium text-lg text-gray-800">{stage.functie}</h3>
                        <span className="text-gray-500 text-sm">
                          {formatDate(stage.startDatum)} - {stage.isHuidigeStage ? 'Heden' : formatDate(stage.eindDatum)}
                        </span>
                      </div>
                      <p className="text-primary-600 font-medium mb-2">{stage.bedrijf}</p>
                      {stage.beschrijving && (
                        <p className="text-gray-700 whitespace-pre-line">{stage.beschrijving}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vaardigheden */}
            {cvData?.vaardigheden && cvData.vaardigheden.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Vaardigheden</h2>
                
                {/* Soft skills */}
                {cvData.vaardigheden.some(skill => skill.type === 'soft') && (
                  <div className="mb-4">
                    <h3 className="font-medium text-primary-600 mb-2">Soft Skills</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cvData.vaardigheden
                        .filter(skill => skill.type === 'soft')
                        .map((skill: Skill) => (
                          <div key={skill.id} className="flex justify-between items-center">
                            <span className="text-gray-700">{skill.naam}</span>
                            {renderSkillLevel(skill.niveau)}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                
                {/* Hard skills */}
                {cvData.vaardigheden.some(skill => skill.type === 'hard') && (
                  <div>
                    <h3 className="font-medium text-primary-600 mb-2">Hard Skills</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cvData.vaardigheden
                        .filter(skill => skill.type === 'hard')
                        .map((skill: Skill) => (
                          <div key={skill.id} className="flex justify-between items-center">
                            <span className="text-gray-700">{skill.naam}</span>
                            {renderSkillLevel(skill.niveau)}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Certificaten */}
            {cvData?.certificaten && cvData.certificaten.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Certificaten</h2>
                <div className="space-y-4">
                  {cvData.certificaten.map((cert: Certificate) => (
                    <div key={cert.id} className="pl-4 border-l-2 border-primary-200">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium text-gray-800">{cert.naam}</h3>
                        <span className="text-gray-500 text-sm">{formatDate(cert.datum)}</span>
                      </div>
                      <p className="text-primary-600 font-medium mb-1">{cert.uitgever}</p>
                      {cert.beschrijving && (
                        <p className="text-gray-700 text-sm">{cert.beschrijving}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Talen */}
            {cvData?.talen && cvData.talen.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Talen</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cvData.talen.map((taal: Language) => (
                    <div key={taal.id} className="flex justify-between">
                      <span className="text-gray-700">{taal.taal}</span>
                      <span className="text-primary-600 font-medium">{taal.niveau}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hobby's */}
            {cvData?.hobbys && cvData.hobbys.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Hobby's en interesses</h2>
                <div className="flex flex-wrap gap-2">
                  {cvData.hobbys.map((hobby: Hobby) => (
                    <span key={hobby.id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {hobby.naam}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-gray-500 text-center">
              Dit is een preview van je CV zoals het zichtbaar is voor recruiters. 
              <br/>Ga terug naar het profiel om wijzigingen aan te brengen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPreview; 