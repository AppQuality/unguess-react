import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { FEATURE_FLAG_TAGGING_TOOL } from 'src/constants';
import { useGetUsersMeQuery } from 'src/features/api';
import { useGetCampaignWithWorkspaceQuery } from 'src/features/api/customEndpoints/getCampaignWithWorkspace';
import { useGetHubWithWorkspaceQuery } from 'src/features/api/customEndpoints/getHubWithWorkspace';
import {
  setCampaignId,
  setHubId,
  setIsHub,
  setPermissionSettingsTitle,
  setWorkspace,
} from 'src/features/navigation/navigationSlice';
import type { CampaignHubContext } from 'src/features/templates/CampaignsHubsMiddleware';
import { Page } from 'src/features/templates/Page';
import { useCampaignAnalytics } from 'src/hooks/useCampaignAnalytics';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import VideosPageContent from './Content';
import VideosPageHeader from './PageHeader';

const VideosPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const { isHub, entityId } = useOutletContext<CampaignHubContext>();
  
  const dispatch = useAppDispatch();
  const location = useLocation();
  const {
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    isSuccess,
  } = useGetUsersMeQuery();
  const { hasFeatureFlag } = useFeatureFlag();

  const hasTaggingToolFeature = hasFeatureFlag(FEATURE_FLAG_TAGGING_TOOL);


  useEffect(() => {
    if (isUserFetching || isUserLoading) return;

    if (!hasTaggingToolFeature && isSuccess) {
      navigate(notFoundRoute, {
        state: { from: location.pathname },
      });
    }
  }, [isUserFetching, isUserLoading, isSuccess, hasTaggingToolFeature, navigate, notFoundRoute, location.pathname]);

  useCampaignAnalytics(entityId);

  // For campaigns, get campaign + workspace data
  const { isError: isErrorCampaign, data: { campaign, workspace: campaignWorkspace } = {} } =
    useGetCampaignWithWorkspaceQuery({
      cid: entityId,
    }, {
      skip: isHub,
    });

  // For hubs, get hub + workspace data
  const { isError: isErrorHub, data: { hub, workspace: hubWorkspace } = {} } = useGetHubWithWorkspaceQuery({
    hid: entityId,
  }, {
    skip: !isHub,
  });

  const isError = isHub ? isErrorHub : isErrorCampaign;
  const workspace = isHub ? hubWorkspace : campaignWorkspace;

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [workspace, dispatch]);

  useEffect(() => {
    if (isHub && hub) {
      // For hubs, use hub title as permission settings title
      dispatch(setPermissionSettingsTitle(hub.title));
      dispatch(setHubId(hub.id));
      dispatch(setIsHub(true));
    } else if (campaign) {
      // For campaigns, use campaign customer_title
      dispatch(setPermissionSettingsTitle(campaign.customer_title));
      dispatch(setCampaignId(campaign.id));
      dispatch(setIsHub(false));
    }

    return () => {
      dispatch(setPermissionSettingsTitle(undefined));
      dispatch(setCampaignId(undefined));
      dispatch(setHubId(undefined));
      dispatch(setIsHub(undefined));
    };
  }, [campaign, hub, isHub, dispatch]);

  useEffect(() => {
    if (isError) {
      navigate(notFoundRoute, {
        state: { from: location.pathname },
      });
    }
  }, [isError, navigate, notFoundRoute, location.pathname]);

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
