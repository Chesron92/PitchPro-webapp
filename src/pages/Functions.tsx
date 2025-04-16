import React from 'react';

const Functions: React.FC = () => {
  // Sample job functions/roles data
  const jobFunctions = [
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
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Functies</h1>
      <p className="text-gray-700 mb-8">
        Ontdek de verschillende vakgebieden en functies waar PitchPro zich op richt. Ons platform verbindt professionals uit diverse disciplines met de perfecte werkgevers.
      </p>
      
      <div className="space-y-8">
        {jobFunctions.map(jobFunction => (
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
  );
};

export default Functions;
