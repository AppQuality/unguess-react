import { createContext, useContext, useMemo, useState } from 'react';

interface PublicManualContextType {
  password: string;
  setPassword: (password: string) => void;
  token: string;
  setToken: (token: string) => void;
  getCpId: () => string;
  userData: { name: string; value: string }[];
  setUserData: (userData: { name: string; value: string }[]) => void;
}

const PublicManualContext = createContext<PublicManualContextType | null>(null);
export const PublicManualContextProvider = ({
  cpId,
  children,
}: {
  cpId: string;
  children: React.ReactNode;
}) => {
  const [password, setPassword] = useState<string>(
    localStorage.getItem(`manualPassword_${cpId}`) || ''
  );
  const [token, setToken] = useState<string>(
    localStorage.getItem(`token_${cpId}`) || ''
  );
  const [userData, setUserData] = useState<string>(
    localStorage.getItem(`userdata_${cpId}`) || ''
  );

  const publicManualContextValue = useMemo(() => {
    let userDataObj = [];
    try {
      userDataObj = JSON.parse(userData);
    } catch (e) {
      userDataObj = [];
    }
    return {
      getCpId: () => cpId,
      password,
      setPassword: (newPass: string) => {
        localStorage.setItem(`manualPassword_${cpId}`, newPass);
        setPassword(newPass);
      },
      token,
      setToken: (newToken: string) => {
        localStorage.setItem(`token_${cpId}`, newToken);
        setToken(newToken);
      },
      userData: userDataObj,
      setUserData: (newUserData: { name: string; value: string }[]) => {
        localStorage.setItem(`userdata_${cpId}`, JSON.stringify(newUserData));
        setUserData(JSON.stringify(newUserData));
      },
    };
  }, [password, setPassword, token, setToken]);

  return (
    <PublicManualContext.Provider value={publicManualContextValue}>
      {children}
    </PublicManualContext.Provider>
  );
};

export const usePublicManualContext = () => {
  const context = useContext(PublicManualContext);

  if (!context)
    throw new Error('Provider not found for BugPreviewContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
