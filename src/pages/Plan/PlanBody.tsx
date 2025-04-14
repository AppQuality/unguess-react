import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { StickyCol } from './common/StickyCol';
import { usePlanTab } from './context/planContext';
import { ModulesList } from './ModulesList';
import { Nav } from './navigation/aside';
import { PlanDetails } from './navigation/header/PlanDetails';
import SummaryBody from './summary';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';

export const PlanBody = () => {
  const { activeTab } = usePlanTab();

  // Debug info
  const params = new URLSearchParams(window.location.search);
  const debug = params.get('debug');

  return (
    <LayoutWrapper>
      <Grid style={{ padding: `${appTheme.space.lg} ${appTheme.space.xl}` }}>
        {activeTab === 'summary' ? (
          <SummaryBody />
        ) : (
          <Row>
            <StickyCol sm="3">
              <Nav />
            </StickyCol>
            <Col sm="6">
              <ModulesList tabId={activeTab} />
            </Col>
            <Col sm="3">{debug && <PlanDetails />}</Col>
          </Row>
        )}
      </Grid>
    </LayoutWrapper>
  );
};
