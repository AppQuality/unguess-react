import {
  Col,
  Grid,
  LG,
  Row,
  Skeleton,
  Span,
} from '@appquality/unguess-design-system';
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

  if (isError) return null;

  if (data && data.items.length === 0) {
    return <Empty />;
  }

  const usecases = data?.items.filter((item) => item.videos.length > 0);

  return (
    <LayoutWrapper>
      {isLoading ? (
        <Skeleton height="300px" style={{ borderRadius: 0 }} />
      ) : (
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <Grid>
            {usecases?.map((item) => (
              <Row>
                <Col>
                  <LG>
                    <Span isBold>{item.usecase.title}</Span> (
                    {item.videos.length} video)
                  </LG>
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
