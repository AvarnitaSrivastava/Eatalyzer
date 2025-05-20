import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  subscription: string;
  setSubscription: (subscription: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<string>('free');
  return (
    <AppContext.Provider value={{ subscription, setSubscription }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};