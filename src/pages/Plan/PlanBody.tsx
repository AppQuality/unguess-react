import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { usePlanTab } from './context/planContext';
import { ModulesList } from './ModulesList';
import { PlanDetails } from './navigation/header/PlanDetails';
import { Nav } from './navigation/aside';

export const PlanBody = () => {
  const { activeTab } = usePlanTab();

  // Debug info
  const params = new URLSearchParams(window.location.search);
  const debug = params.get('debug');

  return (
    <Grid style={{ padding: appTheme.space.xxl }}>
      <Row>
        <Col sm="3">
          <Nav />
        </Col>
        <Col sm="6">
          <ModulesList tabId={activeTab} />
        </Col>
        <Col sm="3">{debug && <PlanDetails />}</Col>
      </Row>
    </Grid>
  );
};
