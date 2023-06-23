import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { useCampaignAnalytics } from 'src/hooks/useCampaignAnalytics';
import { selectCampaign } from 'src/features/bugsPage/bugsPageSlice';
import { Page } from 'src/features/templates/Page';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { BugsPageContent, BugsPageContentLoader } from './Content';
import { BugsPageHeader, BugsPageHeaderLoader } from './PageHeader';
import { useCampaign } from './useCampaign';
import {
  setCampaignId,
  setPermissionSettingsTitle,
  setWorkspace,
} from '../../features/navigation/navigationSlice';

const Bugs = () => {
  const { campaignId } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');

  if (!campaignId || Number.isNaN(Number(campaignId))) {
    navigate(notFoundRoute);
  }
  useCampaignAnalytics(campaignId);

  const { isLoading, isError, campaign, workspace } = useCampaign(
    Number(campaignId)
  );

  useEffect(() => {
    if (campaign) {
      dispatch(
        selectCampaign({
          cp_id: campaign.cp_id,
          filters: campaign.filters,
        })
      );
      dispatch(setPermissionSettingsTitle(campaign.customerTitle));
      dispatch(setCampaignId(campaign.cp_id));
    }
    return () => {
      dispatch(setPermissionSettingsTitle(undefined));
      dispatch(setCampaignId(undefined));
    };
  }, [campaign]);

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
    return () => {
      dispatch(setWorkspace(undefined));
    };
  }, [workspace, dispatch]);

  if (isError) {
    navigate(notFoundRoute);
  }

  // Check if the campaign has bugs
  if (
    !isLoading &&
    campaign &&
    (!campaign.outputs?.length || !campaign.outputs.includes('bugs'))
  ) {
    navigate(notFoundRoute);
  }

  return (
    <Page
      title={t('__BUGS_PAGE_TITLE')}
      className="bugs-list-page"
      pageHeader={
        isLoading ? (
          <BugsPageHeaderLoader />
        ) : (
          campaign && <BugsPageHeader campaignId={campaign.cp_id} />
        )
      }
      route="bugs"
      excludeMarginTop
      excludeMarginBottom
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
