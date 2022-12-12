import styled from 'styled-components';
import { StyledSpecialCard } from '../common/StyledSpecialCard';
import { WidgetCardFooter } from '../common/WidgetCardFooter';
import { FlipCardBody } from './FlipCardBody';
import { FlipCardHeader } from './FlipCardHeader';
import { FlipCardContextProvider } from './context/FlipCardContext';

const FlipCardContainer = styled(StyledSpecialCard)<{ height?: string }>`
  height: ${({ height }) => height || 'auto'};
`;

const FlipCard = ({
  children,
  height,
  className,
}: {
  children?: React.ReactNode;
  height?: string;
  className?: string;
}) => (
  <FlipCardContextProvider>
    <FlipCardContainer {...{ className }} height={height}>
      {children}
    </FlipCardContainer>
  </FlipCardContextProvider>
);

FlipCard.Header = FlipCardHeader;
FlipCard.Footer = WidgetCardFooter;
FlipCard.Body = FlipCardBody;

export default FlipCard;
