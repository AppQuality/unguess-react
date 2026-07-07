import { useTranslation } from 'react-i18next';
import { InsightContextProvider } from 'src/pages/Insights/InsightContext';
import InsightsPageContent from 'src/pages/Insights/Content';
import { TabSection, TabTitle } from './TabLayout';

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
    <TabSection>
      <InsightContextProvider>
        <InsightsPageContent
          contentHeader={<TabTitle>{t('__ENTITY_PAGE_TAB_INSIGHTS')}</TabTitle>}
        />
      </InsightContextProvider>
    </TabSection>
  );
};
