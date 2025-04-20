import React from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8 p-6">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login; 