import { useMemo, useState } from 'react';
import { StyledSpecialCard } from '../common/StyledSpecialCard';
import { WidgetCardFooter } from '../common/WidgetCardFooter';
import { FlipCardBody } from './FlipCardBody';
import { FlipCardHeader } from './FlipCardHeader';
import { FlipCardContext } from './FlipCardContext';
import { FaceType } from './types';

const FlipCard = ({ children }: { children?: React.ReactNode }) => {
  const [visibleFace, setVisibleFace] = useState<FaceType>('front');

  const flipCardContextValue = useMemo(
    () => ({
      visibleFace,
      setVisibleFace,
    }),
    [visibleFace, setVisibleFace]
  );

  return (
    <FlipCardContext.Provider value={flipCardContextValue}>
      <StyledSpecialCard>{children}</StyledSpecialCard>
    </FlipCardContext.Provider>
  );
};

FlipCard.Header = FlipCardHeader;
FlipCard.Footer = WidgetCardFooter;
FlipCard.Body = FlipCardBody;

export default FlipCard;
