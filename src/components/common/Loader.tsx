import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium', 
  color = '#3B82F6' // Standaard blauw
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'w-5 h-5';
      case 'large':
        return 'w-12 h-12';
      default:
        return 'w-8 h-8';
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${getSizeClass()} border-4 border-t-transparent rounded-full animate-spin`}
        style={{ borderColor: `${color} transparent transparent transparent` }}
        role="status"
        aria-label="Laden..."
      />
      <span className="sr-only">Laden...</span>
    </div>
  );
};

export default Loader; 