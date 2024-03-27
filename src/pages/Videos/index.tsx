import { Page } from 'src/features/templates/Page';
import { useGetCampaignsByCidVideoQuery } from 'src/features/api';
import { Skeleton } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import VideosPageHeader from './PageHeader';
import VideosPageContent from './Content';

const VideosPage = () => {
  const { campaignId } = useParams();

  const {
    data: videos,
    isFetching,
    isLoading,
    isError,
  } = useGetCampaignsByCidVideoQuery({
    cid: campaignId || '',
  });

  if (isError) return null;

  return (
    <Page
      title="Videos Page"
      className="videos-page"
      pageHeader={<VideosPageHeader />}
      route="videos"
    >
      {isLoading ? (
        <Skeleton />
      ) : (
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          {videos && <VideosPageContent items={videos} />}
        </div>
      )}
    </Page>
  );
};

export default VideosPage;
