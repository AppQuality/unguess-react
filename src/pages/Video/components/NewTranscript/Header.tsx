import {
  ContainerCard,
  LG,
  SM,
  Separator,
  Transcript,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as InfoIcon } from 'src/assets/info-transcript.svg';
import { FEATURE_FLAG_AI_TRANSLATION } from 'src/constants';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { Tools } from '../tools';

export const StyledContainerCard = styled(ContainerCard)`
  margin: ${({ theme }) => theme.space.xl} 0;
  padding: ${({ theme }) => theme.space.xl};
  gap: ${({ theme }) => theme.space.sm};
`;

export const TranscriptHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.space.xl};
  z-index: 200;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.space.xs};
`;

const IconTitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.xxs};
`;

type Editor = React.ComponentProps<typeof Transcript.Search>['editor'];

export const Header = ({ editor }: { editor: Editor }) => {
  const { t } = useTranslation();

  const { hasFeatureFlag } = useFeatureFlag();

  return (
    <TranscriptHeader>
      <TitleWrapper>
        <IconTitleContainer>
          <InfoIcon />
          <LG color={appTheme.palette.grey[800]} isBold>
            {t('__VIDEO_PAGE_TRANSCRIPT_TITLE')}
          </LG>
        </IconTitleContainer>
        <SM>{t('__VIDEO_PAGE_TRANSCRIPT_INFO')}</SM>
      </TitleWrapper>
      <div>
        <Transcript.Search editor={editor} />
      </div>
      {hasFeatureFlag(FEATURE_FLAG_AI_TRANSLATION) && (
        <>
          <Separator />
          <Tools />
        </>
      )}
    </TranscriptHeader>
  );
};
