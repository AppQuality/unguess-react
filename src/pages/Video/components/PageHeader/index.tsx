import {
  Anchor,
  PageHeader,
  Skeleton,
  XL,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import {
  useGetCampaignsByCidQuery,
  useGetVideosByVidQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import UsecaseSelect from './UsecaseSelect';
import VideoPagination from './VideoPagination';

const VideoPageHeader = () => {
  const { campaignId, videoId } = useParams();
  const { t } = useTranslation();
  const videosRoute = useLocalizeRoute(`campaigns/${campaignId}/videos`);
  const campaignRoute = useLocalizeRoute(`campaigns/${campaignId}`);
  const {
    data: video,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideosByVidQuery({
    vid: videoId || '',
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const usecaseId =
    video?.usecase.id || Number(queryParams.get('usecase')) || 0;

  const {
    data: campaign,
    isFetching: isFetchingCampaign,
    isLoading: isLoadingCampaign,
    isError: isErrorCampaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId || '',
  });

  if (!video || isErrorVideo) return null;
  if (!campaign || isErrorCampaign) return null;
  if (isFetchingVideo || isLoadingVideo) return <Skeleton />;
  if (isFetchingCampaign || isLoadingCampaign) return <Skeleton />;

  return (
    <LayoutWrapper isNotBoxed>
      <PageHeader
        style={{ padding: `${appTheme.space.lg} 0 ${appTheme.space.md}` }}
      >
        <PageHeader.Main mainTitle={t('__VIDEO_PAGE_TITLE')}>
          <PageHeader.Breadcrumbs>
            <Link to={campaignRoute}>
              <Anchor id="breadcrumb-parent">{campaign.customer_title}</Anchor>
            </Link>
            <Link to={videosRoute}>
              <Anchor id="breadcrumb-parent">{t('__VIDEOS_PAGE_TITLE')}</Anchor>
            </Link>
          </PageHeader.Breadcrumbs>
          <PageHeader.Description
            style={{ width: '100%', marginBottom: appTheme.space.sm }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <XL
                isBold
                style={{
                  color: appTheme.palette.blue[600],
                }}
              >
                {capitalizeFirstLetter(video.tester.name)}
              </XL>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: appTheme.space.md,
                }}
              >
                {usecaseId && (
                  <UsecaseSelect
                    currentUsecaseId={usecaseId}
                    campaignId={campaignId}
                  />
                )}

                {video && (
                  <VideoPagination
                    currentUsecaseId={usecaseId}
                    campaignId={campaignId}
                    video={video}
                  />
                )}
              </div>
            </div>
          </PageHeader.Description>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default VideoPageHeader;
