import { createContext, useContext, useMemo, useState } from 'react';

type BugAccordions = 'details' | 'duplicates';

interface BugPreviewContextType {
  openAccordions: BugAccordions[];
  setOpenAccordions: (accordions: BugAccordions[]) => void;
}

const BugPreviewContext = createContext<BugPreviewContextType | null>(null);

export const BugPreviewContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openAccordions, setOpenAccordions] = useState<BugAccordions[]>([]);

  const bugPreviewContextValue = useMemo(
    () => ({
      openAccordions,
      setOpenAccordions,
    }),
    [openAccordions, setOpenAccordions]
  );

  return (
    <BugPreviewContext.Provider value={bugPreviewContextValue}>
      {children}
    </BugPreviewContext.Provider>
  );
};

export const useBugPreviewContext = () => {
  const context = useContext(BugPreviewContext);

  if (!context)
    throw new Error('Provider not found for BugPreviewContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
