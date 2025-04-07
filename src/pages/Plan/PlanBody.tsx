import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import styled from 'styled-components';
import { StickyCol } from './common/StickyCol';
import { usePlanTab } from './context/planContext';
import { ModulesList } from './ModulesList';
import { Nav } from './navigation/aside';
import { PlanDetails } from './navigation/header/PlanDetails';
import SummaryBody from './summary';

const StickyLayoutWrapper = styled(LayoutWrapper)`
  position: fixed;
  top: 15vh;
  z-index: ${({ theme }) => theme.levels.front};
  height: 85vh;
`;

export const PlanBody = () => {
  const { activeTab } = usePlanTab();

  // Debug info
  const params = new URLSearchParams(window.location.search);
  const debug = params.get('debug');

  return (
    <StickyLayoutWrapper isNotBoxed>
      <Grid>
        {activeTab === 'summary' ? (
          <SummaryBody />
        ) : (
          <Row>
            <StickyCol sm="3">
              <Nav />
            </StickyCol>
            <StickyCol sm="6">
              <ModulesList tabId={activeTab} />
            </StickyCol>
            <Col sm="3">{debug && <PlanDetails />}</Col>
          </Row>
        )}
      </Grid>
    </StickyLayoutWrapper>
  );
};
