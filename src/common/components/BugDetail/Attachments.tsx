import { Dispatch, SetStateAction } from 'react';
import { LG, Tabs } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { GetCampaignsByCidBugsAndBidApiResponse } from 'src/features/api';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { ReactComponent as AttachmentsIcon } from 'src/assets/icons/attachments-icon.svg';
import BugMedia from './Media';
import BugExtra from './Extra';

const Container = styled.div`
  display: inline-block;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > svg {
    fill: ${({ theme }) => theme.palette.grey[600]};
  }
`;

const StyledTabs = styled(Tabs)`
  width: 100%;

  > button {
    width: 50%;
  }
`;

type Open = {
  details: boolean;
  duplicate: boolean;
};

export default ({ bug }: { bug: GetCampaignsByCidBugsAndBidApiResponse }) => {
  const { t } = useTranslation();

  const { media } = bug;

  if (!media || media.length === 0) return null;

  // Get all the media that are not of type "other"
  const mediaItems = media?.filter(
    (m) => m.mime_type.type === 'image' || m.mime_type.type === 'video'
  );

  // Order the media by mime_type.type "video" first and then all the rest
  mediaItems.sort((a, b) => {
    if (a.mime_type.type === 'video') return -1;
    if (b.mime_type.type !== 'video') return 1;
    return 0;
  });

  // Get all the media that are of type "other"
  const extraItems = media?.filter((m) => m.mime_type.type === 'other');

  return (
    <Container id="bug-preview-attachments">
      <Title>
        <AttachmentsIcon
          style={{
            marginRight: globalTheme.space.base * 3,
          }}
        />
        <LG
          isBold
          style={{
            margin: `${globalTheme.space.md} 0`,
            color: globalTheme.palette.grey[800],
          }}
        >
          {t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_LABEL')}
        </LG>
      </Title>
      {mediaItems.length && extraItems.length ? (
        <StyledTabs>
          <Tabs.Panel
            title={`${t(
              '__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_MEDIA_TAB_TITLE'
            )} (${mediaItems.length})`}
          >
            <BugMedia items={mediaItems} bug={bug} />
          </Tabs.Panel>
          <Tabs.Panel
            title={`${t(
              '__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_EXTRA_TAB_TITLE'
            )} (${extraItems.length})`}
          >
            <BugExtra items={extraItems} />
          </Tabs.Panel>
        </StyledTabs>
      ) : (
        <BugMedia items={mediaItems} bug={bug} />
      )}
    </Container>
  );
};
