import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { FEATURE_FLAG_TAGGING_TOOL } from 'src/constants';
import { useGetCampaignWithWorkspaceQuery } from 'src/features/api/customEndpoints/getCampaignWithWorkspace';
import {
  setCampaignId,
  setPermissionSettingsTitle,
  setWorkspace,
} from 'src/features/navigation/navigationSlice';
import { Page } from 'src/features/templates/Page';
import { useCampaignAnalytics } from 'src/hooks/useCampaignAnalytics';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import VideoPageHeader from './components/PageHeader';
import VideoPageContent from './Content';

const VideoPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const { campaignId } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const status = useAppSelector((state) => state.user.status);
  const { hasFeatureFlag } = useFeatureFlag();

  const hasTaggingToolFeature = hasFeatureFlag(FEATURE_FLAG_TAGGING_TOOL);

  if (!campaignId || Number.isNaN(Number(campaignId))) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  useCampaignAnalytics(campaignId);

  const { isError: isErrorCampaign, data: { campaign, workspace } = {} } =
    useGetCampaignWithWorkspaceQuery(
      {
        cid: campaignId?.toString() ?? '0',
      },
      {
        skip: !campaignId,
      }
    );

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

  useEffect(() => {
    if (status === 'idle' || status === 'loading') return;

    if (!hasTaggingToolFeature && status === 'logged') {
      navigate(notFoundRoute, {
        state: { from: location.pathname },
      });
    }
  }, [status, hasTaggingToolFeature]);

  return (
    <Page
      title={t('__VIDEO_PAGE_TITLE')}
      className="video-page"
      pageHeader={<VideoPageHeader />}
      route="video"
      excludeMarginTop
      excludeMarginBottom
      isMinimal
    >
      <VideoPageContent />
    </Page>
  );
};

export default VideoPage;
