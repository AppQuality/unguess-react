import { createContext, useContext, useMemo, useState } from 'react';
import { FaceType, FlipCardContextType } from '../types';

export const FlipCardContext = createContext<FlipCardContextType | null>(null);

export const FlipCardContextProvider = ({
  children,
  breakpoint,
}: {
  children: React.ReactNode;
  breakpoint: number;
}) => {
  const [visibleFace, setVisibleFace] = useState<FaceType>('front');

  const flipCardContextValue = useMemo(
    () => ({
      visibleFace,
      setVisibleFace,
      breakpoint,
    }),
    [visibleFace, setVisibleFace]
  );

  return (
    <FlipCardContext.Provider value={flipCardContextValue}>
      {children}
    </FlipCardContext.Provider>
  );
};

export const useFlipCardContext = () => {
  const context = useContext(FlipCardContext);

  if (!context)
    throw new Error('Provider not found for FlipCardContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
