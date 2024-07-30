import {
  Anchor,
  IconButton,
  MD,
  PageHeader,
  Skeleton,
  Tooltip,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { CampaignSettings } from 'src/common/components/inviteUsers/campaignSettings';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { FEATURE_FLAG_TAGGING_TOOL } from 'src/constants';
import { useGetCampaignsByCidQuery } from 'src/features/api';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { styled } from 'styled-components';
import { ReactComponent as VideoListIcon } from '@zendeskgarden/svg-icons/src/16/play-circle-stroke.svg';
import { ReactComponent as DashboardIcon } from 'src/assets/icons/dashboard-icon.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: ${({ theme }) => theme.space.sm};
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-direction: column;
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

const VideoPageHeader = () => {
  const { campaignId } = useParams();
  const { t } = useTranslation();
  const videosRoute = useLocalizeRoute(`campaigns/${campaignId}/videos`);
  const campaignRoute = useLocalizeRoute(`campaigns/${campaignId}`);
  const { hasFeatureFlag } = useFeatureFlag();

  const hasTaggingToolFeature = hasFeatureFlag(FEATURE_FLAG_TAGGING_TOOL);

  const {
    data: campaign,
    isFetching: isFetchingCampaign,
    isLoading: isLoadingCampaign,
    isError: isErrorCampaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId || '',
  });

  if (!campaign || isErrorCampaign) return null;

  if (isFetchingCampaign || isLoadingCampaign) return <Skeleton />;

  return (
    <LayoutWrapper isNotBoxed>
      <PageHeader
        style={{ padding: `${appTheme.space.xl} 0 ${appTheme.space.md}` }}
      >
        <PageHeader.Main mainTitle={t('__INSIGHTS_PAGE_TITLE')}>
          <PageHeader.Breadcrumbs>
            <Link to={campaignRoute}>
              <Anchor id="breadcrumb-parent">{campaign.customer_title}</Anchor>
            </Link>
            <Link to={videosRoute}>
              <Anchor id="breadcrumb-parent">{t('__VIDEOS_PAGE_TITLE')}</Anchor>
            </Link>
          </PageHeader.Breadcrumbs>

          <Wrapper>
            <PageHeader.Title>{t('__INSIGHTS_PAGE_TITLE')}</PageHeader.Title>
            <ButtonWrapper>
              <CampaignSettings />
              <MD color={appTheme.palette.blue[600]}>
                {' '}
                {t('__INSIGHTS_PAGE_NAVIGATION_LABEL')}
              </MD>
              <Link to={campaignRoute}>
                <Tooltip
                  content={t('__UX_CAMPAIGN_PAGE_NAVIGATION_DASHBOARD_TOOLTIP')}
                  size="medium"
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
                    size="medium"
                    type="light"
                    placement="top"
                  >
                    <IconButton isBasic={false}>
                      <VideoListIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
              )}
            </ButtonWrapper>
          </Wrapper>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default VideoPageHeader;
