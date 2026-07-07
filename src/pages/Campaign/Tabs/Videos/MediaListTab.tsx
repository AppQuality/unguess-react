import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { MediaListMetaRow } from 'src/pages/Campaign/MediaListMetaRow';
import VideosPageContent from 'src/pages/Videos/Content';
import styled from 'styled-components';
import type { EntityTabContext } from '../../entityTabs';
import { TabSection, TabTitle } from '../TabLayout';

const StyledMetaRow = styled(MediaListMetaRow)`
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

/**
 * Campaign media-list tab body. Reuses the content-only `VideosPageContent`
 * (already width-managed per branch — grid vs empty state) and renders, at the
 * top of the content column, the "Media list" title and the
 * `MediaListMetaRow` (video count/date/devices/severities/status). No legacy
 * page header is rendered here — the shared `EntityPageHeader` owns it.
 */
export const MediaListTab = () => {
  const { t } = useTranslation();
  const { entityId } = useOutletContext<EntityTabContext>();

  return (
    <TabSection>
      <VideosPageContent
        contentHeader={
          <TabTitle meta={<StyledMetaRow campaignId={entityId} />}>
            {t('__ENTITY_PAGE_TAB_MEDIA_LIST')}
          </TabTitle>
        }
      />
    </TabSection>
  );
};
