import {
  Notification,
  Skeleton,
  useToast,
} from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useGetCampaignsByCidObservationsQuery } from 'src/features/api';
import { HubInsightsEmptyState } from 'src/pages/Insights/HubInsightsEmptyState';
import { InsightContextProvider } from 'src/pages/Insights/InsightContext';
import InsightsPageContent from 'src/pages/Insights/Content';
import type { EntityTabContext } from '../entityTabs';
import { TabSection, TabTitle } from './TabLayout';

/**
 * Hub insights tab body. Hubs always show the insights tab (product
 * decision), so when there are no observations yet it renders a dedicated
 * empty state (soft navigation hint back to media-list) instead of the
 * normal widgets/collection workspace. The ungrouped `useGetCampaignsByCidObservationsQuery`
 * call here dedupes against the identical (ungrouped) query the Widgets'
 * `useSeveritiesDistributionData` makes internally — not against `Collection`,
 * which queries with `groupBy: 'usecase-grapes'` and is therefore a separate
 * cache entry/request.
 */
export const HubInsightsTab = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { entityId } = useOutletContext<EntityTabContext>();
  const {
    data: observations,
    isLoading,
    isError,
  } = useGetCampaignsByCidObservationsQuery({ cid: entityId });

  const hasObservations = (observations?.results.length ?? 0) > 0;

  useEffect(() => {
    if (!isError) return;

    addToast(
      ({ close }) => (
        <Notification
          onClose={close}
          type="error"
          message={t('__HUB_INSIGHTS_LOAD_ERROR')}
          closeText={t('__TOAST_CLOSE_TEXT')}
          isPrimary
        />
      ),
      { placement: 'top' }
    );
  }, [isError, addToast, t]);

  const renderBody = () => {
    if (isLoading) {
      return (
        <LayoutWrapper isNotBoxed>
          <TabTitle>{t('__ENTITY_PAGE_TAB_INSIGHTS')}</TabTitle>
          <Skeleton height="200px" style={{ borderRadius: 0 }} />
        </LayoutWrapper>
      );
    }

    if (hasObservations) {
      return (
        <InsightContextProvider>
          <InsightsPageContent
            contentHeader={
              <TabTitle>{t('__ENTITY_PAGE_TAB_INSIGHTS')}</TabTitle>
            }
          />
        </InsightContextProvider>
      );
    }

    // Empty state (no observations): no tab title — the hub empty state is
    // shown clean (product decision), which also avoids the misaligned bare
    // title that rendering it outside the content column would produce.
    return (
      <LayoutWrapper isNotBoxed>
        <HubInsightsEmptyState />
      </LayoutWrapper>
    );
  };

  return <TabSection>{renderBody()}</TabSection>;
};
