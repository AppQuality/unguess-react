import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetCampaignWithWorkspaceQuery } from 'src/features/api/customEndpoints/getCampaignWithWorkspace';
import { Page } from 'src/features/templates/Page';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useAppDispatch } from 'src/app/hooks';
import { useCampaignAnalytics } from 'src/hooks/useCampaignAnalytics';
import { useEffect } from 'react';
import {
  setCampaignId,
  setPermissionSettingsTitle,
  setWorkspace,
} from 'src/features/navigation/navigationSlice';
import { FEATURE_FLAG_TAGGING_TOOL } from 'src/constants';
import { useGetUsersMeQuery } from 'src/features/api';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import InsightsPageContent from './Content';
import InsightsPageHeader from './PageHeader';
import { InsightContextProvider } from './InsightContext';

const InsightsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const { campaignId } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const {
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    data: userData,
  } = useGetUsersMeQuery();

  const { hasFeatureFlag } = useFeatureFlag();

  const hasTaggingToolFeature = hasFeatureFlag(FEATURE_FLAG_TAGGING_TOOL);

  if (!campaignId || Number.isNaN(Number(campaignId))) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  useCampaignAnalytics(campaignId);

  const { isError: isErrorCampaign, data: { campaign, workspace } = {} } =
    useGetCampaignWithWorkspaceQuery({
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

  useEffect(() => {
    if (isUserFetching || isUserLoading) return;

    if (!hasTaggingToolFeature && userData) {
      navigate(notFoundRoute, {
        state: { from: location.pathname },
      });
    }
  }, [isUserFetching, isUserLoading, userData, hasTaggingToolFeature]);

  return (
    <InsightContextProvider>
      <Page
        title={t('__INSIGHTS_PAGE_TITLE')}
        className="insights-page"
        pageHeader={<InsightsPageHeader />}
        route="insights"
        excludeMarginTop
        excludeMarginBottom
      >
        <InsightsPageContent />
      </Page>
    </InsightContextProvider>
  );
};

export default InsightsPage;
