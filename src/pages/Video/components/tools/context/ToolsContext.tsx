import { createContext, useContext, useMemo, useState } from 'react';

interface Lang {
  value: string;
  label: string;
}

interface ToolsContextType {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
  language: Lang | null;
  setLanguage: (lang: Lang) => void;
}

const ToolsContext = createContext<ToolsContextType | null>(null);

export const ToolsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeItem, setActiveItem] = useState<string | null>('menu');
  const [language, setLanguage] = useState<Lang | null>(null);

  const toolsContextValue = useMemo(
    () => ({
      activeItem,
      setActiveItem,
      language,
      setLanguage,
    }),
    [activeItem, setActiveItem, language, setLanguage]
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
