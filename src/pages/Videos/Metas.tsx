import {
  Button,
  ButtonMenu,
  IconButton,
  Skeleton,
  Span,
  Tooltip,
} from '@appquality/unguess-design-system';
import { ReactComponent as InsightsIcon } from '@zendeskgarden/svg-icons/src/16/lightbulb-stroke.svg';
import { ReactComponent as DotsIcon } from '@zendeskgarden/svg-icons/src/16/overflow-vertical-stroke.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useOutletContext } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as DashboardIcon } from 'src/assets/icons/dashboard-icon.svg';
import { ReactComponent as EditRedoStroke } from 'src/assets/icons/move-icon.svg';
import { ReactComponent as InboxFill } from 'src/assets/icons/project-archive.svg';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { formatApiDateShortMonthYear } from 'src/common/date/apiDate';
import { CampaignSettings } from 'src/common/components/inviteUsers/campaignSettings';
import { getDeviceIcon } from 'src/common/components/BugDetail/Meta';
import { Meta } from 'src/common/components/Meta';
import { StatusMeta } from 'src/common/components/meta/StatusMeta';
import { PageMeta } from 'src/common/components/PageMeta';
import { Pipe } from 'src/common/components/Pipe';
import { FEATURE_FLAG_TAGGING_TOOL } from 'src/constants';
import {
  GetCampaignsByCidApiResponse,
  useGetCampaignsByCidObservationsQuery,
  useGetCampaignsByCidVideosQuery,
} from 'src/features/api';
import type { CampaignHubContext } from 'src/features/templates/CampaignsHubsMiddleware';
import { useActiveWorkspaceProjects } from 'src/hooks/useActiveWorkspaceProjects';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { ArchiveCampaignModal } from 'src/pages/Campaign/ArchiveCampaignModal';
import { useMoveCampaignModalContext } from 'src/pages/Campaign/MoveCampaignModal';
import { WatcherList } from 'src/pages/Campaign/pageHeader/Meta/WatcherList';
import { CampaignStatus } from 'src/types';
import styled from 'styled-components';
import { useAnalytics } from 'use-analytics';
import { ImportMediaModal } from './ImportMediaModal';
import { getAllSeverityTags } from './utils/getSeverityTagsWithCount';

const StyledSkeleton = styled(Skeleton)`
  margin-right: ${({ theme }) => theme.space.sm};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: ${({ theme }) => theme.space.sm};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    align-self: end;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const StyledPipe = styled(Pipe)`
  display: inline;
`;

const SeveritiesMetaContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DeviceMetaItem = styled(Span)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xxs};
  margin-right: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.blue[600]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  > svg {
    width: 16px;
    height: 16px;
  }
`;

const DeviceMetaCount = styled(Span)`
  color: ${({ theme }) => theme.palette.grey[700]};
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-direction: row;
    align-items: center;

    ${ButtonWrapper} {
      margin-top: inherit;
      margin-bottom: inherit;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    ${ButtonWrapper} {
      margin-top: ${({ theme }) => theme.space.md};
    }
  }
`;

