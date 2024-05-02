import { createContext, useContext, useMemo, useState } from 'react';

interface VideoContextType {
  openAccordions: { [key: number]: boolean }[];
  setOpenAccordions: (accordions: { [key: number]: boolean }[]) => void;
}

const videoContext = createContext<VideoContextType | null>(null);

export const VideoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openAccordions, setOpenAccordions] = useState<
    { [key: number]: boolean }[]
  >([]);

  const videoContextValue = useMemo(
    () => ({
      openAccordions,
      setOpenAccordions,
    }),
    [openAccordions, setOpenAccordions]
  );

  return (
    <videoContext.Provider value={videoContextValue}>
      {children}
    </videoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(videoContext);

  if (!context)
    throw new Error('Provider not found for BugPreviewContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
