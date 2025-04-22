import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface CVPreviewSectionProps {
  cvUrl: string | undefined;
}

const CVPreviewSection: React.FC<CVPreviewSectionProps> = ({ cvUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!cvUrl) {
    return (
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-medium mb-4">CV Bekijken</h2>
        
        {/* CV Preview knop altijd tonen */}
        <div>
          <Link 
            to="/dashboard/cv-preview"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            Bekijk Gedetailleerd CV
          </Link>
        </div>
      </div>
    );
  }

  // Bepaal de bestandsextensie om te weten of het een PDF is
  const fileExtension = cvUrl.split('.').pop()?.toLowerCase();
  const isPdf = fileExtension === 'pdf';

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">CV Bekijken</h2>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary-600 hover:text-primary-800 text-sm font-medium"
        >
          {isExpanded ? 'Verkleinen' : 'Vergroten'}
        </button>
      </div>

      {isPdf ? (
        <div className={`w-full ${isExpanded ? 'h-screen' : 'h-96'} border border-gray-300 rounded-md overflow-hidden bg-white`}>
          <iframe 
            src={`${cvUrl}#toolbar=0`} 
            className="w-full h-full" 
            title="CV Preview"
          />
        </div>
      ) : (
        <div className="p-4 bg-white rounded-md border border-gray-300">
          <p className="mb-3">
            Dit document kan niet in de browser worden weergegeven. Klik op de knop hieronder om het te downloaden.
          </p>
          <a 
            href={cvUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download CV
          </a>
        </div>
      )}

      <div className="mt-4 flex justify-between">
        <Link 
          to="/dashboard/cv-preview"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          Bekijk Gedetailleerd CV
        </Link>
        
        <a 
          href={cvUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
          Openen in nieuw venster
        </a>
      </div>
    </div>
  );
};

export default CVPreviewSection; 