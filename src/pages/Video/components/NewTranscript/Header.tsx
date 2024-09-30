import {
  ContainerCard,
  EditorWithHighlight,
  LG,
  SM,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as InfoIcon } from 'src/assets/info-transcript.svg';
import styled from 'styled-components';

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

type Editor = React.ComponentProps<typeof EditorWithHighlight.Search>['editor'];

export const Header = ({ editor }: { editor: Editor }) => {
  const { t } = useTranslation();

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
        <EditorWithHighlight.Search editor={editor} />
      </div>
    </TranscriptHeader>
  );
};
