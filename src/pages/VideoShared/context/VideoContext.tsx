import { createContext, useContext, useMemo, useState } from 'react';

type VideoAccordion = {
  id: number;
};

interface VideoContextType {
  openAccordion: VideoAccordion | undefined;
  setOpenAccordion: (accordion?: VideoAccordion) => void;
}

const VideoContext = createContext<VideoContextType | null>(null);

export const VideoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openAccordion, setOpenAccordion] = useState<VideoAccordion>();

  const videoContextValue = useMemo(
    () => ({
      openAccordion,
      setOpenAccordion,
    }),
    [openAccordion, setOpenAccordion]
  );

  return (
    <VideoContext.Provider value={videoContextValue}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);

  if (!context) throw new Error('Provider not found for VideoContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
