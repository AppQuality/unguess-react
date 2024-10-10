import { createContext, useContext, useMemo, useState } from 'react';
import { usePreferredLanguage } from '../usePreferredLanguage';

interface ToolsContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const ToolsContext = createContext<ToolsContextType | null>(null);

export const ToolsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const preferredLanguage = usePreferredLanguage();
  const [language, setLanguage] = useState<string>(preferredLanguage || '');

  const toolsContextValue = useMemo(
    () => ({
      language,
      setLanguage,
      isOpen,
      setIsOpen,
    }),
    [language, setLanguage, isOpen, setIsOpen]
  );

  return (
    <ToolsContext.Provider value={toolsContextValue}>
      {children}
    </ToolsContext.Provider>
  );
};

export const useToolsContext = () => {
  const context = useContext(ToolsContext);

  if (!context) throw new Error('Provider not found for ToolsContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
