import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { StickyCol } from './common/StickyCol';
import { usePlanContext } from './context/planContext';
import { ModulesList } from './ModulesList';
import { Nav } from './navigation/aside';
import { PlanDetails } from './navigation/header/PlanDetails';
import SummaryBody from './summary';

export const PlanBody = () => {
  const { activeTab } = usePlanContext();

  // Debug info
  const params = new URLSearchParams(window.location.search);
  const debug = params.get('debug');

  return (
    <LayoutWrapper>
      <Grid style={{ padding: appTheme.space.md }}>
        {activeTab.name === 'summary' ? (
          <SummaryBody />
        ) : (
          <Row>
            <StickyCol style={{ padding: 0 }} sm="3">
              <Nav />
            </StickyCol>
            <Col sm="6">
              <ModulesList />
            </Col>
            <Col sm="3">{debug && <PlanDetails />}</Col>
          </Row>
        )}
      </Grid>
    </LayoutWrapper>
  );
};
