import { Page } from 'src/features/templates/Page';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useAppDispatch } from 'src/app/hooks';
import { useCampaignAnalytics } from 'src/hooks/useCampaignAnalytics';
import { useGetCampaignWithWorkspaceQuery } from 'src/features/api/customEndpoints/getCampaignWithWorkspace';
import {
  setCampaignId,
  setPermissionSettingsTitle,
  setWorkspace,
} from 'src/features/navigation/navigationSlice';
import { useEffect } from 'react';
import VideosPageHeader from './PageHeader';
import VideosPageContent from './Content';

const VideosPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const { campaignId } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();

  if (!campaignId || Number.isNaN(Number(campaignId))) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  useCampaignAnalytics(campaignId);

  const {
    isLoading: isLoadingCampaign,
    isFetching: isFetchingCampaign,
    isError: isErrorCampaign,
    data: { campaign, workspace } = {},
  } = useGetCampaignWithWorkspaceQuery({
    cid: campaignId?.toString() ?? '0',
  });

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [workspace, dispatch]);

  useEffect(() => {
    if (campaign) {
      dispatch(setPermissionSettingsTitle(campaign.customer_title));
      dispatch(setCampaignId(campaign.id));
    }

    return () => {
      dispatch(setPermissionSettingsTitle(undefined));
      dispatch(setCampaignId(undefined));
    };
  }, [campaign]);

  if (isErrorCampaign) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  return (
    <Page
      title={t('__VIDEOS_PAGE_TITLE')}
      className="videos-page"
      pageHeader={<VideosPageHeader />}
      route="videos"
      excludeMarginTop
    >
      <VideosPageContent />
    </Page>
  );
};

export default VideosPage;
