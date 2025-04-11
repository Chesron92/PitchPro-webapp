import React, { ReactNode } from 'react';
import Header from './common/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-4 sm:p-6 md:p-8 mt-16">
        {children}
      </main>
      <footer className="bg-white py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} PitchPro. Alle rechten voorbehouden.
        </div>
      </footer>
    </div>
  );
};

export default Layout; 