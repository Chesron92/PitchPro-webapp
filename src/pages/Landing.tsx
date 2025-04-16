import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Landing: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero sectie */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white pt-20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Vind de perfecte match tussen talent en organisaties
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Het moderne recruitmentplatform dat kandidaten en recruiters samenbrengt
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="px-8 py-3 bg-white text-primary-700 font-medium rounded-md hover:bg-gray-100 transition-colors shadow-md"
                >
                  Naar Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-8 py-3 bg-white text-primary-700 font-medium rounded-md hover:bg-gray-100 transition-colors shadow-md"
                  >
                    Registreren
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Inloggen
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Functies sectie */}
      <div id="functions" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Vakgebieden en functies</h2>
          <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            Ontdek de verschillende vakgebieden en functies waar PitchPro zich op richt. Ons platform verbindt professionals uit diverse disciplines met de perfecte werkgevers.
          </p>
          
          <div className="space-y-8">
            {[
              {
                id: 1,
                title: 'Software Development',
                description: 'Ontwikkel applicaties en software-oplossingen voor diverse platforms en doeleinden.',
                roles: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer', 'DevOps Engineer']
              },
              {
                id: 2,
                title: 'Design',
                description: 'Creëer visueel aantrekkelijke en gebruiksvriendelijke designs voor digitale producten.',
                roles: ['UX Designer', 'UI Designer', 'Product Designer', 'Graphic Designer', 'Motion Designer']
              },
              {
                id: 3,
                title: 'Product Management',
                description: 'Leid de ontwikkeling van producten van concept tot lancering en verdere iteraties.',
                roles: ['Product Manager', 'Product Owner', 'Program Manager', 'Technical Product Manager']
              },
              {
                id: 4,
                title: 'Data',
                description: 'Analyseer, verwerk en visualiseer data om inzichten te genereren en besluitvorming te ondersteunen.',
                roles: ['Data Analyst', 'Data Scientist', 'Data Engineer', 'Business Intelligence Analyst']
              },
              {
                id: 5,
                title: 'Marketing',
                description: 'Promoot producten en diensten om bewustzijn te creëren en nieuwe klanten aan te trekken.',
                roles: ['Content Marketeer', 'SEO Specialist', 'Social Media Manager', 'Growth Hacker']
              }
            ].map(jobFunction => (
              <div key={jobFunction.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-3">{jobFunction.title}</h2>
                  <p className="text-gray-700 mb-5">{jobFunction.description}</p>
                  
                  <h3 className="text-lg font-medium mb-3">Populaire functies:</h3>
                  <div className="flex flex-wrap gap-2">
                    {jobFunction.roles.map((role, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <button className="text-primary-600 font-medium hover:text-primary-800 transition-colors">
                    Bekijk alle {jobFunction.title.toLowerCase()} vacatures →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Voordelen sectie */}
      <div id="features" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Waarom PitchPro?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Directe Communicatie</h3>
              <p className="text-gray-600">
                Communiceer direct met kandidaten en recruiters via ons ingebouwde chatsysteem
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Slimme Matching</h3>
              <p className="text-gray-600">
                Ons platform zorgt voor de perfecte match tussen kandidaten en vacatures
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Efficiënt Proces</h3>
              <p className="text-gray-600">
                Stroomlijn het volledige wervingsproces op één centrale plek
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA sectie */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Klaar om te beginnen?</h2>
          <p className="text-xl mb-8 text-gray-600">
            Meld je vandaag nog aan bij PitchPro en ontdek het moderne recruitment platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {currentUser ? (
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors shadow-md"
              >
                Naar Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-8 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors shadow-md"
                >
                  Registreren
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border border-primary-600 text-primary-600 font-medium rounded-md hover:bg-primary-50 transition-colors"
                >
                  Inloggen
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing; 