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
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  useGetCampaignsByCidVideosQuery,
  useGetHubsByHidQuery,
} from 'src/features/api';

const HubVideosPageHeader = () => {
  const { hubId } = useParams();
  const { t } = useTranslation();
  const hubRoute = useLocalizeRoute(`hubs/${hubId}`);

  const { data: hub, isLoading: isLoadingHub } = useGetHubsByHidQuery(
    { hid: hubId ?? '' },
    { skip: !hubId }
  );

  const { data: videos, isLoading: isLoadingVideos } =
    useGetCampaignsByCidVideosQuery({ cid: hubId ?? '' }, { skip: !hubId });

  const totalVideos = videos?.items.length ?? 0;

  if (isLoadingHub) return <Skeleton height="80px" />;
  if (!hub) return null;

  return (
    <LayoutWrapper isNotBoxed>
      <PageHeader>
        <PageHeader.Breadcrumbs>
          <Link to={hubRoute}>
            <Anchor id="breadcrumb-hub">{hub.title}</Anchor>
          </Link>
        </PageHeader.Breadcrumbs>
        <PageHeader.Main mainTitle={t('__VIDEOS_PAGE_TITLE')}>
          <PageHeader.Title>{t('__VIDEOS_PAGE_TITLE')}</PageHeader.Title>
          <PageHeader.Meta>
            {isLoadingVideos ? (
              <Skeleton width="80px" height="20px" />
            ) : (
              <Span isBold style={{ color: appTheme.palette.blue[600] }}>
                {totalVideos}{' '}
                {t('__VIDEOS_LIST_META_VIDEO_COUNT', { count: totalVideos })}
              </Span>
            )}
          </PageHeader.Meta>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default HubVideosPageHeader;
