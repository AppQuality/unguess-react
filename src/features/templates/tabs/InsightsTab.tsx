import { getColor, LG } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { InsightContextProvider } from 'src/pages/Insights/InsightContext';
import InsightsPageContent from 'src/pages/Insights/Content';
import styled from 'styled-components';

// Top padding of the tab section (matches the 32px spacer used by the other
// migrated tabs — applies to the whole two-column grid, content + drawer).
const Section = styled.div`
  padding-top: ${({ theme }) => theme.space.lg};
`;

// Active-tab title shown at the top of the content column.
const TabTitle = styled(LG)`
  color: ${({ theme }) => getColor(theme.palette.blue, 600)};
  margin-bottom: ${({ theme }) => theme.space.xs};
  padding-bottom: ${({ theme }) => theme.space.xs};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

/**
 * Campaign insights tab body. Reuses the content-only `InsightsPageContent`
 * (already width-managed via its own grid layout) and renders, at the top of
 * the content column, the "Insights" title. Unlike media-list, the legacy
 * `InsightsPageHeader` had no real meta-info row of its own — only actions
 * (settings, dashboard/video-list links, download) already covered by the
 * shared `EntityPageHeader`, so no dedicated meta-row component is needed
 * here. No legacy page header is rendered here — the shared `EntityPageHeader`
 * owns it.
 */
export const InsightsTab = () => {
  const { t } = useTranslation();

  return (
    <Section>
      <InsightContextProvider>
        <InsightsPageContent
          contentHeader={
            <TabTitle isBold>{t('__ENTITY_PAGE_TAB_INSIGHTS')}</TabTitle>
          }
        />
      </InsightContextProvider>
    </Section>
  );
};
