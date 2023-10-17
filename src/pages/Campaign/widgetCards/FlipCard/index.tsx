import styled from 'styled-components';
import { WidgetSpecialCard } from '../common/StyledSpecialCard';
import { WidgetCardFooter } from '../common/WidgetCardFooter';
import { FlipCardBody } from './FlipCardBody';
import { FlipCardHeader } from './FlipCardHeader';
import { FlipCardContextProvider } from './context/FlipCardContext';

const FlipCardContainer = styled(WidgetSpecialCard)<{ height?: string }>`
  height: ${({ height }) => height || 'auto'};
  container-type: inline-size;
  container-name: flip-card;
`;

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  height?: string;
  activateSwitchFromBreakpoint?: number;
}

const FlipCard = ({
  children,
  height,
  activateSwitchFromBreakpoint,
  ...props
}: FlipCardProps) => (
  <FlipCardContextProvider breakpoint={activateSwitchFromBreakpoint || 500}>
    <FlipCardContainer {...props} height={height}>
      {children}
    </FlipCardContainer>
  </FlipCardContextProvider>
);

FlipCard.Header = FlipCardHeader;
FlipCard.Footer = WidgetCardFooter;
FlipCard.Body = FlipCardBody;

export default FlipCard;
