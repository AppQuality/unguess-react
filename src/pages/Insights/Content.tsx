import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';

const InsightsPageContent = () => (
  <LayoutWrapper isNotBoxed style={{ padding: 0 }}>
    <Grid gutters="xxl">
      <Row>
        <Col lg={8} style={{ margin: 0, paddingRight: 0 }}>
          Insights Page Content
        </Col>
      </Row>
    </Grid>
  </LayoutWrapper>
);

export default InsightsPageContent;
