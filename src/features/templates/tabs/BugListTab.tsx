import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { selectCampaign } from 'src/features/bugsPage/bugsPageSlice';
import { BugsMetaRow } from 'src/pages/Bugs/BugsMetaRow';
import { BugsPageContent, BugsPageContentLoader } from 'src/pages/Bugs/Content';
import { useCampaign } from 'src/pages/Bugs/useCampaign';
import styled from 'styled-components';
import type { EntityTabContext } from '../entityTabs';
import { TabTitle } from './TabLayout';

const MetaRowWrapper = styled(LayoutWrapper)`
  padding-top: ${({ theme }) => theme.space.xl};
  padding-bottom: ${({ theme }) => theme.space.md};
`;

/**
 * Campaign bug-list tab body. Reuses the content-only `BugsPageContent`
 * (filters, table, bug preview) and renders the bug metadata row at the top of
 * the content column. The shared `EntityPageHeader` owns breadcrumb/title,
 * share/viewers, and the download-report / integration-center menu actions.
 *
 * The bug-list filter store is seeded here (tab-scoped) via `selectCampaign`:
 * this is the only side-effect the shared wrapper does not already cover
 * (navigation slice + analytics are handled by `useSyncEntityNavigation`).
 */
export const BugListTab = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { entityId } = useOutletContext<EntityTabContext>();
  const campaignId = Number(entityId);

  const { isLoading, campaign } = useCampaign(campaignId);

  useEffect(() => {
    if (campaign) {
      dispatch(
        selectCampaign({
          cp_id: campaign.cp_id,
          filters: campaign.filters,
        })
      );
    }
  }, [campaign, dispatch]);

  if (isLoading) {
    return <BugsPageContentLoader />;
  }

  return (
    <>
      <MetaRowWrapper isNotBoxed>
        <TabTitle meta={<BugsMetaRow campaignId={campaignId} />}>
          {t('__ENTITY_PAGE_TAB_BUG_LIST')}
        </TabTitle>
      </MetaRowWrapper>
      <BugsPageContent campaignId={campaignId} />
    </>
  );
};
