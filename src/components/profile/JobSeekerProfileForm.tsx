import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { BaseUser } from '../../types/user';
import CVUploadSection from './CVUploadSection';
import CVPreviewSection from './CVPreviewSection';
import DetailedCVForm from './DetailedCVForm';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
  pitchVideo?: string;
  hoursPerWeek?: string;
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
  const [pitchVideoUrl, setPitchVideoUrl] = useState<string | undefined>(
    user.profile?.pitchVideo || user.pitchVideo || ''
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
      isAvailableForWork: false,
      pitchVideo: '',
      hoursPerWeek: '',
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
    
    // NIEUW: controleer personalAddress object (voorheen gebruikt door iOS app)
    if (user.personalAddress && typeof user.personalAddress === 'object') {
      const pAddress = user.personalAddress as Record<string, any>;
      if (!initialValues.street) initialValues.street = pAddress.street || '';
      if (!initialValues.houseNumber) initialValues.houseNumber = pAddress.houseNumber || '';
      if (!initialValues.postalCode) initialValues.postalCode = pAddress.postalCode || '';
      if (!initialValues.city) initialValues.city = pAddress.city || '';
      if (!initialValues.country) initialValues.country = pAddress.country || '';

      // Indien telefoon in personalAddress staat
      if (!initialValues.phoneNumber) initialValues.phoneNumber = pAddress.phone || '';
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
      
      // Uren per week uit profiel (iOS)
      if (profile.hoursPerWeek) initialValues.hoursPerWeek = profile.hoursPerWeek;
      
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
      
      // Pitch video
      if (profile.pitchVideo) {
        setPitchVideoUrl(profile.pitchVideo);
        initialValues.pitchVideo = profile.pitchVideo;
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
    
    // Pitch video URL uit verschillende mogelijke bronnen
    const videoURLToSet =
      user.pitchVideo ||
      user.pitchVideoURL ||
      (user.profile && (user.profile.pitchVideo || user.profile.pitchVideoURL)
        ? user.profile.pitchVideo || user.profile.pitchVideoURL
        : '');
    if (videoURLToSet) {
      setPitchVideoUrl(videoURLToSet);
      initialValues.pitchVideo = videoURLToSet;
    }
    
    // EXTRA: root niveau beschikbaarheidsvlag uit oudere apps
    if (typeof user.isAvailable === 'boolean') {
      initialValues.isAvailableForWork = user.isAvailable;
      setIsToggleActive(user.isAvailable === true);
    }
    
    // Root niveau hoursPerWeek
    if (user.hoursPerWeek && !initialValues.hoursPerWeek) {
      initialValues.hoursPerWeek = user.hoursPerWeek;
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
  
  const handleVideoUpload = async (file: File) => {
    try {
      setLoading(true);
      const storage = getStorage();
      const user = auth.currentUser;
      
      if (!file) {
        throw new Error("Geen bestand geselecteerd.");
      }
      
      if (!user) {
        throw new Error("Je bent niet ingelogd. Log opnieuw in om je video te uploaden.");
      }
      
      // Controle op bestandsgrootte (max 100MB)
      const MAX_SIZE_MB = 100;
      const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
      if (file.size > MAX_SIZE_BYTES) {
        throw new Error(`Video is te groot. Maximale grootte is ${MAX_SIZE_MB}MB.`);
      }
      
      // Maak een unieke bestandsnaam met timestamp
      const timestamp = new Date().getTime();
      const fileName = `pitch-${timestamp}-${file.name}`;
      const storageRef = ref(storage, `pitch-videos/${user.uid}/${fileName}`);
      
      console.log("Video uploaden naar:", `pitch-videos/${user.uid}/${fileName}`);
      
      // Upload het bestand
      await uploadBytes(storageRef, file);
      console.log("Video geüpload, nu de download URL ophalen");
      
      // Haal de download URL op
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Video URL ontvangen:", downloadURL);
      
      // Update de state en form value
      setPitchVideoUrl(downloadURL);
      setValue('pitchVideo', downloadURL);
      
      // Direct de video URL bijwerken in Firestore
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        pitchVideo: downloadURL,
        pitchVideoURL: downloadURL,
        "profile.pitchVideo": downloadURL,
        "profile.pitchVideoURL": downloadURL,
        updatedAt: serverTimestamp()
      });
      
      console.log("Video succesvol bijgewerkt in profiel");
      return downloadURL;
    } catch (err) {
      console.error('Fout bij uploaden video:', err);
      onError('Er is een fout opgetreden bij het uploaden van je video. Probeer het later opnieuw.');
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
        hoursPerWeek: data.hoursPerWeek || '',
        isAvailableForWork: data.isAvailableForWork === true,
        cv: cvUrl || data.cv || '',
        linkedin: data.linkedin || '',
        portfolio: data.portfolio || '',
        experience: data.experience || '',
        education: data.education ? data.education.split(',').map(edu => edu.trim()) : [],
        profilePhoto: profilePhotoUrl || data.profilePhoto || '',
        pitchVideo: pitchVideoUrl || data.pitchVideo || '',
        pitchVideoURL: pitchVideoUrl || data.pitchVideo || '',
      };

      // Zorg dat de beschikbaarheidsvlag zowel in het profiel als op root-niveau staat
      const isAvailableBool = data.isAvailableForWork === true;
      profile.isAvailableForWork = isAvailableBool;

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
        pitchVideo: profile.pitchVideo, // Duplicaat op root niveau voor compatibiliteit
        pitchVideoURL: profile.pitchVideoURL,
        hoursPerWeek: profile.hoursPerWeek,
        // -----------------------------
        // NIEUW: beschikbaarheid dupliceren op root-niveau
        isAvailable: isAvailableBool,
        isAvailableForWork: isAvailableBool,
        // Dupliceer adresgegevens onder personalAddress voor iOS compatibiliteit
        personalAddress: address,
        // -----------------------------
        updatedAt: serverTimestamp(),
      };

      console.log("Bijgewerkte gebruikersgegevens die worden opgeslagen:", JSON.stringify(updatedUser, null, 2));
      
      // Gebruikersgegevens bijwerken in Firestore
      await updateDoc(userDocRef, updatedUser);
      
      console.log("Profiel succesvol bijgewerkt");
      setLoading(false);
      
      // Belangrijk: NIET het formulier resetten na succesvolle verzending
      // We behouden de ingevoerde gegevens, zodat de gebruiker ze niet opnieuw hoeft in te voeren
      
      // Direct de waarden opnieuw instellen om te voorkomen dat ze verdwijnen
      setValue('street', data.street || '');
      setValue('houseNumber', data.houseNumber || '');
      setValue('postalCode', data.postalCode || '');
      setValue('city', data.city || '');
      setValue('country', data.country || '');
      setValue('phoneNumber', data.phoneNumber || '');
      
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
              
              {/* Uren per week */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Uren per week</label>
                <select
                  {...register('hoursPerWeek')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecteer uren</option>
                  <option value="0-8">0-8</option>
                  <option value="8-16">8-16</option>
                  <option value="16-24">16-24</option>
                  <option value="24-32">24-32</option>
                  <option value="32-40">32-40</option>
                  <option value=">40">40+</option>
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
          
          {/* Na de Professionele informatie sectie, voeg de Video Pitch sectie toe */}
          <div className="mt-8 mb-8">
            <h2 className="text-lg font-medium mb-4">Video Pitch</h2>
            <p className="text-gray-600 mb-4">
              Upload een korte video (max. 1,5 minuut) waarin je jezelf voorstelt aan recruiters. 
              Vertel iets over je ervaring, motivatie en waarom je geschikt bent voor je droombaan.
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              {/* Video upload sectie */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Upload zone - alleen tonen als er nog GEEN video is */}
                {!pitchVideoUrl && (
                  <div className="md:w-1/2">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selecteer een videobestand (max. 1,5 minuut)
                      </label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleVideoUpload(file)
                              .then(() => console.log("Video succesvol geüpload"))
                              .catch(err => console.error("Fout bij uploaden:", err));
                          }
                        }}
                        className="hidden"
                        id="pitchVideo"
                      />
                      <label
                        htmlFor="pitchVideo"
                        className="cursor-pointer flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors duration-200"
                      >
                        <div className="text-center">
                          <svg 
                            className="mx-auto h-12 w-12 text-gray-400" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" 
                            />
                          </svg>
                          <p className="mt-2 text-sm font-medium text-primary-600">Sleep je video hierheen of klik om te selecteren</p>
                          <p className="mt-1 text-xs text-gray-500">MP4, MOV, WEBM of AVI (max. 100MB)</p>
                        </div>
                      </label>
                    </div>
                    {/* Hidden input for the video URL */}
                    <input type="hidden" {...register('pitchVideo')} />
                  </div>
                )}
                
                {/* Video preview */}
                <div className="md:w-1/2">
                  {pitchVideoUrl ? (
                    <div className="rounded-lg overflow-hidden">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video preview
                      </label>
                      <video 
                        controls 
                        className="w-full h-auto border border-gray-200 rounded-lg shadow-sm"
                        src={pitchVideoUrl} 
                      >
                        Je browser ondersteunt geen video weergave.
                      </video>
                      <div className="flex justify-between mt-2">
                        <p className="text-sm text-gray-500">
                          Video succesvol geüpload!
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setPitchVideoUrl('');
                            setValue('pitchVideo', '');
                          }}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Verwijderen
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full border border-gray-200 rounded-lg bg-white p-6">
                      <div className="text-center text-gray-500">
                        <svg 
                          className="mx-auto h-12 w-12 text-gray-400" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                          />
                        </svg>
                        <p className="mt-2">Nog geen video geüpload.</p>
                        <p className="mt-1 text-xs">Upload een video om deze hier te bekijken.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">
                      Je video pitch is een krachtige manier om jezelf te presenteren. Houd je video kort (max. 1,5 minuut) 
                      en vertel iets over je ervaring, persoonlijkheid en wat je uniek maakt. Zorg voor een rustige omgeving 
                      en goede belichting voor de beste indruk.
                    </p>
                  </div>
                </div>
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