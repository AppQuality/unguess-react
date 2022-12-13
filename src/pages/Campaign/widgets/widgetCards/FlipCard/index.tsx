import styled from 'styled-components';
import { StyledSpecialCard } from '../common/StyledSpecialCard';
import { WidgetCardFooter } from '../common/WidgetCardFooter';
import { FlipCardBody } from './FlipCardBody';
import { FlipCardHeader } from './FlipCardHeader';
import { FlipCardContextProvider } from './context/FlipCardContext';

const FlipCardContainer = styled(StyledSpecialCard)<{ height?: string }>`
  height: ${({ height }) => height || 'auto'};
`;
interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  height?: string;
}

const FlipCard = ({ children, height, ...props }: FlipCardProps) => (
  <FlipCardContextProvider>
    <FlipCardContainer {...props} height={height}>
      {children}
    </FlipCardContainer>
  </FlipCardContextProvider>
);

FlipCard.Header = FlipCardHeader;
FlipCard.Footer = WidgetCardFooter;
FlipCard.Body = FlipCardBody;

export default FlipCard;
