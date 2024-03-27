import { Col, Grid, Row, Skeleton } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useGetCampaignsByCidVideoQuery } from 'src/features/api';
import Empty from './Empty';
import { Video } from './Video';

const VideosPageContent = () => {
  const { campaignId } = useParams();

  const { data, isFetching, isLoading, isError } =
    useGetCampaignsByCidVideoQuery({
      cid: campaignId || '',
    });

  if ((!data && (!isLoading || !isFetching)) || isError) return null;

  if (data && data.items.length === 0) {
    return <Empty />;
  }

  return (
    <LayoutWrapper>
      {isLoading ? (
        <Skeleton height="300px" style={{ borderRadius: 0 }} />
      ) : (
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <Grid>
            {data.items.map((item, index) => (
              <Row>
                <Col>
                  <h2>
                    UseCase #{index + 1} ({item.videos.length} video)
                  </h2>
                  {item.usecase.title}
                  {item.usecase.description}
                  {item.videos.map((video) => (
                    <Video video={video} />
                  ))}
                </Col>
              </Row>
            ))}
          </Grid>
        </div>
      )}
    </LayoutWrapper>
  );
};

export default VideosPageContent;
