import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './common/Footer';
import { LayoutProvider } from '../contexts/LayoutContext';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutProvider isInsideLayout={true}>
      <div className="layout min-h-screen flex flex-col">
        <main className="main-content flex-grow">
          {children || <Outlet />}
        </main>

        <Footer />
      </div>
    </LayoutProvider>
  );
};

export default Layout; 