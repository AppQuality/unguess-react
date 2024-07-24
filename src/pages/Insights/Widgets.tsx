import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { ObservedThemesWidget } from './Widgets/ObservedThemesWidget';
import { ProgressMonitoringWidget } from './Widgets/ProgressMonitoringWidget';
import { UserAnalysisWidget } from './Widgets/UserAnalysisWidget';

const Widgets = () => {
  const { campaignId } = useParams();

  if (!campaignId) {
    return null;
  }

  return (
    <Grid>
      <Row>
        <Col sm={3}>
          <UserAnalysisWidget campaignId={campaignId} />
        </Col>
        <Col sm={3}>
          <ObservedThemesWidget campaignId={campaignId} />
        </Col>
        <Col sm={6}>
          <ProgressMonitoringWidget campaignId={campaignId} />
        </Col>
      </Row>
    </Grid>
  );
};

export { Widgets };
