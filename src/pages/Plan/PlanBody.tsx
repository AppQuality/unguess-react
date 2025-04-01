import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { appTheme } from 'src/app/theme';
import { StickyCol } from './common/StickyCol';
import { usePlanTab } from './context/planContext';
import { ModulesList } from './ModulesList';
import { Nav } from './navigation/aside';
import { PlanDetails } from './navigation/header/PlanDetails';
import SummaryBody from './summary';

export const PlanBody = () => {
  const { activeTab } = usePlanTab();

  // Debug info
  const params = new URLSearchParams(window.location.search);
  const debug = params.get('debug');

  const stickyHeight = useMemo(
    () => document.getElementById('sticky-plan-page-header')?.offsetHeight,
    []
  );

  return (
    <Grid style={{ padding: appTheme.space.md }}>
      {activeTab === 'summary' ? (
        <SummaryBody />
      ) : (
        <Row>
          <StickyCol sm="3" $stickyHeight={stickyHeight || 0}>
            <Nav />
          </StickyCol>
          <Col sm="6">
            <ModulesList tabId={activeTab} />
          </Col>
          <Col sm="3">{debug && <PlanDetails />}</Col>
        </Row>
      )}
    </Grid>
  );
};
