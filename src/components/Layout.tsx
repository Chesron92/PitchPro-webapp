import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Layout.css';
import Header from './common/Header';
import Footer from './common/Footer';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />

      <main className="main-content">
        {children || <Outlet />}
      </main>

      <Footer />
    </div>
  );
};

export default Layout; 