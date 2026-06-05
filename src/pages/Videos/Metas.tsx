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
import { format } from 'date-fns';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useOutletContext } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as DashboardIcon } from 'src/assets/icons/dashboard-icon.svg';
import { ReactComponent as EditRedoStroke } from 'src/assets/icons/move-icon.svg';
import { ReactComponent as InboxFill } from 'src/assets/icons/project-archive.svg';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { CampaignSettings } from 'src/common/components/inviteUsers/campaignSettings';
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
import { DesktopMeta } from 'src/pages/Campaign/pageHeader/Meta/DesktopMeta';
import { SmartphoneMeta } from 'src/pages/Campaign/pageHeader/Meta/SmartphoneMeta';
import { TabletMeta } from 'src/pages/Campaign/pageHeader/Meta/TabletMeta';
import { WatcherList } from 'src/pages/Campaign/pageHeader/Meta/WatcherList';
import { CampaignStatus } from 'src/types';
import styled from 'styled-components';
import { ImportMediaModal } from './ImportMediaModal';
import { getAllSeverityTags } from './utils/getSeverityTagsWithCount';

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
  margin-left: ${({ theme }) => theme.space.sm};
`;

const SeveritiesMetaContainer = styled.div`
  display: flex;
  align-items: center;
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
  const { hasFeatureFlag } = useFeatureFlag();
  const hasWorkspaceAccess = useCanAccessToActiveWorkspace();

  const hasTaggingToolFeature = hasFeatureFlag(FEATURE_FLAG_TAGGING_TOOL);

  const {
    data: videos,
    isLoading,
    isError,
  } = useGetCampaignsByCidVideosQuery({ cid: campaign.id.toString() });

  const { data: observations, isLoading: isLoadingObservations } =
    useGetCampaignsByCidObservationsQuery(
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

  // Calculate unique device types from videos (including other)
  const deviceTypes = new Set(
    videos?.items.map((video) => video.device?.formFactor || 'other') || []
  );

  // Count other devices
  const otherDeviceCount =
    videos?.items.filter(
      (video) =>
        video.device?.formFactor === 'other' ||
        video.device?.formFactor === 'unknown'
    ).length || 0;

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
          <StyledPipe />
          {campaign.start_date && (
            <>
              <Span style={{ color: appTheme.palette.grey[700] }}>
                {format(new Date(campaign.start_date), 'dd/MM/yyyy')}
              </Span>
              <StyledPipe />
            </>
          )}
          {(deviceTypes.has('desktop') ||
            deviceTypes.has('smartphone') ||
            deviceTypes.has('tablet') ||
            deviceTypes.has('unknown') ||
            deviceTypes.has('other')) && (
            <>
              {deviceTypes.has('desktop') && <DesktopMeta />}
              {deviceTypes.has('smartphone') && <SmartphoneMeta />}
              {deviceTypes.has('tablet') && <TabletMeta />}
              {(deviceTypes.has('other') || deviceTypes.has('unknown')) && (
                <Span style={{ color: appTheme.palette.grey[700] }}>
                  +{otherDeviceCount} unknown
                </Span>
              )}
              <StyledPipe />
            </>
          )}
          {severities && severities.length > 0 && (
            <>
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
              <StyledPipe />
            </>
          )}
          {!isHub && <StatusMeta status={status.name as CampaignStatus} />}
        </PageMeta>
        <ButtonWrapper>
          {!isEntityArchived && hasWorkspaceAccess && <CampaignSettings />}
          {!isEntityArchived && <WatcherList campaignId={watcherEntityId} />}
          {isHub && totalVideos > 0 && (
            <Button
              isPrimary
              isAccent
              onClick={() => setIsImportMediaModalOpen(true)}
            >
              {t('Import media')}
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
