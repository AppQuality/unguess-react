import { Highlight, SM } from '@appquality/unguess-design-system';
import { styled } from 'styled-components';

const StyledParagraphContainer = styled.div`
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.base * 4}px`};
  border-left: ${({ theme }) => `2px solid ${theme.palette.grey[500]}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

const TranscriptParagraph = ({
  words,
  startTime,
  endTime,
}: {
  words: string;
  startTime: string;
  endTime: string;
}) => (
  <StyledParagraphContainer>
    <SM>
      {startTime} - {endTime}
    </SM>
    <Highlight />
  </StyledParagraphContainer>
);
export { TranscriptParagraph };
