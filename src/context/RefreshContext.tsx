import React, {createContext, useState, useContext} from 'react';

interface RefreshContextType {
  refresh: boolean;
  triggerRefresh: () => void;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export const RefreshProvider: React.FC = ({children}) => {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <RefreshContext.Provider value={{refresh, triggerRefresh}}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return context;
};
