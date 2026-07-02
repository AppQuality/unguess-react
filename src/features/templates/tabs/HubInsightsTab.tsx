import { getColor, LG, Skeleton } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { useGetCampaignsByCidObservationsQuery } from 'src/features/api';
import { HubInsightsEmptyState } from 'src/pages/Insights/HubInsightsEmptyState';
import { InsightContextProvider } from 'src/pages/Insights/InsightContext';
import InsightsPageContent from 'src/pages/Insights/Content';
import styled from 'styled-components';
import type { EntityTabContext } from '../entityTabs';

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
 * Hub insights tab body. Hubs always show the insights tab (product
 * decision), so when there are no observations yet it renders a dedicated
 * empty state (soft navigation hint back to media-list) instead of the
 * normal widgets/collection workspace. `useGetCampaignsByCidObservationsQuery`
 * dedupes against the identical query `Collection` makes internally, so this
 * adds no extra network call.
 */
export const HubInsightsTab = () => {
  const { t } = useTranslation();
  const { entityId } = useOutletContext<EntityTabContext>();
  const { data: observations, isLoading } =
    useGetCampaignsByCidObservationsQuery({ cid: entityId });

  const hasObservations = (observations?.results.length ?? 0) > 0;

  const renderBody = () => {
    if (isLoading) {
      return <Skeleton height="200px" style={{ borderRadius: 0 }} />;
    }

    if (hasObservations) {
      return (
        <InsightContextProvider>
          <InsightsPageContent />
        </InsightContextProvider>
      );
    }

    return <HubInsightsEmptyState />;
  };

  return (
    <Section>
      <TabTitle isBold>{t('__ENTITY_PAGE_TAB_INSIGHTS')}</TabTitle>
      {renderBody()}
    </Section>
  );
};
