import React, { createContext, useContext, ReactNode } from 'react';

interface LayoutContextType {
  /**
   * Geeft aan of de huidige component zich in een Layout bevindt
   */
  isInsideLayout: boolean;
}

// Standaardwaarde voor de context
const defaultValue: LayoutContextType = {
  isInsideLayout: false,
};

// Creëer de context
export const LayoutContext = createContext<LayoutContextType>(defaultValue);

/**
 * Custom hook om makkelijk toegang te krijgen tot de LayoutContext
 */
export const useLayout = () => useContext(LayoutContext);

interface LayoutProviderProps {
  children: ReactNode;
  /**
   * Geeft aan of de huidige component zich in een Layout bevindt
   */
  isInsideLayout?: boolean;
}

/**
 * Provider component voor de LayoutContext
 */
export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  isInsideLayout = true,
}) => {
  return (
    <LayoutContext.Provider value={{ isInsideLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}; 