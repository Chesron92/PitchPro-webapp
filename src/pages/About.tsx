import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero sectie */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white pt-20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Over PitchPro
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              PitchPro is geboren uit de wens om talent en bedrijven efficiënt en mensgericht te verbinden. Ons innovatieve platform combineert geavanceerde technologie met persoonlijke betrokkenheid om echte matches te creëren, gebaseerd op de unieke verhalen achter elk CV. Ontdek een nieuwe manier van recruitment waarin elke pitch het startpunt is voor succes.
            </p>
          </div>
        </div>
      </div>

      {/* Missie sectie */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Onze missie</h2>
              <div className="h-1 w-24 bg-primary-600 mb-6"></div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Bij PitchPro hebben we een duidelijke missie: het revolutioneren van het recruitment proces door technologie en menselijke connectie samen te brengen.
                Ons platform maakt het voor werkzoekenden eenvoudiger om hun talenten te tonen en voor recruiters om de perfecte match te vinden.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We geloven dat de juiste baan vinden of de juiste kandidaat aannemen niet alleen om vaardigheden en ervaring draait, maar ook om persoonlijkheid, waarden en cultuur.
              </p>
            </div>
            <div className="bg-primary-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-primary-700">Visie voor de toekomst</h3>
              <p className="text-gray-700 mb-4">
                Ons doel is om een platform te bouwen dat niet alleen de huidige behoeften van de arbeidsmarkt vervult, maar ook anticipeert op toekomstige ontwikkelingen.
              </p>
              <p className="text-gray-700">
                We streven ernaar om de meest innovatieve en gebruiksvriendelijke recruitment-oplossing in de markt te worden, die mensen helpt hun volledige potentieel te benutten.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team sectie */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Ons team</h2>
              <div className="h-1 w-24 bg-primary-600 mx-auto mb-6"></div>
              <p className="text-gray-700 max-w-3xl mx-auto">
                PitchPro is opgericht door een team van experts met jarenlange ervaring in recruitment, technologie en gebruikerservaring.
                Ons diverse team werkt elke dag aan het verbeteren van ons platform om de beste ervaring te bieden voor zowel werkzoekenden als recruiters.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Voorbeeld teamleden, deze kunnen later vervangen worden door echte data */}
              {[
                { name: 'Jaap de Vries', role: 'CEO & Oprichter', avatar: '👨‍💼' },
                { name: 'Laura Jansen', role: 'CTO', avatar: '👩‍💻' },
                { name: 'Mark Bakker', role: 'Head of Design', avatar: '👨‍🎨' }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md text-center transition-transform hover:transform hover:scale-105">
                  <div className="p-8 bg-primary-600 text-white text-5xl">
                    {member.avatar}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1 text-gray-800">{member.name}</h3>
                    <p className="text-primary-600 mb-4">{member.role}</p>
                    <div className="flex justify-center space-x-3">
                      <button className="text-gray-500 hover:text-primary-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-primary-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-primary-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.21c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Waarden sectie */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Onze waarden</h2>
          <div className="h-1 w-24 bg-primary-600 mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-600">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Transparantie</h3>
              <p className="text-gray-600">
                We geloven in eerlijke en open communicatie tussen alle partijen en bevorderen vertrouwen door transparantie in al onze activiteiten.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-600">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Innovatie</h3>
              <p className="text-gray-600">
                We blijven continu verbeteren en nieuwe oplossingen zoeken om het recruitment proces efficiënter en effectiever te maken voor alle betrokkenen.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-600">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Inclusiviteit</h3>
              <p className="text-gray-600">
                We streven naar een diverse en inclusieve arbeidsmarkt waar iedereen gelijke kansen heeft, ongeacht achtergrond, identiteit of levenservaring.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-600">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Kwaliteit</h3>
              <p className="text-gray-600">
                We zetten ons in voor de hoogste kwaliteit in alles wat we doen en streven ernaar om excellentie te leveren in elke interactie en elk aspect van ons platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact sectie */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Neem contact met ons op</h2>
            <p className="text-xl mb-8 text-primary-100">
              Wil je meer weten over PitchPro? Ons team staat klaar om je vragen te beantwoorden.
            </p>
            <button className="px-8 py-3 bg-white text-primary-700 font-medium rounded-md hover:bg-primary-50 transition-colors shadow-md">
              Contact opnemen
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About; 