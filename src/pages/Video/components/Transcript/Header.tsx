import { SM, Transcript, XL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { FEATURE_FLAG_AI_TRANSLATION } from 'src/constants';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { Tools } from '../tools';
import { TranslationLoader } from './TranslationLoader';

export const TranscriptHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.md};
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

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction:row
  align-items: center;
  justify-content: space-between;
`;

type Editor = React.ComponentProps<typeof Transcript.Search>['editor'];

export const Header = ({
  editor,
  isEmpty,
}: {
  editor?: Editor;
  isEmpty?: boolean;
}) => {
  const { t } = useTranslation();
  const { hasFeatureFlag } = useFeatureFlag();
  return (
    <TranscriptHeader>
      <TitleWrapper>
        <IconTitleContainer>
          <XL color={appTheme.palette.grey[800]} isBold>
            {t('__VIDEO_PAGE_TRANSCRIPT_TITLE')}
          </XL>
        </IconTitleContainer>
        <SM color={appTheme.palette.grey[700]}>
          {t('__VIDEO_PAGE_TRANSCRIPT_INFO')}
        </SM>
      </TitleWrapper>
      {editor && !isEmpty ? (
        <ActionsWrapper>
          <div>
            <Transcript.Search editor={editor} />
          </div>
          {hasFeatureFlag(FEATURE_FLAG_AI_TRANSLATION) && <Tools />}
        </ActionsWrapper>
      ) : null}
      <TranslationLoader />
    </TranscriptHeader>
  );
};
