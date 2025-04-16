import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/user';

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  role: UserRole;
}

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>({
    defaultValues: {
      role: 'werkzoekende'
    }
  });
  
  const { register: registerUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const password = watch('password');

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      setError(null);
      setLoading(true);
      
      if (data.password !== data.confirmPassword) {
        setError('Wachtwoorden komen niet overeen');
        return;
      }
      
      await registerUser(data.email, data.password, data.displayName, data.role);
      // Navigatie gebeurt in de App component gebaseerd op AuthContext
    } catch (err: any) {
      console.error('Registratie fout:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Dit e-mailadres is al in gebruik');
      } else {
        setError('Registratie mislukt. Probeer het later opnieuw.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Registreren</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
            Naam
          </label>
          <input
            id="displayName"
            type="text"
            {...register('displayName', { 
              required: 'Naam is verplicht',
              minLength: {
                value: 2,
                message: 'Naam moet minimaal 2 tekens bevatten'
              }
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.displayName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.displayName && (
            <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>
          )}
        </div>
        
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
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Bevestig wachtwoord
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', { 
              required: 'Bevestig je wachtwoord',
              validate: value => value === password || 'Wachtwoorden komen niet overeen'
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ik ben een</label>
          <div className="mt-2 flex space-x-4">
            <div className="flex items-center">
              <input
                id="werkzoekende"
                type="radio"
                value="werkzoekende"
                {...register('role')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <label htmlFor="werkzoekende" className="ml-2 block text-sm text-gray-700">
                Werkzoekende
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="recruiter"
                type="radio"
                value="recruiter"
                {...register('role')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <label htmlFor="recruiter" className="ml-2 block text-sm text-gray-700">
                Recruiter
              </label>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {loading ? 'Registreren...' : 'Registreren'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Heb je al een account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Log hier in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm; 