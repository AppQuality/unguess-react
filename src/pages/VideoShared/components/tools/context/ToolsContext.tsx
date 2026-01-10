import { createContext, useContext, useMemo, useState } from 'react';

interface ToolsContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
  showSentiment: boolean;
  setShowSentiment: (showSentiment: boolean) => void;
}

const ToolsContext = createContext<ToolsContextType | null>(null);

export const ToolsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('');
  const [showSentiment, setShowSentiment] = useState<boolean>(true);

  const toolsContextValue = useMemo(
    () => ({
      language,
      setLanguage,
      isOpen,
      setIsOpen,
      showSentiment,
      setShowSentiment,
    }),
    [language, setLanguage, isOpen, setIsOpen, showSentiment, setShowSentiment]
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
