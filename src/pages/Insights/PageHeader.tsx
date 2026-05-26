import {
  Anchor,
  IconButton,
  Notification,
  PageHeader,
  Skeleton,
  Tooltip,
  useToast,
} from '@appquality/unguess-design-system';
import { ReactComponent as DownloadIcon } from '@zendeskgarden/svg-icons/src/16/download-stroke.svg';
import { ReactComponent as VideoListIcon } from '@zendeskgarden/svg-icons/src/16/play-circle-stroke.svg';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import { Link, useOutletContext } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as DashboardIcon } from 'src/assets/icons/dashboard-icon.svg';
import { CampaignSettings } from 'src/common/components/inviteUsers/campaignSettings';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import type { CampaignHubContext } from 'src/features/templates/CampaignsHubsMiddleware';
import { FEATURE_FLAG_TAGGING_TOOL } from 'src/constants';
import { useGetCampaignsByCidVideosQuery } from 'src/features/api';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { styled } from 'styled-components';
import { useCampaignOrHub } from '../Campaign/pageHeader/useCampaign';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: ${({ theme }) => theme.space.sm};
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    align-self: end;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space.sm};
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    justify-content: flex-start;
  }
`;

const InsightsPageHeader = () => {
  const { isHub, entityId } = useOutletContext<CampaignHubContext>();
  const { t } = useTranslation();
  const { addToast } = useToast();
  const prefix = isHub ? 'hubs' : 'campaigns';
  const videosRoute = useLocalizeRoute(`${prefix}/${entityId}/videos`);
  const entityRoute = useLocalizeRoute(`${prefix}/${entityId}`);
  const { hasFeatureFlag } = useFeatureFlag();
  const hasWorkspaceAccess = useCanAccessToActiveWorkspace();
  const hasTaggingToolFeature = hasFeatureFlag(FEATURE_FLAG_TAGGING_TOOL);

  const { isUserLoading, isLoading, isError, campaign, project } =
    useCampaignOrHub(entityId, isHub);

  const { data: videos } = useGetCampaignsByCidVideosQuery(
    { cid: campaign?.id?.toString() ?? '' },
    { skip: !campaign?.id }
  );

  const totalVideos = videos?.items.length ?? 0;

  if (!campaign || isError || isUserLoading) return null;

  if (isLoading) return <Skeleton />;

  const handleUseCaseExport = () => {
    fetch(`${process.env.REACT_APP_CROWD_WP_URL}/wp-admin/admin-ajax.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify({
        id: entityId,
        action: 'ug_generate_research_report',
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.success) {
          window.location.href = `${process.env.REACT_APP_CROWD_WP_URL}/wp-content/themes/unguess/report/temp/${res.data.file}`;
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="success"
                message={t('__VIDEO_PAGE_ACTIONS_EXPORT_TOAST_SUCCESS_MESSAGE')}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
        } else {
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="error"
                message={t('__VIDEO_PAGE_ACTIONS_EXPORT_TOAST_ERROR_MESSAGE')}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
        }
      })
      .catch((e) => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={t('__VIDEO_PAGE_ACTIONS_EXPORT_TOAST_ERROR_MESSAGE')}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
        // eslint-disable-next-line no-console
        console.error(e.message);
      });
  };

  return (
    <LayoutWrapper isNotBoxed>
      <PageHeader
        style={{ padding: `${appTheme.space.xl} 0 ${appTheme.space.md}` }}
      >
        <PageHeader.Main mainTitle={t('__INSIGHTS_PAGE_TITLE')}>
          <PageHeader.Breadcrumbs>
            {project.hasAccess ? (
              <Link to={project.route}>
                <Anchor id="breadcrumb-project">{project.name}</Anchor>
              </Link>
            ) : (
              project.name
            )}
            <Link to={entityRoute}>
              <Anchor id="breadcrumb-parent">{campaign.customer_title}</Anchor>
            </Link>
          </PageHeader.Breadcrumbs>

          <Wrapper>
            <PageHeader.Title>{t('__INSIGHTS_PAGE_TITLE')}</PageHeader.Title>
            <ButtonWrapper>
              {!isHub && !campaign?.isArchived && hasWorkspaceAccess && (
                <CampaignSettings />
              )}
              <Link to={entityRoute}>
                <Tooltip
                  content={t('__UX_CAMPAIGN_PAGE_NAVIGATION_DASHBOARD_TOOLTIP')}
                  size="small"
                  type="light"
                  placement="top"
                >
                  <IconButton isBasic={false}>
                    <DashboardIcon />
                  </IconButton>
                </Tooltip>
              </Link>
              {hasTaggingToolFeature && (
                <Link to={videosRoute}>
                  <Tooltip
                    content={t(
                      '__UX_CAMPAIGN_PAGE_NAVIGATION_VIDEO_LIST_TOOLTIP'
                    )}
                    size="small"
                    type="light"
                    placement="top"
                  >
                    <IconButton isBasic={false}>
                      <VideoListIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
              )}
              {totalVideos > 0 && (
                <Tooltip
                  content={t('__VIDEO_PAGE_ACTIONS_EXPORT_BUTTON_LABEL')}
                  size="small"
                  type="light"
                  placement="top"
                >
                  <IconButton isAccent isPrimary onClick={handleUseCaseExport}>
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              )}
            </ButtonWrapper>
          </Wrapper>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default InsightsPageHeader;
