import {
  Anchor,
  PageHeader,
  Skeleton,
  XL,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useOutletContext, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import type { CampaignHubContext } from 'src/features/templates/CampaignsHubsMiddleware';
import {
  useGetCampaignsByCidQuery,
  useGetVideosByVidQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { ShortcutHelper } from './ShortcutHelper';
import UsecaseSelect from './UsecaseSelect';
import VideoPagination from './VideoPagination';

const VideoPageHeader = () => {
  const { isHub, entityId } = useOutletContext<CampaignHubContext>();
  const { videoId } = useParams();
  const { t } = useTranslation();
  const prefix = isHub ? 'hubs' : 'campaigns';
  const videosRoute = useLocalizeRoute(`${prefix}/${entityId}/videos`);
  const entityRoute = useLocalizeRoute(`${prefix}/${entityId}`);
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
  } = useGetCampaignsByCidQuery(
    {
      cid: entityId,
    },
    {
      skip: isHub,
    }
  );

  if (!video || isErrorVideo) return null;
  if (!isHub && (!campaign || isErrorCampaign)) return null;
  if (isFetchingVideo || isLoadingVideo) return <Skeleton />;
  if (!isHub && (isFetchingCampaign || isLoadingCampaign)) return <Skeleton />;

  return (
    <LayoutWrapper
      isNotBoxed
      style={{
        borderBottom: `1px solid ${appTheme.palette.grey[300]}`,
        position: 'fixed',
        top: 0,
        zIndex: appTheme.levels.front,
        backgroundColor: appTheme.palette.white,
        height: 130,
      }}
    >
      <PageHeader
        style={{
          padding: `${appTheme.space.lg} 0 ${appTheme.space.md}`,
          border: 'none',
        }}
      >
        <PageHeader.Main mainTitle={t('__VIDEO_PAGE_TITLE')}>
          <PageHeader.Breadcrumbs>
            <Link to={entityRoute}>
              <Anchor id="breadcrumb-parent">
                {isHub ? t('__HUB_PAGE_TITLE') : campaign?.customer_title}
              </Anchor>
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
                  />
                )}

                {video && (
                  <VideoPagination
                    currentUsecaseId={usecaseId}
                    video={video}
                  />
                )}

                <div>
                  <ShortcutHelper />
                </div>
              </div>
            </div>
          </PageHeader.Description>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default VideoPageHeader;
