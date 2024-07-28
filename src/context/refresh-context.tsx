import { createContext, useContext, useState } from 'react';

interface RefreshContextType {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const RefreshContext = createContext<RefreshContextType>({
  refresh: false,
  setRefresh: () => { }
});

export const useRefresh = () => useContext(RefreshContext);

export const RefreshProvider = ({ children }: any) => {
  const [refresh, setRefresh] = useState(false);
  return (
    <RefreshContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
}