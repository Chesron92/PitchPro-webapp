import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-primary-600 mb-2">PitchPro</h1>
          <p className="text-gray-600">Het platform voor werkzoekenden en recruiters</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login; 