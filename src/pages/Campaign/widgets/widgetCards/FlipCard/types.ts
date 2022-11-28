export type FlipCardContextType = {
  visibleFace: FaceType;
  setVisibleFace: (face: FaceType) => void;
};

export interface FlipCardHeaderProps {
  children: React.ReactNode;
  setVisibleFace?: (face: FaceType) => void;
  visibleFace?: FaceType;
}

export type FaceType = 'front' | 'back';

export interface FlipCardBodyProps {
  front: React.ReactNode;
  back: React.ReactNode;
  height?: string;
  visibleFace?: FaceType;
}
