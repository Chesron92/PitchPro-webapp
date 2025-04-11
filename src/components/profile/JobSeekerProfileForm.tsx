import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { JobSeeker, BaseUser } from '../../types/user';
import CVUploadSection from './CVUploadSection';
import CVPreviewSection from './CVPreviewSection';
import DetailedCVForm from './DetailedCVForm';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../../firebase/config';

interface JobSeekerProfileFormProps {
  user: BaseUser;
  onSuccess: () => void;
  onError: (message: string) => void;
  setLoading: (loading: boolean) => void;
}

interface JobSeekerFormInputs {
  displayName: string;
  phoneNumber: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
  skills: string;
  availability: string;
  cv: string;
  linkedin: string;
  portfolio: string;
  experience: string;
  education: string;
  profilePhoto: string;
  isAvailableForWork?: boolean;
}

const JobSeekerProfileForm: React.FC<JobSeekerProfileFormProps> = ({ 
  user, 
  onSuccess, 
  onError, 
  setLoading 
}) => {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<JobSeekerFormInputs>();
  const [cvUrl, setCvUrl] = useState<string | undefined>(
    user.profile?.cv || user.cv || ''
  );
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | undefined>(
    user.profile?.profilePhoto || user.profilePhoto || ''
  );
  const [isToggleActive, setIsToggleActive] = useState<boolean>(false);
  
  // Watch voor checkbox veranderingen
  const isAvailableForWorkValue = watch('isAvailableForWork');
  
  // Update toggle wanneer de checkbox waarde verandert
  useEffect(() => {
    setIsToggleActive(!!isAvailableForWorkValue);
  }, [isAvailableForWorkValue]);
  
  // Bepaal de initiële waarden voor het formulier
  useEffect(() => {
    console.log("User profiel bijgewerkt, formulier resetten", JSON.stringify(user, null, 2));
    
    // Begin met lege waardes, om te voorkomen dat oude waardes achterblijven
    const initialValues: Partial<JobSeekerFormInputs> = {
      displayName: '',
      phoneNumber: '',
      street: '',
      houseNumber: '',
      postalCode: '',
      city: '',
      country: '',
      skills: '',
      availability: '',
      cv: '',
      linkedin: '',
      portfolio: '',
      experience: '',
      education: '',
      profilePhoto: '',
      isAvailableForWork: false
    };
    
    // Vul persoonlijke gegevens in vanaf verschillende mogelijke locaties
    initialValues.displayName = user.displayName || '';
    initialValues.phoneNumber = user.phoneNumber || user.phone || '';
    
    // Controleer eerst root niveau adresgegevens
    initialValues.street = user.street || '';
    initialValues.houseNumber = user.houseNumber || '';
    initialValues.postalCode = user.postalCode || '';
    initialValues.city = user.city || '';
    initialValues.country = user.country || '';
    
    // Controleer adresgegevens in user.address object indien beschikbaar
    if (user.address && typeof user.address === 'object') {
      const address = user.address as Record<string, any>;
      if (!initialValues.street) initialValues.street = address.street || '';
      if (!initialValues.houseNumber) initialValues.houseNumber = address.houseNumber || '';
      if (!initialValues.postalCode) initialValues.postalCode = address.postalCode || '';
      if (!initialValues.city) initialValues.city = address.city || '';
      if (!initialValues.country) initialValues.country = address.country || '';
    }
    
    // Controleer de profile gegevens
    if (user.profile) {
      console.log("Profielgegevens gevonden:", JSON.stringify(user.profile, null, 2));
      
      // Controleer adresgegevens in user.profile.address object indien beschikbaar
      if (user.profile.address && typeof user.profile.address === 'object') {
        const profileAddress = user.profile.address as Record<string, any>;
        if (!initialValues.street) initialValues.street = profileAddress.street || '';
        if (!initialValues.houseNumber) initialValues.houseNumber = profileAddress.houseNumber || '';
        if (!initialValues.postalCode) initialValues.postalCode = profileAddress.postalCode || '';
        if (!initialValues.city) initialValues.city = profileAddress.city || '';
        if (!initialValues.country) initialValues.country = profileAddress.country || '';
      }
      
      // Controleer specifieke profielvelden
      const profile = user.profile as Record<string, any>;
      
      // Vaardigheden kunnen een array of string zijn
      if (profile.skills) {
        initialValues.skills = Array.isArray(profile.skills) 
          ? profile.skills.join(', ') 
          : (typeof profile.skills === 'string' ? profile.skills : '');
      }
      
      // Beschikbaarheid direct uit profiel
      initialValues.availability = profile.availability || '';
      
      // Beschikbaarheid voor werk
      initialValues.isAvailableForWork = profile.isAvailableForWork === true;
      
      // Update ook de toggle status
      setIsToggleActive(profile.isAvailableForWork === true);
      
      // CV, LinkedIn, Portfolio
      initialValues.cv = profile.cv || '';
      initialValues.linkedin = profile.linkedin || '';
      initialValues.portfolio = profile.portfolio || '';
      
      // Ervaring kan een array of string zijn
      if (profile.experience) {
        initialValues.experience = typeof profile.experience === 'string' 
          ? profile.experience 
          : (Array.isArray(profile.experience) ? JSON.stringify(profile.experience) : '');
      }
      
      // Opleiding kan een array of string zijn
      if (profile.education) {
        initialValues.education = Array.isArray(profile.education) 
          ? profile.education.join(', ') 
          : (typeof profile.education === 'string' ? profile.education : '');
      }
      
      // Profielfoto
      if (profile.profilePhoto) {
        setProfilePhotoUrl(profile.profilePhoto);
        initialValues.profilePhoto = profile.profilePhoto;
      }
    }
    
    // Update profile photo URL uit verschillende mogelijke bronnen
    const photoURL = user.profilePhoto || user.photoURL || 
                    (user.profile && user.profile.profilePhoto ? user.profile.profilePhoto : '');
    
    if (photoURL) {
      console.log("Profielfoto URL gevonden:", photoURL);
      setProfilePhotoUrl(photoURL);
      initialValues.profilePhoto = photoURL;
    }
    
    // Update CV URL vanuit verschillende mogelijke bronnen
    const cvURLToSet = user.cv || (user.profile && user.profile.cv ? user.profile.cv : '');
    if (cvURLToSet) {
      setCvUrl(cvURLToSet);
      initialValues.cv = cvURLToSet;
    }
    
    // Reset het formulier met de nieuwe waarden
    console.log("Formulier reset met waarden:", initialValues);
    reset(initialValues as JobSeekerFormInputs);
  }, [user, reset]);
  
  // Handler voor als de CV upload succesvol is
  const handleCvUploadSuccess = (url: string) => {
    setCvUrl(url);
    setValue('cv', url);
  };
  
  const handleProfilePhotoUpload = async (file: File) => {
    try {
      setLoading(true);
      const storage = getStorage();
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error("Je bent niet ingelogd. Log opnieuw in om je profielfoto te uploaden.");
      }
      
      // Maak een unieke bestandsnaam met timestamp
      const timestamp = new Date().getTime();
      const fileName = `profile-${timestamp}-${file.name}`;
      const storageRef = ref(storage, `profile-photos/${user.uid}/${fileName}`);
      
      console.log("Profielfoto uploaden naar:", `profile-photos/${user.uid}/${fileName}`);
      
      // Upload het bestand
      await uploadBytes(storageRef, file);
      console.log("Profielfoto geüpload, nu de download URL ophalen");
      
      // Haal de download URL op
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Profielfoto URL ontvangen:", downloadURL);
      
      // Update de state en form value
      setProfilePhotoUrl(downloadURL);
      setValue('profilePhoto', downloadURL);
      
      // Direct de profielfoto bijwerken in Firestore
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        profilePhoto: downloadURL,
        photoURL: downloadURL,
        "profile.profilePhoto": downloadURL,
        updatedAt: serverTimestamp()
      });
      
      console.log("Profielfoto succesvol bijgewerkt in profiel");
      return downloadURL;
    } catch (err) {
      console.error('Fout bij uploaden profielfoto:', err);
      onError('Er is een fout opgetreden bij het uploaden van je profielfoto. Probeer het later opnieuw.');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const onSubmit = async (data: JobSeekerFormInputs) => {
    if (!auth.currentUser) {
      onError("Je bent niet ingelogd. Log opnieuw in om je profiel op te slaan.");
      return;
    }
    
    console.log("Profielgegevens worden opgeslagen:", data);
    setLoading(true);

    try {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, "users", userId);
      
      // Voorbereiden van adresgegevens
      const address = {
        street: data.street || '',
        houseNumber: data.houseNumber || '',
        postalCode: data.postalCode || '',
        city: data.city || '',
        country: data.country || ''
      };

      // Voorbereiden van profielgegevens
      const profile = {
        address: address,
        skills: data.skills ? data.skills.split(',').map(skill => skill.trim()) : [],
        availability: data.availability || '',
        isAvailableForWork: data.isAvailableForWork === true,
        cv: cvUrl || data.cv || '',
        linkedin: data.linkedin || '',
        portfolio: data.portfolio || '',
        experience: data.experience || '',
        education: data.education ? data.education.split(',').map(edu => edu.trim()) : [],
        profilePhoto: profilePhotoUrl || data.profilePhoto || ''
      };

      // Voorbereiden van bijgewerkte gebruikersgegevens
      const updatedUser = {
        displayName: data.displayName || '',
        phoneNumber: data.phoneNumber || '',
        phone: data.phoneNumber || '', // Duplicaat voor compatibiliteit
        photoURL: profile.profilePhoto, // Duplicaat voor compatibiliteit
        // Ook rechtstreeks adresgegevens opslaan op root niveau voor compatibiliteit
        street: address.street,
        houseNumber: address.houseNumber,
        postalCode: address.postalCode,
        city: address.city,
        country: address.country,
        // Adres object voor structuur
        address: address,
        // Profiel en aanvullende info
        profile: profile,
        profilePhoto: profile.profilePhoto, // Duplicaat op root niveau voor compatibiliteit
        cv: profile.cv, // Duplicaat op root niveau voor compatibiliteit
        updatedAt: serverTimestamp(),
      };

      console.log("Bijgewerkte gebruikersgegevens die worden opgeslagen:", JSON.stringify(updatedUser, null, 2));
      
      // Gebruikersgegevens bijwerken in Firestore
      await updateDoc(userDocRef, updatedUser);
      
      console.log("Profiel succesvol bijgewerkt");
      setLoading(false);
      onSuccess();
    } catch (error) {
      console.error("Fout bij het bijwerken van profiel:", error);
      setLoading(false);
      onError(error instanceof Error ? error.message : "Er is een onbekende fout opgetreden");
    }
  };
  
  return (
    <div>
      <div className="space-y-8">
        {/* Basis profiel informatie */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Persoonlijke gegevens */}
            <div>
              <h2 className="text-lg font-medium mb-4">Persoonlijke gegevens</h2>
              
              {/* Profielfoto upload sectie */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Profielfoto</label>
                <div className="flex items-center space-x-4">
                  {profilePhotoUrl ? (
                    <div className="relative">
                      <img 
                        src={profilePhotoUrl} 
                        alt="Profielfoto" 
                        className="w-20 h-20 rounded-full object-cover border-2 border-primary-500"
                        onError={(e) => {
                          console.error("Fout bij laden profielfoto:", e);
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=Foto';
                        }}
                      />
                      <div 
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                        onClick={() => {
                          setProfilePhotoUrl('');
                          setValue('profilePhoto', '');
                        }}
                      >
                        ×
                      </div>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleProfilePhotoUpload(file)
                            .then(() => console.log("Profielfoto succesvol bijgewerkt"))
                            .catch(err => console.error("Fout bij uploaden:", err));
                        }
                      }}
                      className="hidden"
                      id="profilePhoto"
                    />
                    <label
                      htmlFor="profilePhoto"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                      Foto uploaden
                    </label>
                    {profilePhotoUrl && (
                      <p className="mt-1 text-xs text-gray-500">
                        Profielfoto succesvol geladen
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
                <input
                  type="text"
                  {...register('displayName', { required: 'Naam is verplicht' })}
                  className={`w-full px-3 py-2 border rounded-md ${errors.displayName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.displayName && <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer</label>
                <input
                  type="tel"
                  {...register('phoneNumber')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            {/* Adresgegevens */}
            <div>
              <h2 className="text-lg font-medium mb-4">Adresgegevens</h2>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Straat</label>
                  <input
                    type="text"
                    {...register('street')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Huisnummer</label>
                  <input
                    type="text"
                    {...register('houseNumber')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                  <input
                    type="text"
                    {...register('postalCode')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plaats</label>
                  <input
                    type="text"
                    {...register('city')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Land</label>
                <input
                  type="text"
                  {...register('country')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          
          {/* CV Upload sectie */}
          <div className="mt-8 mb-8">
            <h2 className="text-xl font-medium mb-4">Curriculum Vitae Document</h2>
            <p className="text-gray-600 mb-6">
              Hieronder kun je een CV-document uploaden dat recruiters kunnen downloaden. Ondersteunde formaten zijn PDF, DOC en DOCX.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Linker kolom - Upload */}
              <div>
                <CVUploadSection
                  currentCvUrl={cvUrl}
                  userId={user.id}
                  onUploadSuccess={handleCvUploadSuccess}
                  onUploadError={(msg) => onError(msg)}
                />
                
                {/* CV URL (hidden field, wordt bijgewerkt door de CV Upload component) */}
                <input type="hidden" {...register('cv')} />
              </div>
              
              {/* Rechter kolom - Preview */}
              <div>
                <CVPreviewSection cvUrl={cvUrl} />
              </div>
            </div>
          </div>
          
          {/* Professionele informatie */}
          <div className="mt-8 mb-8">
            <h2 className="text-lg font-medium mb-4">Professionele informatie</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Beschikbaarheid</label>
                <select
                  {...register('availability')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecteer beschikbaarheid</option>
                  <option value="Fulltime">Fulltime</option>
                  <option value="Parttime">Parttime</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Stage">Stage</option>
                </select>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center space-x-3 mt-4">
                  <label 
                    htmlFor="isAvailableForWork" 
                    className="block text-sm font-medium text-gray-700 cursor-pointer"
                    onClick={() => {
                      const newValue = !isToggleActive;
                      setIsToggleActive(newValue);
                      setValue('isAvailableForWork', newValue);
                    }}
                  >
                    Beschikbaar voor werk
                  </label>
                  <div className="relative inline-block w-14 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="isAvailableForWork"
                      {...register('isAvailableForWork')}
                      className="sr-only"
                      onChange={(e) => {
                        setValue('isAvailableForWork', e.target.checked);
                        setIsToggleActive(e.target.checked);
                      }}
                    />
                    <div 
                      className={`toggle-bg block h-8 rounded-full cursor-pointer w-14 transition-colors duration-200 ease-in-out ${isToggleActive ? 'bg-primary-600' : 'bg-gray-200'}`}
                      onClick={() => {
                        const newValue = !isToggleActive;
                        setIsToggleActive(newValue);
                        setValue('isAvailableForWork', newValue);
                      }}
                    ></div>
                    <div 
                      className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow transition-transform duration-200 ease-in-out ${isToggleActive ? 'transform translate-x-6' : ''}`}
                    ></div>
                  </div>
                  <span 
                    className="text-sm text-gray-500 cursor-pointer"
                    onClick={() => {
                      const newValue = !isToggleActive;
                      setIsToggleActive(newValue);
                      setValue('isAvailableForWork', newValue);
                    }}
                  >
                    Recruiters kunnen je profiel zien als dit is ingeschakeld
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <input
                  type="url"
                  {...register('linkedin')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://linkedin.com/in/jouwprofiel"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio URL</label>
                <input
                  type="url"
                  {...register('portfolio')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://jouwportfolio.com"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 mb-10">
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Basisprofiel opslaan
            </button>
          </div>
        </form>
        
        {/* Scheidingslijn tussen basis en uitgebreid profiel */}
        <div className="border-t border-gray-200 pt-8 mb-6">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Uitgebreid CV</h2>
            <div className="ml-4 flex-1 border-t border-gray-200"></div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Hieronder kun je een gedetailleerd CV maken met specifieke informatie over je werkervaring,
                  opleidingen, stages, certificaten, talen en hobby's. Deze informatie wordt opgeslagen in je profiel en is zichtbaar voor recruiters.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Uitgebreid CV formulier */}
        <DetailedCVForm
          user={user}
          onSuccess={onSuccess}
          onError={onError}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default JobSeekerProfileForm; 