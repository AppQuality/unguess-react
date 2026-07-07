export type FlipCardContextType = {
  visibleFace: FaceType;
  setVisibleFace: (face: FaceType) => void;
  breakpoint: number;
};

export interface FlipCardHeaderProps {
  children: React.ReactNode;
  setVisibleFace?: (face: FaceType) => void;
  visibleFace?: FaceType;
  hasBack?: boolean;
}

export type FaceType = 'front' | 'back';

export interface FlipCardBodyProps {
  front: React.ReactNode;
  back?: React.ReactNode;
  height?: string;
  visibleFace?: FaceType;
}
