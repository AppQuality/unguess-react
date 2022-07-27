import { Paragraph } from '@appquality/unguess-design-system';
import styled from 'styled-components';

const StickyFullHeightContainer = styled.div`
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
`;

const HelpContainer = styled.div`
  padding: ${({ theme }) => theme.space.xl};
`;

export const ModalUseCaseHelp = () => (
  <StickyFullHeightContainer>
    <HelpContainer>
      <Paragraph>HELP</Paragraph>
    </HelpContainer>
  </StickyFullHeightContainer>
);
