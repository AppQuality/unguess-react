import { createContext, useContext, useMemo, useState } from 'react';
import { appTheme } from 'src/app/theme';
import { isMinMedia } from 'src/common/utils';
import useWindowSize from 'src/hooks/useWindowSize';
import { FaceType, FlipCardContextType } from '../types';

export const FlipCardContext = createContext<FlipCardContextType | null>(null);

export const FlipCardContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { width } = useWindowSize();
  const breakpointMd = parseInt(appTheme.breakpoints.lg, 10);

  const isDesktop = isMinMedia(appTheme.breakpoints.lg);
  const [visibleFace, setVisibleFace] = useState<FaceType>(
    isDesktop ? 'front' : 'back'
  );

  const flipCardContextValue = useMemo(() => {
    if (width < breakpointMd) {
      setVisibleFace('back');
    }
    return {
      visibleFace,
      setVisibleFace,
      width,
    };
  }, [visibleFace, setVisibleFace, width]);

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
