import { StyledSpecialCard } from '../common/StyledSpecialCard';
import { WidgetCardFooter } from '../common/WidgetCardFooter';
import { FlipCardBody } from './FlipCardBody';
import { FlipCardHeader } from './FlipCardHeader';
import { FlipCardContextProvider } from './context/FlipCardContext';

const FlipCard = ({ children }: { children?: React.ReactNode }) => (
  <FlipCardContextProvider>
    <StyledSpecialCard>{children}</StyledSpecialCard>
  </FlipCardContextProvider>
);

FlipCard.Header = FlipCardHeader;
FlipCard.Footer = WidgetCardFooter;
FlipCard.Body = FlipCardBody;

export default FlipCard;