export const Metas = ({
  campaign,
}: {
  campaign: GetCampaignsByCidApiResponse;
}) => {
  const { status } = campaign;
  const { isHub, entityId } = useOutletContext<CampaignHubContext>();
  const isEntityArchived = !isHub && Boolean(campaign.isArchived);
  const watcherEntityId = isHub ? entityId : campaign.id.toString();
  const [isImportMediaModalOpen, setIsImportMediaModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const { setIsOpen: setIsMoveModalOpen } = useMoveCampaignModalContext();
  const prefix = isHub ? 'hubs' : 'campaigns';
  const campaignRoute = useLocalizeRoute(`${prefix}/${entityId}`);
  const insightsRoute = useLocalizeRoute(`${prefix}/${entityId}/insights`);
  const { t } = useTranslation();
  const { track } = useAnalytics();
  const { hasFeatureFlag } = useFeatureFlag();
  const hasWorkspaceAccess = useCanAccessToActiveWorkspace();

  const hasTaggingToolFeature = hasFeatureFlag(FEATURE_FLAG_TAGGING_TOOL);

  const {
    data: videos,
    isLoading,
    isFetching: isFetchingVideos,
    isError,
  } = useGetCampaignsByCidVideosQuery({ cid: campaign.id.toString() });

  const {
    data: observations,
    isLoading: isLoadingObservations,
    isFetching: isFetchingObservations,
  } = useGetCampaignsByCidObservationsQuery(
    {
      cid: entityId,
    },
    {
      skip: !entityId,
    }
  );

  const { data: projectsData } = useActiveWorkspaceProjects();

  const projects = projectsData?.items;
  const filteredProjects = projects?.filter(
    (item) => item.id !== campaign.project.id
  );

  const totalVideos = videos?.items.length ?? 0;

  const deviceCounts = (videos?.items || []).reduce(
    (acc, video) => {
      const formFactor = video.device?.formFactor;

      if (formFactor === 'desktop') {
        acc.desktop += 1;
      } else if (formFactor === 'smartphone') {
        acc.smartphone += 1;
      } else if (formFactor === 'tablet') {
        acc.tablet += 1;
      } else {
        acc.unknown += 1;
      }

      return acc;
    },
    { desktop: 0, smartphone: 0, tablet: 0, unknown: 0 }
  );

  const deviceMetas = [
    {
      key: 'desktop',
      label: t('__VIDEOS_LIST_DESKTOP_TITLE'),
      count: deviceCounts.desktop,
    },
    {
      key: 'smartphone',
      label: t('__VIDEOS_LIST_SMARTPHONE_TITLE'),
      count: deviceCounts.smartphone,
    },
    {
      key: 'tablet',
      label: t('__VIDEOS_LIST_TABLET_TITLE'),
      count: deviceCounts.tablet,
    },
    {
      key: 'unknown',
      label: t('__VIDEOS_LIST_UNKNOWN_DEVICE_TITLE'),
      count: deviceCounts.unknown,
    },
  ].filter((item) => item.count > 0);

  const severities = observations ? getAllSeverityTags(observations) : [];

  if ((isLoading && !videos) || (isLoadingObservations && !observations))
    return <Skeleton width="200px" height="20px" />;
  if (isError) return null;

  return (
    <>
      <FooterContainer>
        <PageMeta>
          <Span isBold style={{ color: appTheme.palette.blue[600] }}>
            {totalVideos}{' '}
            {t('__VIDEOS_LIST_META_VIDEO_COUNT', { count: totalVideos })}
          </Span>
          {campaign.start_date && (
            <Span style={{ color: appTheme.palette.grey[700] }}>
              {formatApiDateShortMonthYear(campaign.start_date)}
            </Span>
          )}
          {isFetchingVideos ? (
            <StyledSkeleton width="400px" height="20px" />
          ) : (
            <>
              {deviceMetas.length > 0 && <StyledPipe />}
              {deviceMetas.map((deviceMeta) => (
                <DeviceMetaItem key={deviceMeta.key}>
                  {getDeviceIcon(deviceMeta.key)}
                  {deviceMeta.label}{' '}
                  <DeviceMetaCount>{deviceMeta.count}</DeviceMetaCount>
                </DeviceMetaItem>
              ))}
            </>
          )}
          {totalVideos > 0 && severities.length > 0 && <StyledPipe />}
          {isFetchingObservations ? (
            <StyledSkeleton width="400px" height="20px" />
          ) : (
            <SeveritiesMetaContainer>
              {severities.map((severity) => (
                <Meta
                  key={severity.name}
                  size="large"
                  color={severity.style}
                  secondaryText={severity.count}
                >
                  {capitalizeFirstLetter(severity.name)}
                </Meta>
              ))}
            </SeveritiesMetaContainer>
          )}
          {!isHub && <StatusMeta status={status.name as CampaignStatus} />}
        </PageMeta>
        <ButtonWrapper>
          {/* TODO: Re-enable user invites and watchers when isHub = true */}
          {!isHub && !isEntityArchived && hasWorkspaceAccess && (
            <CampaignSettings />
          )}
          {!isHub && !isEntityArchived && (
            <WatcherList campaignId={watcherEntityId} />
          )}
          {isHub && totalVideos > 0 && (
            <Button
              isPrimary
              isAccent
              onClick={() => {
                track('mediaUploadModalOpened', {
                  source: 'media_list',
                });
                setIsImportMediaModalOpen(true);
              }}
            >
              {t('__UX_CAMPAIGN_PAGE_NAVIGATION_VIDEO_LIST_CTA_UPLOAD_MEDIA')}
            </Button>
          )}
          {!isHub && (
            <Link to={campaignRoute}>
              <Tooltip
                content={t('__UX_CAMPAIGN_PAGE_NAVIGATION_DASHBOARD_TOOLTIP')}
                size="medium"
                type="light"
                placement="auto"
              >
                <IconButton isBasic={false}>
                  <DashboardIcon />
                </IconButton>
              </Tooltip>
            </Link>
          )}
          {hasTaggingToolFeature && totalVideos > 0 && (
            <Link to={insightsRoute}>
              <Tooltip
                content={t('__UX_CAMPAIGN_PAGE_NAVIGATION_INSIGHTS_TOOLTIP')}
                size="medium"
                type="light"
                placement="auto"
              >
                <IconButton isBasic={false}>
                  <InsightsIcon />
                </IconButton>
              </Tooltip>
            </Link>
          )}
          {!isHub && (
            <>
              <StyledPipe />
              <ButtonMenu
                onSelect={(value) => {
                  if (value === 'archive') {
                    setIsArchiveModalOpen(true);
                  } else if (value === 'move') {
                    setIsMoveModalOpen(true);
                  }
                }}
                label={(props) => (
                  <IconButton {...props}>
                    <DotsIcon />
                  </IconButton>
                )}
              >
                <ButtonMenu.Item
                  isDisabled={!isHub && status.name !== 'closed'}
                  value="archive"
                  icon={<InboxFill />}
                >
                  {t('__CAMPAIGN_PAGE_DOTS_MENU_ARCHIVE_CAMPAIGN_BUTTON')}
                </ButtonMenu.Item>
                <ButtonMenu.Item
                  isDisabled={
                    !filteredProjects || filteredProjects.length === 0
                  }
                  value="move"
                  icon={<EditRedoStroke />}
                >
                  {t('__CAMPAIGN_PAGE_DOTS_MENU_MOVE_CAMPAIGN_BUTTON')}
                </ButtonMenu.Item>
              </ButtonMenu>
            </>
          )}
        </ButtonWrapper>
      </FooterContainer>
      {isHub && (
        <ImportMediaModal
          isOpen={isImportMediaModalOpen}
          onClose={() => setIsImportMediaModalOpen(false)}
          hubId={entityId}
        />
      )}
      {isArchiveModalOpen && (
        <ArchiveCampaignModal
          campaign={campaign}
          onClose={() => setIsArchiveModalOpen(false)}
        />
      )}
    </>
  );
};
