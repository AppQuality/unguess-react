import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { selectCampaign } from 'src/features/bugsPage/bugsPageSlice';
import { Page } from 'src/features/templates/Page';
import { campaignHasBugs } from 'src/hooks/campaignHasBugs';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { BugsPageContent, BugsPageContentLoader } from './Content';
import { BugsPageHeader, BugsPageHeaderLoader } from './PageHeader';
import { useCampaign } from './useCampaign';

const Bugs = () => {
  const { campaignId } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');

  if (!campaignId || Number.isNaN(Number(campaignId))) {
    navigate(notFoundRoute);
  }

  const { isLoading, isError, campaign } = useCampaign(Number(campaignId));

  useEffect(() => {
    if (campaign) {
      dispatch(
        selectCampaign({
          cp_id: campaign.cp_id,
          filters: campaign.filters,
        })
      );
    }
  }, [campaign]);

  if (isError) {
    navigate(notFoundRoute);
  }

  // Check if the campaign has bugs
  if (campaign && !campaignHasBugs(campaign)) {
    navigate(notFoundRoute);
  }

  return (
    <Page
      title={t('__BUGS_PAGE_TITLE')}
      pageHeader={
        isLoading ? (
          <BugsPageHeaderLoader />
        ) : (
          campaign && <BugsPageHeader campaignId={campaign.cp_id} />
        )
      }
      route="bugs"
    >
      {isLoading ? (
        <BugsPageContentLoader />
      ) : (
        <BugsPageContent campaignId={campaign?.cp_id || 0} />
      )}
    </Page>
  );
};

export default Bugs;
