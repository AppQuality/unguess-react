import styled from 'styled-components';
import { WidgetSpecialCard } from '../common/StyledSpecialCard';
import { WidgetCardFooter } from '../common/WidgetCardFooter';
import { FlipCardBody } from './FlipCardBody';
import { FlipCardHeader } from './FlipCardHeader';
import { ContextProvider } from './context';

const StyledSpecialCard = styled(WidgetSpecialCard)<{ height?: string }>`
  height: ${({ height }) => height || 'auto'};
  container-type: inline-size;
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
  <ContextProvider breakpoint={activateSwitchFromBreakpoint || 500}>
    <StyledSpecialCard {...props} height={height}>
      {children}
    </StyledSpecialCard>
  </ContextProvider>
);

FlipCard.Header = FlipCardHeader;
FlipCard.Footer = WidgetCardFooter;
FlipCard.Body = FlipCardBody;

export default FlipCard;
