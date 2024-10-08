import {
  Anchor,
  MD,
  PageHeader,
  Skeleton,
  Span,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import {
  useGetCampaignsByCidQuery,
  useGetVideosByVidObservationsQuery,
  useGetVideosByVidQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { Meta } from 'src/common/components/Meta';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { styled } from 'styled-components';
import { getSeverityTagsByVideoCount } from '../Videos/utils/getSeverityTagsWithCount';

const SeveritiesMetaContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const SeveritiesMetaText = styled.div`
  margin-right: ${({ theme }) => theme.space.sm};
`;
const StyledUseCaseName = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-left: auto;
`;
const StyledPageHeaderMeta = styled(PageHeader.Meta)`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${StyledUseCaseName} {
      display: block;
      width: 100%;
      margin-top: ${({ theme }) => theme.space.xs};
    }
  }
`;

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
  } = useGetVideosByVidQuery({
    vid: videoId || '',
  });
  const {
    data: observations,
    isLoading: isLoadingObservations,
    isFetching: isFetchingObservations,
    isError: isErrorObservations,
  } = useGetVideosByVidObservationsQuery({
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
        <PageHeader.Main mainTitle={t('__VIDEO_PAGE_TITLE')}>
          <PageHeader.Breadcrumbs>
            <Link to={campaignRoute}>
              <Anchor id="breadcrumb-parent">{campaign.customer_title}</Anchor>
            </Link>
            <Link to={videosRoute}>
              <Anchor id="breadcrumb-parent">{t('__VIDEOS_PAGE_TITLE')}</Anchor>
            </Link>
          </PageHeader.Breadcrumbs>
          <PageHeader.Description>
            <Span isBold>
              T{video.tester.id} | {video.tester.name}
            </Span>
          </PageHeader.Description>
          <StyledPageHeaderMeta>
            {severities && severities.length > 0 && (
              <>
                <SeveritiesMetaText>
                  <Trans
                    i18nKey="__VIDEO_LIST_META_SEVERITIES_COUNT"
                    count={observations.length}
                    values={{ count: observations.length }}
                    components={{
                      span: (
                        <Span
                          isBold
                          style={{ color: appTheme.palette.blue[600] }}
                        />
                      ),
                      md: <MD />,
                    }}
                    default="<md>You have found <span>{{ count }}</span> observations:</md>"
                  />
                </SeveritiesMetaText>
                <SeveritiesMetaContainer>
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
              </>
            )}
            <StyledUseCaseName>
              {capitalizeFirstLetter(video.usecase.name)} -{' '}
              {capitalizeFirstLetter(video.tester.device.type)}
            </StyledUseCaseName>
          </StyledPageHeaderMeta>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default VideoPageHeader;
