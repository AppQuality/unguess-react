import {
  Button,
  ButtonMenu,
  IconButton,
  MD,
  Skeleton,
  Tooltip,
} from '@appquality/unguess-design-system';
import { ReactComponent as InsightsIcon } from '@zendeskgarden/svg-icons/src/16/lightbulb-stroke.svg';
import { ReactComponent as ExternalLinkIcon } from '@zendeskgarden/svg-icons/src/16/new-window-stroke.svg';
import { ReactComponent as DotsIcon } from '@zendeskgarden/svg-icons/src/16/overflow-vertical-stroke.svg';
import { ReactComponent as VideoListIcon } from '@zendeskgarden/svg-icons/src/16/play-circle-stroke.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EditRedoStroke } from 'src/assets/icons/move-icon.svg';
import { ReactComponent as InboxFill } from 'src/assets/icons/project-archive.svg';
import { Divider } from 'src/common/components/divider';
import { CampaignSettings } from 'src/common/components/inviteUsers/campaignSettings';
import { StatusMeta } from 'src/common/components/meta/StatusMeta';
import { PageMeta } from 'src/common/components/PageMeta';
import { Pipe } from 'src/common/components/Pipe';
import { FEATURE_FLAG_TAGGING_TOOL } from 'src/constants';
import {
  CampaignWithOutput,
  useGetCampaignsByCidMetaQuery,
  useGetCampaignsByCidQuery,
} from 'src/features/api';
import { useActiveWorkspaceProjects } from 'src/hooks/useActiveWorkspaceProjects';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useVideos } from 'src/pages/Videos/useVideos';
import { CampaignStatus } from 'src/types';
import styled from 'styled-components';
import { ArchiveCampaignModal } from '../../ArchiveCampaignModal';
import { useMoveCampaignModalContext } from '../../MoveCampaignModal';
import { CampaignDurationMeta } from './CampaignDurationMeta';
import { DesktopMeta } from './DesktopMeta';
import { SmartphoneMeta } from './SmartphoneMeta';
import { TabletMeta } from './TabletMeta';
import { TvMeta } from './TvMeta';

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: ${({ theme }) => theme.space.sm};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
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
  campaign: CampaignWithOutput & { isArchived?: boolean };
}) => {
  const { start_date, end_date, type, status, outputs, family, isArchived } =
    campaign;
  const { t } = useTranslation();
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const { setIsOpen: setIsMoveModalOpen } = useMoveCampaignModalContext();
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState<boolean>(false);
  const { hasFeatureFlag } = useFeatureFlag();
  const hasTaggingToolFeature = hasFeatureFlag(FEATURE_FLAG_TAGGING_TOOL);
  const functionalDashboardRoute = useLocalizeRoute(
    `campaigns/${campaign.id}/bugs`
  );
  const videoDashboardRoute = useLocalizeRoute(
    `campaigns/${campaign.id}/videos`
  );
  const navigate = useNavigate();
  const insightsRoute = useLocalizeRoute(`campaigns/${campaign.id}/insights`);
  const hasWorkspaceAccess = useCanAccessToActiveWorkspace();

  const {
    data: meta,
    isLoading,
    isFetching,
  } = useGetCampaignsByCidMetaQuery({ cid: campaign.id.toString() });
  const { data: campaignData } = useGetCampaignsByCidQuery({
    cid: campaign.id.toString(),
  });
  const plan = campaignData?.plan;
  const {
    sorted: videos,
    isLoading: isLoadingVideos,
    isFetching: isFetchingVideos,
  } = useVideos(campaign.id.toString() ?? '');

  const {
    data: projectsData,
    isLoading: isLoadingProjects,
    isFetching: isFetchingProjects,
    isError: isErrorProjects,
  } = useActiveWorkspaceProjects();

  const projects = projectsData?.items;

  // Filter out the current project
  const filteredProjects = projects?.filter(
    (item) => item.id !== campaign.project.id
  );

  useEffect(() => {
    if (videos) {
      const groupedVideos = videos?.reduce(
        (total, item) => total + item.videos.total,
        0
      );
      setTotalVideos(groupedVideos);
    }
  }, [videos]);

  if (isLoading || isFetching || isLoadingVideos || isFetchingVideos)
    return <Skeleton width="500px" height="20px" />;

  return (
    <>
      <FooterContainer>
        <PageMeta>
          <StatusMeta status={family.name.toLowerCase() as CampaignStatus}>
            {type.name}
          </StatusMeta>
          <StatusMeta status={status.name as CampaignStatus} />
          <CampaignDurationMeta start={start_date} end={end_date} />
          {meta ? (
            <>
              <Pipe />
              {meta.allowed_devices.includes('desktop') && <DesktopMeta />}
              {meta.allowed_devices.includes('smartphone') && (
                <SmartphoneMeta />
              )}
              {meta.allowed_devices.includes('tablet') && <TabletMeta />}
              {meta.allowed_devices.includes('tv') && <TvMeta />}
            </>
          ) : null}
        </PageMeta>
        <ButtonWrapper>
          {!isArchived && hasWorkspaceAccess && <CampaignSettings />}
          {outputs?.includes('bugs') && (
            <Link to={functionalDashboardRoute}>
              <Button id="button-bugs-list-header" isPrimary isAccent>
                {t('__CAMPAIGN_PAGE_BUTTON_DETAIL_BUG')}
              </Button>
            </Link>
          )}
          {hasTaggingToolFeature && totalVideos > 0 && (
            <>
              <MD color={appTheme.palette.blue[600]}>
                {' '}
                {t('__INSIGHTS_PAGE_NAVIGATION_LABEL')}
              </MD>
              <Link to={videoDashboardRoute}>
                <Tooltip
                  content={t(
                    '__UX_CAMPAIGN_PAGE_NAVIGATION_VIDEO_LIST_TOOLTIP'
                  )}
                  size="medium"
                  type="light"
                  placement="top"
                >
                  <IconButton isBasic={false}>
                    <VideoListIcon />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link to={insightsRoute}>
                <Tooltip
                  content={t('__UX_CAMPAIGN_PAGE_NAVIGATION_INSIGHTS_TOOLTIP')}
                  size="medium"
                  type="light"
                  placement="top"
                >
                  <IconButton isBasic={false}>
                    <InsightsIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            </>
          )}
          {hasWorkspaceAccess &&
            !isErrorProjects &&
            !isLoadingProjects &&
            !isFetchingProjects &&
            !isArchived && (
              <ButtonMenu
                onSelect={(value) => {
                  if (value === 'move_campaign') {
                    setIsMoveModalOpen(true);
                  } else if (value === 'archive_campaign') {
                    setIsArchiveModalOpen(true);
                  } else if (value === 'go_to_plan') {
                    navigate(`/plans/${plan}`);
                  }
                }}
                label={(props) => (
                  <IconButton data-qa="extra-actions-menu" {...props}>
                    <DotsIcon />
                  </IconButton>
                )}
              >
                <ButtonMenu.Item
                  isDisabled={
                    !(filteredProjects && filteredProjects.length > 0)
                  }
                  value="move_campaign"
                  icon={<EditRedoStroke />}
                >
                  {t('__CAMPAIGN_PAGE_DOTS_MENU_MOVE_CAMPAIGN_BUTTON')}
                </ButtonMenu.Item>
                <ButtonMenu.Item
                  isDisabled={campaign.status.id !== 2}
                  value="archive_campaign"
                  icon={<InboxFill />}
                >
                  {t('__CAMPAIGN_PAGE_DOTS_MENU_ARCHIVE_CAMPAIGN_BUTTON')}
                </ButtonMenu.Item>
                {!!plan && (
                  <>
                    <Divider />
                    <ButtonMenu.Item
                      value="go_to_plan"
                      icon={<ExternalLinkIcon />}
                    >
                      {t('__CAMPAIGN_PAGE_DOTS_MENU_GO_TO_PLAN_BUTTON')}
                    </ButtonMenu.Item>
                  </>
                )}
              </ButtonMenu>
            )}
        </ButtonWrapper>
      </FooterContainer>
      {isArchiveModalOpen && (
        <ArchiveCampaignModal
          campaign={campaign}
          onClose={() => setIsArchiveModalOpen(false)}
        />
      )}
    </>
  );
};
