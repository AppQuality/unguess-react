import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import Actions from './Actions';
import { VideoPlayer } from './components/Player';

const VideoPageContent = () => (
  <LayoutWrapper isNotBoxed>
    <Grid gutters="xxl">
      <Row>
        <Col lg={8}>
          <VideoPlayer />
        </Col>
        <Col lg={4}>
          <Actions />
        </Col>
      </Row>
    </Grid>
  </LayoutWrapper>
);

export default VideoPageContent;
