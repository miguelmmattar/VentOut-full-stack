import { createContext, useMemo } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [userData, setUserData] = useLocalStorage('userData', {});

  const userDataProviderValue = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

  return (
    <UserContext.Provider value={userDataProviderValue}>
      {children}
    </UserContext.Provider>
  );
}
