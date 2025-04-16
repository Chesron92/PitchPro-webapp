import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugMode, setDebugMode] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setError(null);
      setLoading(true);
      await login(data.email, data.password);
      // Navigatie gebeurt in de App component gebaseerd op AuthContext
    } catch (err: any) {
      console.error('Inloggen mislukt:', err);
      
      // Betere foutafhandeling met specifieke berichten voor verschillende fouten
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Inloggen mislukt. Controleer je e-mail en wachtwoord.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Te veel inlogpogingen. Probeer het later opnieuw of reset je wachtwoord.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Netwerkprobleem. Controleer je internetverbinding en probeer het opnieuw.');
      } else if (err.code === 'auth/user-disabled') {
        setError('Dit account is uitgeschakeld. Neem contact op met de beheerder.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Ongeldig e-mailadres. Controleer je e-mail en probeer het opnieuw.');
      } else {
        setError(`Inloggen mislukt: ${err.message || 'Onbekende fout'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Debug functie om een test gebruiker aan te maken
  const createTestUser = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const testEmail = 'test@example.com';
      const testPassword = 'test123456';
      const testDisplayName = 'Test Gebruiker';
      
      console.log('Test gebruiker aanmaken:', testEmail);
      
      // Maak een test gebruiker aan
      const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
      const user = userCredential.user;
      
      // Update de gebruiker met displayName
      await updateProfile(user, { displayName: testDisplayName });
      
      // Sla het gebruikersprofiel op in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      
      await setDoc(userDocRef, {
        id: user.uid,
        email: testEmail,
        displayName: testDisplayName,
        role: 'werkzoekende',
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: {
          skills: []
        }
      });
      
      console.log('Test gebruiker aangemaakt:', user.uid);
      
      // Vul de formulierinvoervelden in
      setValue('email', testEmail);
      setValue('password', testPassword);
      
      alert('Test gebruiker aangemaakt! Email: test@example.com, Wachtwoord: test123456');
    } catch (err: any) {
      console.error('Fout bij aanmaken test gebruiker:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Deze test gebruiker bestaat al, je kunt proberen in te loggen met email: test@example.com, wachtwoord: test123456');
      } else {
        setError('Kon test gebruiker niet aanmaken: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Inloggen</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            {...register('email', { 
              required: 'E-mail is verplicht',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Voer een geldig e-mailadres in'
              }
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Wachtwoord
          </label>
          <input
            id="password"
            type="password"
            {...register('password', { 
              required: 'Wachtwoord is verplicht',
              minLength: {
                value: 6,
                message: 'Wachtwoord moet minimaal 6 tekens bevatten'
              }
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Onthoud mij
            </label>
          </div>

          <div className="text-sm">
            <Link to="/reset-password" className="font-medium text-primary-600 hover:text-primary-500">
              Wachtwoord vergeten?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {loading ? 'Inloggen...' : 'Inloggen'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Nog geen account?{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
            Registreer hier
          </Link>
        </p>
      </div>

      {/* Debug mode toggle */}
      <div className="mt-6 text-center">
        <button 
          type="button" 
          onClick={() => setDebugMode(!debugMode)}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          {debugMode ? 'Debug mode verbergen' : 'Debug opties'}
        </button>
      </div>
      
      {debugMode && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <h3 className="font-medium text-sm mb-2">Debug opties</h3>
          <button
            type="button"
            onClick={createTestUser}
            disabled={loading}
            className="w-full text-sm py-1 px-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
          >
            Test gebruiker aanmaken
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Dit maakt een test gebruiker aan met email: test@example.com en wachtwoord: test123456
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm; 