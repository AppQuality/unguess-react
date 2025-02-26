import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { Page } from 'src/features/templates/Page';

const Templates = () => {
  console.log('Templates');

  return (
    <Page title="temp" route="templates">
      <Grid>
        <Row>
          <Col sm="8">asd</Col>
          <Col sm="4">ads</Col>
        </Row>
      </Grid>
    </Page>
  );
};

export default Templates;
