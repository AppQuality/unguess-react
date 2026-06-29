import { Button } from '@appquality/unguess-design-system';
import { ReactComponent as DownloadIcon } from '@zendeskgarden/svg-icons/src/16/download-stroke.svg';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear.svg';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { CampaignSettings } from 'src/common/components/inviteUsers/campaignSettings';
import { PageLoader } from 'src/common/components/PageLoader';
import WPAPI from 'src/common/wpapi';
import { FEATURE_FLAG_TAGGING_TOOL } from 'src/constants';
import {
  type GetCampaignsByCidApiResponse,
  useGetCampaignsByCidVideosQuery,
  useGetUsersMeQuery,
} from 'src/features/api';
import { useGetCampaignWithWorkspaceQuery } from 'src/features/api/customEndpoints/getCampaignWithWorkspace';
import { useGetHubWithWorkspaceQuery } from 'src/features/api/customEndpoints/getHubWithWorkspace';
import {
  setCampaignId,
  setHubId,
  setIsHub,
  setPermissionSettingsTitle,
  setWorkspace,
} from 'src/features/navigation/navigationSlice';
import { useActiveWorkspaceProjects } from 'src/hooks/useActiveWorkspaceProjects';
import { useCampaignAnalytics } from 'src/hooks/useCampaignAnalytics';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import { useEntityId } from 'src/hooks/useEntityId';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useUseCaseExport } from 'src/hooks/useUseCaseExport';
import { getLocalizeIntegrationCenterRoute } from 'src/hooks/useLocalizeIntegrationCenterUrl';
import { ArchiveCampaignModal } from 'src/pages/Campaign/ArchiveCampaignModal';
import Campaign from 'src/pages/Campaign';
import {
  MoveCampaignModal,
  MoveCampaignModalContextProvider,
  useMoveCampaignModalContext,
} from 'src/pages/Campaign/MoveCampaignModal';
import { WatcherList } from 'src/pages/Campaign/pageHeader/Meta/WatcherList';
import { ImportMediaModal } from 'src/pages/Videos/ImportMediaModal';
import Videos from 'src/pages/Videos';
import type { CampaignHubContext } from './CampaignsHubsMiddleware';
import { EntityPageHeader, type EntityPageTabId } from './EntityPageHeader';
import { Page } from './Page';

const CAMPAIGN_DEFAULT_TAB: EntityPageTabId = 'overview';
const HUB_DEFAULT_TAB: EntityPageTabId = 'media-list';

const parseIsHubRoute = (pathname: string) => pathname.includes('/hubs/');

const getCampaignTabs = (
  campaign?: GetCampaignsByCidApiResponse,
  { insightsEnabled = false }: { insightsEnabled?: boolean } = {}
): EntityPageTabId[] => {
  const outputs = campaign?.outputs ?? [];
  const tabs: EntityPageTabId[] = ['overview'];

  if (outputs.includes('media')) {
    tabs.push('media-list');
  }

  // Insights tab parity with the legacy header: shown when the tagging-tool
  // feature is on and the campaign has videos (insights are derived from video
  // observations). `outputs.insights` is not a reliable signal here.
  if (insightsEnabled) {
    tabs.push('insights');
  }

  if (outputs.includes('bugs')) {
    tabs.push('bug-list');
  }

  return tabs;
};

const getHubTabs = (): EntityPageTabId[] => ['media-list', 'insights'];

const getValidatedTab = ({
  tab,
  enabledTabs,
  isHub,
}: {
  tab: string | null;
  enabledTabs: EntityPageTabId[];
  isHub: boolean;
}): EntityPageTabId => {
  const fallbackTab = isHub ? HUB_DEFAULT_TAB : CAMPAIGN_DEFAULT_TAB;

  if (!tab) {
    return enabledTabs.includes(fallbackTab) ? fallbackTab : enabledTabs[0];
  }

  if (!enabledTabs.includes(tab as EntityPageTabId)) {
    return enabledTabs.includes(fallbackTab) ? fallbackTab : enabledTabs[0];
  }

  return tab as EntityPageTabId;
};

