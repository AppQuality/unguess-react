import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { HubMediaListMetaRow } from 'src/pages/Hubs/HubMediaListMetaRow';
import VideosPageContent from 'src/pages/Videos/Content';
import styled from 'styled-components';
import type { EntityTabContext } from '../entityTabs';
import { TabSection, TabTitle } from './TabLayout';

const StyledMetaRow = styled(HubMediaListMetaRow)`
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

/**
 * Hub media-list tab body. Mirrors the campaign `MediaListTab` but reuses
 * `HubMediaListMetaRow` (no date/status) and threads the wrapper's shared
 * `onOpenImportMediaModal` through to `VideosPageContent`, so the empty-state
 * "Upload media" CTA opens the same modal instance as the header CTA instead
 * of a second local one.
 */
export const HubMediaListTab = () => {
  const { t } = useTranslation();
  const { entityId, onOpenImportMediaModal } =
    useOutletContext<EntityTabContext>();

  return (
    <TabSection>
      <VideosPageContent
        contentHeader={
          <TabTitle meta={<StyledMetaRow hubId={entityId} />}>
            {t('__ENTITY_PAGE_TAB_MEDIA_LIST')}
          </TabTitle>
        }
        onOpenImportMediaModal={onOpenImportMediaModal}
      />
    </TabSection>
  );
};
