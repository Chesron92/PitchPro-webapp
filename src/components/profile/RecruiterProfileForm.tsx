import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { BaseUser } from '../../types/user';

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
}

const RecruiterProfileForm: React.FC<RecruiterProfileFormProps> = ({ 
  user, 
  onSuccess, 
  onError, 
  setLoading 
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RecruiterFormInputs>();
  
  // Bepaal de initiële waarden voor het formulier
  useEffect(() => {
    const profile = user.profile as Record<string, any> || {};
    
    const initialValues: Partial<RecruiterFormInputs> = {
      displayName: user.displayName || '',
      phoneNumber: user.phoneNumber || '',
      
      // Bedrijfsgegevens (kunnen op verschillende plaatsen staan)
      companyName: user.companyName || profile.company || '',
      position: profile.position || '',
      companyLogo: profile.companyLogo || '',
      companyWebsite: profile.companyWebsite || '',
      companyDescription: profile.companyDescription || '',
      
      // Adresgegevens
      companyStreet: user.companyStreet || '',
      companyHouseNumber: user.companyHouseNumber || '',
      companyPostalCode: user.companyPostalCode || '',
      companyCity: user.companyCity || '',
      kvkNumber: user.kvkNumber || profile.kvkNumber || '',
    };
    
    reset(initialValues as RecruiterFormInputs);
  }, [user, reset]);
  
  const onSubmit = async (data: RecruiterFormInputs) => {
    try {
      setLoading(true);
      
      // Creëer het geüpdatete gebruikersobject
      const updatedUser = {
        ...user,
        displayName: data.displayName,
        phoneNumber: data.phoneNumber,
        
        // Bedrijfsgegevens op het hoofdobject voor backwards compatibiliteit
        companyName: data.companyName,
        companyStreet: data.companyStreet,
        companyHouseNumber: data.companyHouseNumber,
        companyPostalCode: data.companyPostalCode,
        companyCity: data.companyCity,
        kvkNumber: data.kvkNumber,
        
        // Update het profiel object
        profile: {
          ...(user.profile || {}),
          company: data.companyName,
          position: data.position,
          companyLogo: data.companyLogo,
          companyWebsite: data.companyWebsite,
          companyDescription: data.companyDescription,
          kvkNumber: data.kvkNumber
        },
        
        // Update timestamp
        updatedAt: new Date()
      };
      
      // Sla op in Firestore
      if (!user.id) {
        throw new Error('Gebruiker ID is niet beschikbaar');
      }
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, updatedUser);
      
      onSuccess();
    } catch (err) {
      console.error('Fout bij bijwerken profiel:', err);
      onError('Er is een fout opgetreden bij het opslaan van je profiel. Probeer het later opnieuw.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Persoonlijke gegevens */}
        <div>
          <h2 className="text-lg font-medium mb-4">Persoonlijke gegevens</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Naam contactpersoon</label>
            <input
              type="text"
              {...register('displayName', { required: 'Naam is verplicht' })}
              className={`w-full px-3 py-2 border rounded-md ${errors.displayName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.displayName && <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Functie binnen bedrijf</label>
            <input
              type="text"
              {...register('position')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="bijv. HR Manager, Recruiter"
            />
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
        
        {/* Bedrijfsgegevens */}
        <div>
          <h2 className="text-lg font-medium mb-4">Bedrijfsgegevens</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrijfsnaam</label>
            <input
              type="text"
              {...register('companyName', { required: 'Bedrijfsnaam is verplicht' })}
              className={`w-full px-3 py-2 border rounded-md ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
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
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">KVK-nummer</label>
            <input
              type="text"
              {...register('kvkNumber')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Huisnummer</label>
              <input
                type="text"
                {...register('companyHouseNumber')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Plaats</label>
              <input
                type="text"
                {...register('companyCity')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
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