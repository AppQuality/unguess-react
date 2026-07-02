import { getColor, LG } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { HubMediaListMetaRow } from 'src/pages/Hubs/HubMediaListMetaRow';
import VideosPageContent from 'src/pages/Videos/Content';
import styled from 'styled-components';
import type { EntityTabContext } from '../entityTabs';

// Top padding of the tab section (matches the 32px spacer in the design).
const Section = styled.div`
  padding-top: ${({ theme }) => theme.space.lg};
`;

// Active-tab title shown at the top of the content column, above the meta row.
const TabTitle = styled(LG)`
  color: ${({ theme }) => getColor(theme.palette.blue, 600)};
  margin-bottom: ${({ theme }) => theme.space.xs};
  padding-bottom: ${({ theme }) => theme.space.xs};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

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
    <Section>
      <VideosPageContent
        contentHeader={
          <>
            <TabTitle isBold>{t('__ENTITY_PAGE_TAB_MEDIA_LIST')}</TabTitle>
            <StyledMetaRow hubId={entityId} />
          </>
        }
        onOpenImportMediaModal={onOpenImportMediaModal}
      />
    </Section>
  );
};
