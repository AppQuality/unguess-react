import { createContext, useContext, useMemo, useState } from 'react';
import { FaceType } from './types';

type FlipCardContextType = {
  visibleFace: FaceType;
  setVisibleFace: (face: FaceType) => void;
  breakpoint: number;
};

export const Context = createContext<FlipCardContextType | null>(null);

export const ContextProvider = ({
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
    <Context.Provider value={flipCardContextValue}>{children}</Context.Provider>
  );
};

export const useFlipCardContext = () => {
  const context = useContext(Context);

  if (!context)
    throw new Error('Provider not found for FlipCardContextProvider');

  return context; // Now we can use the context in the component, SAFELY.
};
