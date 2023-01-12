import { LG, Tabs } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Bug as BugType, BugMedia as BugMediaType } from 'src/features/api';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import BugMedia from './Media';
import BugExtra from './Extra';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin: ${({ theme }) => theme.space.lg} 0;
`;

const StyledTabs = styled(Tabs)`
  width: 100%;

  > button {
    width: 50%;
  }
`;

export default ({
  bug,
}: {
  bug: BugType & {
    reporter: {
      tester_id: number;
      name: string;
    };
    media?: BugMediaType[];
  };
}) => {
  const { t } = useTranslation();

  const { media } = bug;

  if (!media || media.length === 0) return null;

  // Get all the media that are not of type "other"
  const mediaItems = media?.filter((m) => m.type.type !== 'other');

  // Get all the media that are of type "other"
  const extraItems = media?.filter((m) => m.type.type === 'other');

  return (
    <Container>
      <LG isBold style={{ margin: `${globalTheme.space.md} 0` }}>
        {t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_LABEL')}
      </LG>
      <StyledTabs>
        {mediaItems.length ? (
          <Tabs.Panel
            title={`${t(
              '__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_MEDIA_TAB_TITLE'
            )} (${mediaItems.length})`}
          >
            <BugMedia items={mediaItems} />
          </Tabs.Panel>
        ) : null}
        {extraItems.length ? (
          <Tabs.Panel
            title={`${t(
              '__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_EXTRA_TAB_TITLE'
            )} (${extraItems.length})`}
          >
            <BugExtra items={extraItems} />
          </Tabs.Panel>
        ) : null}
      </StyledTabs>
    </Container>
  );
};
