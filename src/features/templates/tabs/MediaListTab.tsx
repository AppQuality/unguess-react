import { getColor, LG } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { MediaListMetaRow } from 'src/pages/Campaign/MediaListMetaRow';
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

const StyledMetaRow = styled(MediaListMetaRow)`
  margin-bottom: ${({ theme }) => theme.space.lg};
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
    <Section>
      <VideosPageContent
        contentHeader={
          <>
            <TabTitle isBold>{t('__ENTITY_PAGE_TAB_MEDIA_LIST')}</TabTitle>
            <StyledMetaRow campaignId={entityId} />
          </>
        }
      />
    </Section>
  );
};
