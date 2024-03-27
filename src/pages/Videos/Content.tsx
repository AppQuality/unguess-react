import { Button, Col, Grid, Row } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { GetCampaignsByCidVideoApiResponse } from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

const VideosPageContent = ({
  items: { items },
}: {
  items: GetCampaignsByCidVideoApiResponse;
}) => {
  const { campaignId } = useParams();
  const { t } = useTranslation();

  return (
    <LayoutWrapper>
      <Grid>
        {items.map((item, index) => (
          <Row>
            <Col>
              <h2>
                UseCase #{index + 1} ({item.videos.length} video)
              </h2>
              {item.usecase.title}
              {item.usecase.description}
              {item.videos.map((video) => {
                const videoUrl = useLocalizeRoute(
                  `campaigns/${campaignId}/videos/${video.id}`
                );

                return (
                  <>
                    <hr />
                    <p>
                      <p>{video.id}</p>
                      <p>{video.url}</p>
                      <p>{video.streamUrl}</p>
                      <p>
                        {video.tester.name} {video.tester.id}
                      </p>
                      <Link to={videoUrl}>
                        <Button id="button-bugs-list-header" isPrimary isAccent>
                          {t('__VIDEOS_PAGE_BUTTON_DETAIL_VIDEO')}
                        </Button>
                      </Link>
                    </p>
                  </>
                );
              })}
            </Col>
          </Row>
        ))}
      </Grid>
    </LayoutWrapper>
  );
};

export default VideosPageContent;
