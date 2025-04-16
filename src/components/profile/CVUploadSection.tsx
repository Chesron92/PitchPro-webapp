import React, { useState, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/config';

interface CVUploadSectionProps {
  currentCvUrl: string | undefined;
  userId: string | undefined;
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: string) => void;
}

const CVUploadSection: React.FC<CVUploadSectionProps> = ({
  currentCvUrl,
  userId,
  onUploadSuccess,
  onUploadError
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Functie om de bestandsnaam te tonen uit een URL
  const getFileNameFromUrl = (url: string): string => {
    try {
      const urlParts = url.split('/');
      const fileNameWithParams = urlParts[urlParts.length - 1];
      // Verwijder query parameters als die er zijn
      return fileNameWithParams.split('?')[0];
    } catch (error) {
      return 'cv-bestand';
    }
  };

  // Functie om het geselecteerde bestand te verwerken
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Functie om het bestand te uploaden naar Firebase Storage
  const handleUpload = async () => {
    if (!selectedFile || !userId) {
      onUploadError('Geen bestand geselecteerd of gebruiker niet ingelogd');
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      // Bestandsnaam genereren met unieke timestamp
      const fileExtension = selectedFile.name.split('.').pop() || 'pdf';
      const fileName = `cv_${userId}_${Date.now()}.${fileExtension}`;
      const cvRef = ref(storage, `cv/${fileName}`);

      // Upload het bestand
      await uploadBytes(cvRef, selectedFile);
      setProgress(100);

      // Haal de download URL op
      const downloadUrl = await getDownloadURL(cvRef);
      
      // Geef de URL door aan de parent component
      onUploadSuccess(downloadUrl);
      
      // Reset de file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setSelectedFile(null);
    } catch (error) {
      console.error('Fout bij uploaden van CV:', error);
      onUploadError('Er is een fout opgetreden bij het uploaden van je CV. Probeer het opnieuw.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-medium mb-4">CV Uploaden</h2>
      
      {currentCvUrl && (
        <div className="mb-4 p-3 bg-white rounded border border-gray-300">
          <p className="text-sm font-medium text-gray-700">Huidige CV:</p>
          <div className="flex items-center justify-between mt-1">
            <a 
              href={currentCvUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              {getFileNameFromUrl(currentCvUrl)}
            </a>
          </div>
        </div>
      )}

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload een nieuw CV bestand
        </label>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-primary-50 file:text-primary-700
            hover:file:bg-primary-100"
          accept=".pdf,.doc,.docx"
          disabled={uploading}
        />
        <p className="mt-1 text-sm text-gray-500">
          Ondersteunde formaten: PDF, DOC, DOCX (max. 5MB)
        </p>
      </div>

      {selectedFile && (
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            Geselecteerd bestand: <span className="font-medium">{selectedFile.name}</span> ({Math.round(selectedFile.size / 1024)} KB)
          </p>
          
          <div className="mt-3 flex items-center">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {uploading ? 'Bezig met uploaden...' : 'CV uploaden'}
            </button>
            
            {uploading && (
              <div className="ml-4 w-full max-w-xs">
                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-primary-600"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CVUploadSection; 