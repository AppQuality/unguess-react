import { createContext, useContext, useMemo, useState } from 'react';

interface ToolsContextType {
  activeItem: string;
  setActiveItem: (item: string) => void;
  referenceElement: HTMLButtonElement | null;
  setReferenceElement: (element: HTMLButtonElement | null) => void;
  mediaId: string;
}

const ToolsContext = createContext<ToolsContextType | null>(null);

export const ToolsContextProvider = ({
  mediaId,
  children,
}: {
  mediaId: string;
  children: React.ReactNode;
}) => {
  const [activeItem, setActiveItem] = useState<string>('menu');
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);

  const toolsContextValue = useMemo(
    () => ({
      activeItem,
      setActiveItem,
      referenceElement,
      setReferenceElement,
      mediaId,
    }),
    [activeItem, setActiveItem, referenceElement, setReferenceElement, mediaId]
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
