import { LG, SM } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EmptyTranscriptImage } from 'src/assets/empty-transcript.svg';
import {
  StyledContainerCard,
  TitleWrapper,
  TranscriptHeader,
} from './Transcript';

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
  align-items: flex-start;
`;

export const EmptyTranscript = () => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: `0 ${appTheme.space.xxl}` }}>
      <StyledContainerCard>
        <TranscriptHeader>
          <TitleWrapper>
            <LG isBold>{t('__VIDEO_PAGE_TRANSCRIPT_TITLE')}</LG>
            <SM>{t('__VIDEO_PAGE_TRANSCRIPT_INFO')}</SM>
          </TitleWrapper>
        </TranscriptHeader>
        <EmptyTranscriptContainer>
          <ImageContainer>
            <EmptyTranscriptImage />
            <StyledParagraph>
              {t('__VIDEO_PAGE_TRANSCRIPT_EMPTY_STATE')}
            </StyledParagraph>
          </ImageContainer>
        </EmptyTranscriptContainer>
      </StyledContainerCard>
    </div>
  );
};
