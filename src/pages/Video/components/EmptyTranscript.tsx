import { SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as EmptyTranscriptImage } from 'src/assets/empty-transcript.svg';
import styled from 'styled-components';

const EmptyTranscriptContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: ${({ theme }) => theme.space.md};
  position: relative;
`;

const StyledParagraph = styled(SM)`
  text-align: center;
  margin-left: ${({ theme }) => theme.space.lg};
  color: ${({ theme }) => theme.palette.grey[700]};
  bottom: ${({ theme }) => theme.space.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;
const ImageContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EmptyTranscript = () => {
  const { t } = useTranslation();
  return (
    <EmptyTranscriptContainer>
      <ImageContainer>
        <EmptyTranscriptImage />
        <StyledParagraph>
          {t('__VIDEO_PAGE_TRANSCRIPT_EMPTY_STATE')}
        </StyledParagraph>
      </ImageContainer>
    </EmptyTranscriptContainer>
  );
};
