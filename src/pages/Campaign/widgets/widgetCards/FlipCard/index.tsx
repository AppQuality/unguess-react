import React from 'react';
import { StyledSpecialCard } from '../common/StyledSpecialCard';
import { WidgetCardFooter } from '../common/WidgetCardFooter';
import { FlipCardHeader } from './FlipCardHeader';
import { FlipCardBody } from './FlipCardBody';
import { FaceType, FlipCardBodyProps, FlipCardHeaderProps } from './types';

const FlipCard = ({
  children,
  firstVisible = 'front',
}: {
  children?: React.ReactNode;
  firstVisible?: FaceType;
}) => {
  const [visibleFace, setVisibleFace] = React.useState<FaceType>(firstVisible);
  const cardChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;
    if (
      typeof child.type !== 'string' &&
      child.type.name === 'FlipCardHeader'
    ) {
      const el = React.cloneElement<FlipCardHeaderProps>(
        child as React.ReactElement,
        {
          visibleFace,
          setVisibleFace,
        }
      );
      return el;
    }
    if (typeof child.type !== 'string' && child.type.name === 'FlipCardBody') {
      const el = React.cloneElement<FlipCardBodyProps>(
        child as React.ReactElement,
        {
          visibleFace,
        }
      );
      return el;
    }
    return child;
  });

  return <StyledSpecialCard>{cardChildren}</StyledSpecialCard>;
};

FlipCard.Header = FlipCardHeader;
FlipCard.Footer = WidgetCardFooter;
FlipCard.Body = FlipCardBody;
export default FlipCard;
