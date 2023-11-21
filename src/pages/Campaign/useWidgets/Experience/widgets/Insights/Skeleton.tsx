import { Col, Grid, Row, Skeleton } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';

export const InsightsSkeleton = () => (
  <Row style={{ marginTop: appTheme.space.md }}>
    <Col xs={12} lg={6} xl={4}>
      <Skeleton width="100%" height="800px" />
    </Col>
    <Col xs={12} lg={6} xl={8}>
      <Grid>
        <Row style={{ padding: `${appTheme.space.lg} 0 ${appTheme.space.md}` }}>
          <Skeleton width="100%" height="50px" />
        </Row>
        <Row>
          <Col xs={6} style={{ margin: 0 }}>
            <Skeleton width="100%" height="350px" />
          </Col>
          <Col xs={6} style={{ margin: 0 }}>
            <Skeleton width="100%" height="350px" />
          </Col>
          <Col xs={6} style={{ marginTop: appTheme.space.sm }}>
            <Skeleton width="100%" height="350px" />
          </Col>
          <Col xs={6} style={{ marginTop: appTheme.space.sm }}>
            <Skeleton width="100%" height="350px" />
          </Col>
        </Row>
      </Grid>
    </Col>
  </Row>
);
