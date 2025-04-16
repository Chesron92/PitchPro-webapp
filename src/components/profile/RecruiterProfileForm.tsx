import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { BaseUser } from '../../types/user';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../../firebase/config';

interface RecruiterProfileFormProps {
  user: BaseUser;
  onSuccess: () => void;
  onError: (message: string) => void;
  setLoading: (loading: boolean) => void;
}

interface RecruiterFormInputs {
  displayName: string;
  phoneNumber: string;
  
  // Bedrijfsgegevens
  companyName: string;
  position: string;
  companyLogo: string;
  companyWebsite: string;
  companyDescription: string;
  
  // Adresgegevens
  companyStreet: string;
  companyHouseNumber: string;
  companyPostalCode: string;
  companyCity: string;
  kvkNumber: string;
  
  // Profielfoto
  profilePhoto: string;
}

// Gebruik localStorage om waarden permanent op te slaan
const getStoredFormData = (userId: string): Partial<RecruiterFormInputs> => {
  try {
    const storedData = localStorage.getItem(`recruiterForm_${userId}`);
    return storedData ? JSON.parse(storedData) : {};
  } catch (e) {
    console.error('Fout bij ophalen formuliergegevens uit localStorage:', e);
    return {};
  }
};

const saveFormData = (userId: string, data: Partial<RecruiterFormInputs>) => {
  try {
    localStorage.setItem(`recruiterForm_${userId}`, JSON.stringify(data));
  } catch (e) {
    console.error('Fout bij opslaan formuliergegevens in localStorage:', e);
  }
};

// Maak een formulierwaarden cache buiten de component
// om waardes tussen re-renders te behouden
const formCache: Partial<RecruiterFormInputs> = {};

