import { createContext, useContext, useMemo, useState } from 'react';

interface PublicManualContextType {
  password: string;
  setPassword: (password: string) => void;
  token: string;
  setToken: (token: string) => void;
}

const PublicManualContext = createContext<PublicManualContextType | null>(null);
export const PublicManualContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [password, setPassword] = useState<string>(
    localStorage.getItem('manualPassword') || ''
  );
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') || ''
  );

  const publicManualContextValue = useMemo(
    () => ({
      password,
      setPassword: (newPass: string) => {
        localStorage.setItem('manualPassword', newPass);
        setPassword(newPass);
      },
      token,
      setToken: (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
      },
    }),
    [password, setPassword, token, setToken]
  );

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
