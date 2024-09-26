import { createContext, useContext, useMemo, useState } from 'react';

interface ToolsContextType {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
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
  const [activeItem, setActiveItem] = useState<string | null>('translate');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('');

  const toolsContextValue = useMemo(
    () => ({
      activeItem,
      setActiveItem,
      language,
      setLanguage,
      isOpen,
      setIsOpen,
    }),
    [activeItem, setActiveItem, language, setLanguage, isOpen, setIsOpen]
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
