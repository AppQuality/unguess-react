import { createContext } from 'react';
import { FaceType, FlipCardContextType } from './types';

export const FlipCardContext: FlipCardContextType = createContext({
  visibleFace: 'front' as FaceType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setVisibleFace: (face: FaceType) => {},
});
