import {
  Anchor,
  PageHeader,
  Skeleton,
  Span,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import {
  useGetCampaignsByCidQuery,
  useGetVideoByVidObservationsQuery,
  useGetVideoByVidQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { Meta } from 'src/common/components/Meta';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { getSeverityTagsByVideoCount } from '../Videos/utils/getSeverityTagsWithCount';
import { SeveritiesMetaContainer, SeveritiesMetaText } from '../Videos/Metas';

const VideoPageHeader = () => {
  const { campaignId, videoId } = useParams();
  const { t } = useTranslation();
  const videosRoute = useLocalizeRoute(`campaigns/${campaignId}/videos`);
  const campaignRoute = useLocalizeRoute(`campaigns/${campaignId}`);

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
  const {
    data: observations,
    isLoading: isLoadingObservations,
    isFetching: isFetchingObservations,
    isError: isErrorObservations,
  } = useGetVideoByVidObservationsQuery({
    vid: videoId || '',
  });

  const severities = observations
    ? getSeverityTagsByVideoCount(observations)
    : [];

  if (!video || isErrorVideo) return null;
  if (!campaign || isErrorCampaign) return null;
  if (!observations || isErrorObservations) return null;

  if (isFetchingVideo || isLoadingVideo) return <Skeleton />;
  if (isFetchingCampaign || isLoadingCampaign) return <Skeleton />;
  if (isFetchingObservations || isLoadingObservations) return <Skeleton />;

  return (
    <LayoutWrapper isNotBoxed>
      <PageHeader style={{ padding: `${appTheme.space.xs} 0` }}>
        <PageHeader.Main
          mainTitle={t('__VIDEO_PAGE_TITLE')}
          style={{ padding: 0 }}
        >
          <PageHeader.Breadcrumbs>
            <Link to={campaignRoute}>
              <Anchor id="breadcrumb-parent">{campaign.customer_title}</Anchor>
            </Link>
            <Link to={videosRoute}>
              <Anchor id="breadcrumb-parent">{t('__VIDEOS_PAGE_TITLE')}</Anchor>
            </Link>
          </PageHeader.Breadcrumbs>
          <PageHeader.Description style={{ margin: 0 }}>
            <Span isBold style={{ margin: 0 }}>
              T{video.tester.id} | {video.tester.name} {video.tester.surname}
            </Span>
          </PageHeader.Description>
          <PageHeader.Meta>
            {severities && (
              <SeveritiesMetaContainer>
                <SeveritiesMetaText>
                  {t('__VIDEO_LIST_META_SEVERITIES_COUNT')}
                </SeveritiesMetaText>
                {severities.map((severity) => (
                  <Meta
                    size="large"
                    color={severity.style}
                    secondaryText={severity.count}
                  >
                    {capitalizeFirstLetter(severity.name)}
                  </Meta>
                ))}
              </SeveritiesMetaContainer>
            )}
          </PageHeader.Meta>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default VideoPageHeader;
