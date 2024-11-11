import {
  Anchor,
  MD,
  PageHeader,
  Pagination,
  Skeleton,
  Span,
} from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { Meta } from 'src/common/components/Meta';
import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidVideosQuery,
  useGetVideosByVidObservationsQuery,
  useGetVideosByVidQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { styled } from 'styled-components';
import { getSeverityTagsByVideoCount } from '../../../Videos/utils/getSeverityTagsWithCount';
import UsecaseSelect from './UsecaseSelect';

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
  const navigate = useNavigate();
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
    data: videosListCurrentUsecase,
    isFetching: isFetchingVideosCU,
    isLoading: isLoadingVideos,
  } = useGetCampaignsByCidVideosQuery(
    {
      cid: campaignId || '',
      filterBy: {
        usecase: usecaseId,
      },
    },
    { skip: !video || !campaignId }
  );

  const {
    data: campaign,
    isFetching: isFetchingCampaign,
    isLoading: isLoadingCampaign,
    isError: isErrorCampaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId || '',
  });

  const paginationData = useMemo(() => {
    if (videosListCurrentUsecase && video) {
      const group = videosListCurrentUsecase.items.filter(
        (item) => item.usecaseId === video.usecase.id
      );
      const videos = [
        ...group.filter((item) => item.tester.device.type === 'desktop'),
        ...group.filter((item) => item.tester.device.type === 'tablet'),
        ...group.filter((item) => item.tester.device.type === 'smartphone'),
        ...group.filter((item) => item.tester.device.type === 'other'),
      ].map((item) => ({ id: item.id }));

      const index = videos.findIndex((item) => item.id === video.id);
      return {
        items: videos,
        total: videos.length,
        currentPage: index + 1,
      };
    }
    return { items: [], total: 0, currentPage: 1 };
  }, [videosListCurrentUsecase, video]);

  const {
    data: observations,
    isLoading: isLoadingObservations,
    isFetching: isFetchingObservations,
  } = useGetVideosByVidObservationsQuery({
    vid: videoId || '',
  });

  const severities = observations
    ? getSeverityTagsByVideoCount(observations)
    : [];

  if (!video || isErrorVideo) return null;
  if (!campaign || isErrorCampaign) return null;
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
          <PageHeader.Description style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Span isBold>
                T{video.tester.id} | {video.tester.name}
              </Span>

              {usecaseId && (
                <UsecaseSelect
                  currentUsecaseId={usecaseId}
                  campaignId={campaignId}
                />
              )}

              {video && paginationData.items.length > 0 ? (
                <Pagination
                  totalPages={paginationData.total}
                  currentPage={paginationData.currentPage}
                  pageGap={2}
                  pagePadding={0}
                  onChange={(page) => {
                    // eslint-disable-next-line no-console
                    const targetId = paginationData.items[page - 1].id;
                    navigate(`/campaigns/${campaignId}/videos/${targetId}`, {
                      replace: true,
                    });
                  }}
                />
              ) : (
                <Skeleton width="200px" height="20px" />
              )}
            </div>
          </PageHeader.Description>
          <StyledPageHeaderMeta>
            {observations && severities && severities.length > 0 && (
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
          </StyledPageHeaderMeta>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default VideoPageHeader;
