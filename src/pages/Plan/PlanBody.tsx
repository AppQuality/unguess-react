import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { usePlanTab } from './context/planContext';
import { ModulesList } from './ModulesList';
import { PlanDetails } from './navigation/header/PlanDetails';
import { Nav } from './navigation/aside/Nav';

export const PlanBody = () => {
  const { activeTab } = usePlanTab();

  return (
    <Grid style={{ padding: appTheme.space.xxl }}>
      <Row>
        <Col sm="4">
          <Nav />
        </Col>
        <Col sm="8">
          <ModulesList tabId={activeTab} />
          <PlanDetails />
        </Col>
      </Row>
    </Grid>
  );
};
