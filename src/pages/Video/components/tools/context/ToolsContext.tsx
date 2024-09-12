import { createContext, useContext, useMemo, useState } from 'react';

interface ToolsContextType {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const ToolsContext = createContext<ToolsContextType | null>(null);

export const ToolsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeItem, setActiveItem] = useState<string>('menu');

  const toolsContextValue = useMemo(
    () => ({
      activeItem,
      setActiveItem,
    }),
    [activeItem, setActiveItem]
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
