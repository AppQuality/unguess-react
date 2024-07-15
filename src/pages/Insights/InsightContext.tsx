import { createContext, useContext, useMemo, useState } from 'react';

interface InsightContextType {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

const InsightContext = createContext<InsightContextType | null>(null);

export const InsightContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const InsightContextValue = useMemo(
    () => ({
      isDrawerOpen,
      setIsDrawerOpen,
    }),
    [isDrawerOpen, setIsDrawerOpen]
  );

  return (
    <InsightContext.Provider value={InsightContextValue}>
      {children}
    </InsightContext.Provider>
  );
};

export const useInsightContext = () => {
  const context = useContext(InsightContext);

  if (!context)
    throw new Error('Provider not found for InsightContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