const RecruiterProfileForm: React.FC<RecruiterProfileFormProps> = ({ 
  user, 
  onSuccess, 
  onError, 
  setLoading 
}) => {
  const [initialFormValues, setInitialFormValues] = useState<Partial<RecruiterFormInputs>>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>('');
  
  // Gebruik shouldUnregister: false om te voorkomen dat velden worden gereset
  const { register, handleSubmit, reset, formState: { errors }, setValue, getValues } = useForm<RecruiterFormInputs>({
    shouldUnregister: false,
    defaultValues: initialFormValues,
    mode: 'onChange'
  });
  
  // Update de cache wanneer een veld verandert
  const updateFieldCache = (field: keyof RecruiterFormInputs, value: string) => {
    formCache[field] = value;
    
    // Sla ook op in localStorage als de gebruiker een ID heeft
    if (user.id) {
      const currentData = getStoredFormData(user.id);
      saveFormData(user.id, { ...currentData, [field]: value });
    }
  };
  
  // Bepaal de initiële waarden voor het formulier
  useEffect(() => {
    if (!user || !user.id) return;
    
    const profile = user.profile as Record<string, any> || {};
    const storedData = user.id ? getStoredFormData(user.id) : {};
    
    // Als het formulier nog niet is verzonden, gebruik dan eerst de opgeslagen data
    const dataSource = isFormSubmitted ? {} : storedData;
    
    const initialValues: Partial<RecruiterFormInputs> = {
      // Gebruik eerst de cache of opgeslagen data, dan de user gegevens
      displayName: dataSource.displayName || formCache.displayName || user.displayName || '',
      phoneNumber: dataSource.phoneNumber || formCache.phoneNumber || user.phoneNumber || '',
      
      // Bedrijfsgegevens (kunnen op verschillende plaatsen staan)
      companyName: dataSource.companyName || formCache.companyName || user.companyName || profile.company || '',
      position: dataSource.position || formCache.position || profile.position || '',
      companyLogo: dataSource.companyLogo || formCache.companyLogo || profile.companyLogo || '',
      companyWebsite: dataSource.companyWebsite || formCache.companyWebsite || profile.companyWebsite || '',
      companyDescription: dataSource.companyDescription || formCache.companyDescription || profile.companyDescription || '',
      
      // Adresgegevens - gebruik eerst de cache, dan de user gegevens
      companyStreet: dataSource.companyStreet || formCache.companyStreet || user.companyStreet || '',
      companyHouseNumber: dataSource.companyHouseNumber || formCache.companyHouseNumber || user.companyHouseNumber || '',
      companyPostalCode: dataSource.companyPostalCode || formCache.companyPostalCode || user.companyPostalCode || '',
      companyCity: dataSource.companyCity || formCache.companyCity || user.companyCity || '',
      kvkNumber: dataSource.kvkNumber || formCache.kvkNumber || user.kvkNumber || profile.kvkNumber || '',
      
      // Profielfoto
      profilePhoto: dataSource.profilePhoto || formCache.profilePhoto || user.profilePhoto || profile.profilePhoto || '',
    };
    
    // Haal profielfoto op
    const photoURL = user.profilePhoto || user.photoURL || 
                    (user.profile && user.profile.profilePhoto ? user.profile.profilePhoto : '');
    
    if (photoURL) {
      console.log("Profielfoto URL gevonden:", photoURL);
      setProfilePhotoUrl(photoURL);
      initialValues.profilePhoto = photoURL;
    }
    
    // Update de initiële formulierwaarden
    setInitialFormValues(initialValues);
    
    // Reset het formulier met de nieuwe waarden
    reset(initialValues as RecruiterFormInputs);
    
    // Handmatig waarden instellen om er zeker van te zijn dat ze worden getoond
    Object.entries(initialValues).forEach(([key, value]) => {
      if (value) {
        setValue(key as keyof RecruiterFormInputs, value);
      }
    });
    
    // Als het formulier is verzonden, zet dit terug naar false na het resetten
    if (isFormSubmitted) {
      setIsFormSubmitted(false);
    }
    
    console.log('Formulier reset met waarden:', initialValues);
  }, [user, reset, setValue, isFormSubmitted]);
  
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
  
  const onSubmit = async (data: RecruiterFormInputs) => {
    try {
      setLoading(true);
      
      // Update de form cache met de huidige waarden
      Object.keys(data).forEach(key => {
        updateFieldCache(key as keyof RecruiterFormInputs, data[key as keyof RecruiterFormInputs]);
      });
      
      // Sla de volledige formuliergegevens op in localStorage
      if (user.id) {
        saveFormData(user.id, data);
      }
      
      // Creëer het geüpdatete gebruikersobject
      const updatedUser = {
        ...user,
        displayName: data.displayName,
        phoneNumber: data.phoneNumber,
        phone: data.phoneNumber, // Duplicaat voor compatibiliteit
        
        // Profielfoto
        profilePhoto: profilePhotoUrl || data.profilePhoto || '',
        photoURL: profilePhotoUrl || data.profilePhoto || '',
        
        // Bedrijfsgegevens op het hoofdobject voor backwards compatibiliteit
        companyName: data.companyName,
        companyStreet: data.companyStreet,
        companyHouseNumber: data.companyHouseNumber,
        companyPostalCode: data.companyPostalCode,
        companyCity: data.companyCity,
        kvkNumber: data.kvkNumber,
        
        // Adres als object - voor compatibiliteit
        address: {
          street: data.companyStreet,
          houseNumber: data.companyHouseNumber,
          postalCode: data.companyPostalCode,
          city: data.companyCity
        },
        
        // Update het profiel object
        profile: {
          ...(user.profile || {}),
          company: data.companyName,
          position: data.position,
          companyLogo: data.companyLogo,
          companyWebsite: data.companyWebsite,
          companyDescription: data.companyDescription,
          kvkNumber: data.kvkNumber,
          phoneNumber: data.phoneNumber, // Voeg ook toe aan het profile object
          phone: data.phoneNumber, // Voor compatibiliteit
          profilePhoto: profilePhotoUrl || data.profilePhoto || '',
          
          // Adresgegevens ook in het profile object
          address: {
            street: data.companyStreet,
            houseNumber: data.companyHouseNumber,
            postalCode: data.companyPostalCode,
            city: data.companyCity
          },
          
          // Directe adresvelden in het profile object
          companyStreet: data.companyStreet,
          companyHouseNumber: data.companyHouseNumber,
          companyPostalCode: data.companyPostalCode,
          companyCity: data.companyCity
        },
        
        updatedAt: serverTimestamp(),
      };
      
      // Sla op in Firestore
      if (!user.id) {
        throw new Error('Gebruiker ID is niet beschikbaar');
      }
      
      // Log wat er opgeslagen gaat worden voor debugging
      console.log('Gebruikersdata die wordt opgeslagen:', JSON.stringify(updatedUser, null, 2));
      
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, updatedUser);
      
      // Markeer het formulier als verzonden
      setIsFormSubmitted(true);
      
      // Reset niet het formulier na verzenden - laat het intact
      // Maar handmatig alle waarden nog eens instellen na korte vertraging
      // voor het geval ze door andere processen worden gereset
      setTimeout(() => {
        Object.entries(data).forEach(([key, value]) => {
          setValue(key as keyof RecruiterFormInputs, value);
        });
      }, 200);
      
      onSuccess();
    } catch (err) {
      console.error('Fout bij bijwerken profiel:', err);
      onError('Er is een fout opgetreden bij het opslaan van je profiel. Probeer het later opnieuw.');
    } finally {
      setLoading(false);
    }
  };
  
  // Wanneer een veld verandert, update de cache
  const handleFieldChange = (field: keyof RecruiterFormInputs) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateFieldCache(field, e.target.value);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Persoonlijke gegevens */}
      <div>
        <h2 className="text-lg font-medium mb-4">Persoonlijke gegevens</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Naam */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
            <input
              type="text"
              {...register('displayName', { required: "Naam is verplicht" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onChange={e => updateFieldCache('displayName', e.target.value)}
            />
            {errors.displayName && <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>}
          </div>
          
          {/* Telefoonnummer */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer</label>
            <input
              type="tel"
              {...register('phoneNumber')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="+31 6 12345678"
              onChange={e => updateFieldCache('phoneNumber', e.target.value)}
            />
          </div>
          
          {/* Profielfoto upload sectie */}
          <div className="mb-6 col-span-2">
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
        </div>
      </div>
      
      {/* Bedrijfsgegevens */}
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Bedrijfsgegevens</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrijfsnaam</label>
            <input
              type="text"
              {...register('companyName', { required: 'Bedrijfsnaam is verplicht' })}
              className={`w-full px-3 py-2 border rounded-md ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
              onChange={e => updateFieldCache('companyName', e.target.value)}
            />
            {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              {...register('companyWebsite')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="https://bedrijf.nl"
              onChange={e => updateFieldCache('companyWebsite', e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">KVK-nummer</label>
            <input
              type="text"
              {...register('kvkNumber')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onChange={e => updateFieldCache('kvkNumber', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Bedrijfsadres */}
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Bedrijfsadres</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Straat</label>
              <input
                type="text"
                {...register('companyStreet')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                onChange={e => updateFieldCache('companyStreet', e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Huisnummer</label>
              <input
                type="text"
                {...register('companyHouseNumber')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                onChange={e => updateFieldCache('companyHouseNumber', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
              <input
                type="text"
                {...register('companyPostalCode')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                onChange={e => updateFieldCache('companyPostalCode', e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Plaats</label>
              <input
                type="text"
                {...register('companyCity')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                onChange={e => updateFieldCache('companyCity', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bedrijfsinformatie */}
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Over het bedrijf</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
          <input
            type="url"
            {...register('companyLogo')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="https://bedrijf.nl/logo.png"
            onChange={e => updateFieldCache('companyLogo', e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-500">URL naar het bedrijfslogo voor op vacatures</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrijfsomschrijving</label>
          <textarea
            {...register('companyDescription')}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Vertel kandidaten meer over je bedrijf..."
            onChange={e => updateFieldCache('companyDescription', e.target.value)}
          />
        </div>
      </div>
      
      <div className="mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Profiel opslaan
        </button>
      </div>
    </form>
  );
};

export default RecruiterProfileForm; 