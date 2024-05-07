import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import Actions from './Actions';
import { VideoPlayer } from './components/Player';

const VideoPageContent = () => (
  <LayoutWrapper isNotBoxed style={{ paddingRight: 0 }}>
    <Grid gutters="xxl">
      <Row>
        <Col lg={8} style={{ margin: 0 }}>
          <VideoPlayer />
        </Col>
        <Col lg={4} style={{ margin: 0 }}>
          <Actions />
        </Col>
      </Row>
    </Grid>
  </LayoutWrapper>
);

export default VideoPageContent;
