import {
  Anchor,
  PageHeader,
  Skeleton,
  Span,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import {
  useGetCampaignsByCidQuery,
  useGetVideoByVidQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

const VideoPageHeader = () => {
  const { campaignId, videoId } = useParams();
  const { t } = useTranslation();
  const campaignRoute = useLocalizeRoute(`campaigns/${campaignId}`);
  const videosRoute = useLocalizeRoute(`campaigns/${campaignId}/videos`);

  const {
    data: campaign,
    isFetching: isFetchingCampaign,
    isLoading: isLoadingCampaign,
    isError: isErrorCampaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId || '',
  });

  const {
    data: video,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideoByVidQuery({
    vid: videoId || '',
  });

  if (!video || isErrorVideo) return null;
  if (!campaign || isErrorCampaign) return null;

  if (isFetchingVideo || isLoadingVideo) return <Skeleton />;
  if (isFetchingCampaign || isLoadingCampaign) return <Skeleton />;

  return (
    <LayoutWrapper isNotBoxed>
      <PageHeader style={{ padding: 0 }}>
        <PageHeader.Main
          mainTitle={t('__VIDEO_PAGE_TITLE')}
          mainDescription={t('__VIDEO_PAGE_DESCRIPTION')}
          style={{ padding: 0 }}
        >
          <PageHeader.Breadcrumbs>
            <Link to={campaignRoute}>
              <Anchor id="breadcrumb-parent">{campaign.project.name}</Anchor>
            </Link>
            <Link to={videosRoute}>
              <Anchor id="breadcrumb-parent">{t('__VIDEOS_PAGE_TITLE')}</Anchor>
            </Link>
          </PageHeader.Breadcrumbs>
          <PageHeader.Description style={{ margin: 0 }}>
            <Span isBold style={{ margin: 0 }}>
              {video.tester.name} {video.tester.surname}
            </Span>
          </PageHeader.Description>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default VideoPageHeader;