const EntityPageWrapperInner = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { handleUseCaseExport } = useUseCaseExport();
  const [searchParams, setSearchParams] = useSearchParams();
  const entityId = useEntityId();
  const notFoundRoute = useLocalizeRoute('oops');
  const loginRoute = useLocalizeRoute('login');
  const isHub = parseIsHubRoute(location.pathname);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isHubImportModalOpen, setIsHubImportModalOpen] = useState(false);
  const { setIsOpen: setIsMoveModalOpen } = useMoveCampaignModalContext();
  const hasWorkspaceAccess = useCanAccessToActiveWorkspace();
  const { hasFeatureFlag } = useFeatureFlag();
  const hasTaggingToolFeature = hasFeatureFlag(FEATURE_FLAG_TAGGING_TOOL);
  const projectRouteFallback = useLocalizeRoute('projects/0');
  const tabParam = searchParams.get('tab');
  const shouldUseLegacyPath = !tabParam;

  const {
    data: userData,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    error: userError,
  } = useGetUsersMeQuery();

  const shouldSkipEntityQuery =
    shouldUseLegacyPath ||
    !entityId ||
    isUserLoading ||
    isUserFetching ||
    !userData ||
    !!userError;

  const {
    data: campaignData,
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
    isError: isCampaignError,
  } = useGetCampaignWithWorkspaceQuery(
    {
      cid: entityId ?? '0',
    },
    {
      skip: shouldSkipEntityQuery || isHub,
    }
  );

  const {
    data: hubData,
    isLoading: isHubLoading,
    isFetching: isHubFetching,
    isError: isHubError,
  } = useGetHubWithWorkspaceQuery(
    {
      hid: entityId ?? '0',
    },
    {
      skip: shouldSkipEntityQuery || !isHub,
    }
  );

  const campaign = campaignData?.campaign;
  const hub = hubData?.hub;
  const workspace = isHub ? hubData?.workspace : campaignData?.workspace;

  const {
    data: videos,
    isLoading: isVideosLoading,
    isFetching: isVideosFetching,
  } = useGetCampaignsByCidVideosQuery(
    {
      cid: entityId ?? '0',
    },
    {
      skip: shouldUseLegacyPath || !entityId || isHub,
    }
  );

  const hasVideos = (videos?.items.length ?? 0) > 0;

  const enabledTabs = useMemo(() => {
    if (isHub) {
      return getHubTabs();
    }

    return getCampaignTabs(campaign, {
      insightsEnabled: hasTaggingToolFeature && hasVideos,
    });
  }, [isHub, campaign, hasTaggingToolFeature, hasVideos]);

  const activeTab = getValidatedTab({
    tab: tabParam,
    enabledTabs,
    isHub,
  });

  const { data: workspaceProjectsData } = useActiveWorkspaceProjects();

  const isEntityLoading = isHub
    ? isHubLoading || isHubFetching
    : isCampaignLoading || isCampaignFetching;
  const isEntityError = isHub ? isHubError : isCampaignError;

  useEffect(() => {
    if (shouldUseLegacyPath || !entityId) return;

    if (tabParam !== activeTab) {
      const nextSearchParams = new URLSearchParams(searchParams);
      nextSearchParams.set('tab', activeTab);
      setSearchParams(nextSearchParams, { replace: true });
    }
  }, [
    shouldUseLegacyPath,
    entityId,
    tabParam,
    activeTab,
    searchParams,
    setSearchParams,
  ]);

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [workspace, dispatch]);

  useEffect(() => {
    if (isHub && hub) {
      dispatch(setPermissionSettingsTitle(hub.customer_title ?? hub.title));
      dispatch(setHubId(hub.id));
      dispatch(setIsHub(true));
      return () => {
        dispatch(setPermissionSettingsTitle(undefined));
        dispatch(setCampaignId(undefined));
        dispatch(setHubId(undefined));
        dispatch(setIsHub(undefined));
      };
    }

    if (campaign) {
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

  // Mark campaign as read once at wrapper level.
  useCampaignAnalytics(!isHub && !shouldUseLegacyPath ? entityId : undefined);

  // UN-2893 scope: keep root legacy content untouched when tab is absent.
  if (shouldUseLegacyPath) {
    return isHub ? <Videos /> : <Campaign />;
  }

  if (isUserLoading || isUserFetching) {
    return <PageLoader />;
  }

  if (!userData || userError) {
    return (
      <Navigate to={loginRoute} state={{ from: location.pathname }} replace />
    );
  }

  if (!entityId) {
    return <Navigate to={notFoundRoute} replace />;
  }

  if (isEntityLoading) {
    return <PageLoader />;
  }

  if (isEntityError || (!campaign && !hub)) {
    return <Navigate to={notFoundRoute} replace />;
  }

  const currentEntityTitle = isHub
    ? hub?.customer_title ?? hub?.title ?? ''
    : campaign?.customer_title ?? '';
  const currentProject = isHub ? hub?.project : campaign?.project;

  if (!currentProject) {
    return <Navigate to={notFoundRoute} replace />;
  }

  const projectRoute = currentProject
    ? projectRouteFallback.replace(
        'projects/0/',
        `projects/${currentProject.id}/`
      )
    : projectRouteFallback;

  const tabs = enabledTabs.map((id) => {
    switch (id) {
      case 'overview':
        return { id, label: t('__ENTITY_PAGE_TAB_OVERVIEW') };
      case 'media-list':
        return { id, label: t('__ENTITY_PAGE_TAB_MEDIA_LIST') };
      case 'insights':
        return { id, label: t('__ENTITY_PAGE_TAB_INSIGHTS') };
      case 'bug-list':
        return { id, label: t('__ENTITY_PAGE_TAB_BUG_LIST') };
      default:
        return { id, label: id };
    }
  });

  const campaignIds = workspaceProjectsData?.items
    ?.filter((item) => item.id !== campaign?.project.id)
    ?.map((item) => item.id);

  const isMoveCampaignDisabled =
    !campaignIds || campaignIds.length === 0 || !hasWorkspaceAccess;

  const showDownloadReportCta = !isHub && activeTab === 'bug-list';
  const showUploadMediaCta = isHub;
  const showInsightsDownloadCta =
    !isHub &&
    activeTab === 'insights' &&
    !isVideosLoading &&
    !isVideosFetching &&
    (videos?.items.length ?? 0) > 0;

  const integrationCenterUrl = getLocalizeIntegrationCenterRoute(
    Number(entityId)
  );

  const renderCtaSlot = (): React.ReactNode => {
    if (showDownloadReportCta) {
      return (
        <>
          <Button
            isBasic
            className="header-dowlnoad-report"
            onClick={() =>
              WPAPI.getReport({
                campaignId: Number(entityId),
                title: currentEntityTitle,
              })
            }
          >
            <Button.StartIcon>
              <DownloadIcon />
            </Button.StartIcon>
            {t('__PAGE_HEADER_BUGS_DOTS_MENU_ITEM_REPORT')}
          </Button>
          <Button
            isBasic
            className="header-integration-center"
            onClick={() => {
              window.location.href = integrationCenterUrl;
            }}
          >
            <Button.StartIcon>
              <GearIcon />
            </Button.StartIcon>
            {t('__PAGE_HEADER_BUGS_DOTS_MENU_ITEM_INT_CENTER')}
          </Button>
        </>
      );
    }

    if (showUploadMediaCta) {
      return (
        <Button
          isPrimary
          isAccent
          onClick={() => setIsHubImportModalOpen(true)}
        >
          {t('__UX_CAMPAIGN_PAGE_NAVIGATION_VIDEO_LIST_CTA_UPLOAD_MEDIA')}
        </Button>
      );
    }

    if (showInsightsDownloadCta) {
      return (
        <Button
          isPrimary
          isAccent
          onClick={() => handleUseCaseExport(entityId)}
        >
          {t('__VIDEO_PAGE_ACTIONS_EXPORT_BUTTON_LABEL')}
        </Button>
      );
    }

    return null;
  };

  const entityContext: CampaignHubContext & { activeTab: EntityPageTabId } = {
    isHub,
    entityId,
    activeTab,
  };

  return (
    <Page
      title={currentEntityTitle || 'Entity'}
      route={isHub ? 'hubs' : 'campaigns'}
      excludeMarginTop
      pageHeader={
        <EntityPageHeader
          isHub={isHub}
          entityId={entityId}
          entityTitle={currentEntityTitle}
          campaign={campaign}
          project={{
            name: currentProject.name,
            route: projectRoute,
            hasAccess: true,
          }}
          tabs={tabs}
          activeTab={activeTab}
          shareAndViewersSlot={
            !isHub && campaign && !campaign.isArchived ? (
              <>
                <CampaignSettings />
                <WatcherList campaignId={entityId} />
              </>
            ) : null
          }
          ctaSlot={renderCtaSlot()}
          showCampaignActions={!isHub}
          isMoveCampaignDisabled={isMoveCampaignDisabled}
          onMoveCampaign={() => setIsMoveModalOpen(true)}
          onArchiveCampaign={() => setIsArchiveModalOpen(true)}
          onGoToPlan={() => {
            if (campaign?.plan) {
              navigate(`/plans/${campaign.plan}`);
            }
          }}
        />
      }
    >
      <>
        {!isHub && campaign && (
          <>
            <MoveCampaignModal campaignId={entityId} />
            {isArchiveModalOpen && (
              <ArchiveCampaignModal
                campaign={campaign}
                onClose={() => setIsArchiveModalOpen(false)}
              />
            )}
          </>
        )}
        {isHub && (
          <ImportMediaModal
            isOpen={isHubImportModalOpen}
            onClose={() => setIsHubImportModalOpen(false)}
            hubId={entityId}
          />
        )}

        <Outlet context={entityContext} />
      </>
    </Page>
  );
};

const EntityPageWrapper = () => (
  <MoveCampaignModalContextProvider>
    <EntityPageWrapperInner />
  </MoveCampaignModalContextProvider>
);

export default EntityPageWrapper;
