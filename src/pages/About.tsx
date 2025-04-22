import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';

const About: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  
  // Controleer of de gebruiker een recruiter is
  const isRecruiter = userProfile?.role === 'recruiter' || userProfile?.userType === 'recruiter';
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero sectie met blauwe achtergrond */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-white">Over PitchPro</h1>
            
            <p className="text-white text-lg mb-6">
              PitchPro is geboren uit de wens om talent en bedrijven efficiënt en mensgericht te verbinden. Ons innovatieve platform combineert geavanceerde technologie met persoonlijke betrokkenheid om echte matches te creëren, gebaseerd op de unieke verhalen achter elk CV. Ontdek een nieuwe manier van recruitment waarin elke pitch het startpunt is voor succes.
            </p>
            
            {currentUser && (
              <div className="flex justify-center mt-8">
                {isRecruiter ? (
                  <Link
                    to="/candidates"
                    className="px-8 py-3 bg-white text-primary-700 font-medium rounded-md hover:bg-gray-100 transition-colors shadow-md"
                  >
                    Naar kandidaten
                  </Link>
                ) : (
                  <Link
                    to="/jobs"
                    className="px-8 py-3 bg-white text-primary-700 font-medium rounded-md hover:bg-gray-100 transition-colors shadow-md"
                  >
                    Naar vacatures
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Missie en Visie sectie - 2 kolommen */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Missie kolom */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary-600">Onze Missie</h2>
            <p className="text-gray-700">
              Onze missie is om werkzoekenden en recruiters op een laagdrempelige en proactieve manier met elkaar in contact te brengen. We creëren een platform waar niet alleen cv's spreken, maar waar ook persoonlijkheid telt. Zo helpen we mensen en organisaties elkaar écht leren kennen en bouwen we bruggen naar duurzame samenwerkingen.
            </p>
          </div>
          
          {/* Visie kolom */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary-600">Onze Visie</h2>
            <p className="text-gray-700">
              Wij geloven in een arbeidsmarkt waarin persoonlijkheid, potentieel en proactiviteit net zo belangrijk zijn als ervaring en diploma's. Met onze app maken we het mogelijk dat werkzoekenden zichzelf authentiek presenteren, en dat recruiters gericht en menselijk kunnen werven. Zo veranderen we recruitment van een reactief proces naar een betekenisvolle, tweerichtingsgerichte ontmoeting.
            </p>
          </div>
        </div>
      </div>
      
      {/* Team sectie */}
      <div className="container mx-auto px-4 py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Ons Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-xl font-medium">Anna de Vries</h3>
              <p className="text-gray-600">CEO & Pitch Coach</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-xl font-medium">Martijn Jansen</h3>
              <p className="text-gray-600">CTO & Presentatie Expert</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact sectie */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center text-primary-600">Neem Contact Op</h2>
            <p className="mb-4 text-center">
              Vragen over onze services? Neem gerust contact met ons op.
            </p>
            <div className="flex flex-col items-center">
              <p className="mb-2">
                <strong>Email:</strong> info@pitchpro.nl
              </p>
              <p>
                <strong>Adres:</strong> Amstelplein 10, 1096 BC Amsterdam
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About; 