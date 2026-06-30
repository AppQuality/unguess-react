import { Button } from '@appquality/unguess-design-system';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
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
import { useActiveWorkspaceProjects } from 'src/hooks/useActiveWorkspaceProjects';
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
import { buildCampaignMenuSections } from './buildCampaignMenuSections';
import type { CampaignHubContext } from './CampaignsHubsMiddleware';
import { EntityPageHeader, type EntityPageTabId } from './EntityPageHeader';
import { Page } from './Page';
import { useSyncEntityNavigation } from './useSyncEntityNavigation';

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

const TAB_LABEL_KEYS: Record<EntityPageTabId, string> = {
  overview: '__ENTITY_PAGE_TAB_OVERVIEW',
  'media-list': '__ENTITY_PAGE_TAB_MEDIA_LIST',
  insights: '__ENTITY_PAGE_TAB_INSIGHTS',
  'bug-list': '__ENTITY_PAGE_TAB_BUG_LIST',
};

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

  useSyncEntityNavigation({
    isHub,
    campaign,
    hub,
    workspace,
    analyticsCampaignId: !isHub && !shouldUseLegacyPath ? entityId : undefined,
  });

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

  const tabs = enabledTabs.map((id) => ({
    id,
    // eslint-disable-next-line security/detect-object-injection
    label: t(TAB_LABEL_KEYS[id]),
  }));

  const campaignIds = workspaceProjectsData?.items
    ?.filter((item) => item.id !== campaign?.project.id)
    ?.map((item) => item.id);

  const isMoveCampaignDisabled =
    !campaignIds || campaignIds.length === 0 || !hasWorkspaceAccess;

  const hasBugs = campaign?.outputs?.includes('bugs') ?? false;
  const showBugActions =
    !isHub && (activeTab === 'overview' || activeTab === 'bug-list') && hasBugs;
  const showUploadMediaCta = isHub;
  const showDownloadAnalysis =
    !isHub &&
    (activeTab === 'overview' || activeTab === 'insights') &&
    !isVideosLoading &&
    !isVideosFetching &&
    hasVideos;

  const integrationCenterUrl = getLocalizeIntegrationCenterRoute(
    Number(entityId)
  );

  const renderCtaSlot = (): React.ReactNode => {
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

    return null;
  };

  const menuSections =
    !isHub && campaign
      ? buildCampaignMenuSections({
          campaign,
          t,
          isMoveDisabled: isMoveCampaignDisabled,
          showDownloadAnalysis,
          showBugActions,
          onMove: () => setIsMoveModalOpen(true),
          onArchive: () => setIsArchiveModalOpen(true),
          onDownloadAnalysis: () => handleUseCaseExport(entityId),
          onDownloadBugReport: () =>
            WPAPI.getReport({
              campaignId: Number(entityId),
              title: currentEntityTitle,
            }),
          onIntegrationCenter: () => {
            window.location.href = integrationCenterUrl;
          },
          onGoToPlan: () => navigate(`/plans/${campaign.plan}`),
        })
      : [];

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
          entityId={entityId}
          entityTitle={currentEntityTitle}
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
          menuSections={menuSections}
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
