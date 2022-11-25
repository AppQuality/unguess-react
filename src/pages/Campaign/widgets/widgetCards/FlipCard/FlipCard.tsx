import { useMemo, useState } from 'react';
import { StyledSpecialCard } from '../common/StyledSpecialCard';
import { WidgetCardFooter } from '../common/WidgetCardFooter';
import { FlipCardBody } from './FlipCardBody';
import { FlipCardHeader } from './FlipCardHeader';
import { FlipCardContext } from '.';
import { FaceType } from './types';

const FlipCard = ({
  children,
  firstVisible = 'front',
}: {
  children?: React.ReactNode;
  firstVisible?: FaceType;
}) => {
  const [visibleFace, setVisibleFace] = useState<FaceType>(firstVisible);

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
