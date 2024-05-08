import styled from 'styled-components';
import { ReactComponent as EmptyTranscriptImage } from 'src/assets/empty-transcript.svg';
import { Paragraph } from '@appquality/unguess-design-system';

const EmptyTranscriptContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: ${({ theme }) => theme.space.md};
  position: relative;
`;

const StyledParagraph = styled(Paragraph)`
  text-align: center;
  color: ${({ theme }) => theme.palette.grey[700]};
  bottom: ${({ theme }) => theme.space.xxl};
`;

export const EmptyTranscript = () => (
  <EmptyTranscriptContainer>
    <EmptyTranscriptImage />
    <StyledParagraph>
      Per questo video non è disponibile una trascrizione.
    </StyledParagraph>
  </EmptyTranscriptContainer>
);
