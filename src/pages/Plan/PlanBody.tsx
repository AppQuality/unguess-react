import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { StickyCol } from './common/StickyCol';
import { usePlanContext } from './context/planContext';
import { Controls } from './Controls';
import { ModulesList } from './ModulesList';
import { Nav } from './navigation/aside';
import { PlanDetails } from './navigation/header/PlanDetails';
import SummaryBody from './summary';
import { PlanInfo } from './summary/components/PlanInfo';

const HiddenColSm = styled(StickyCol)`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const ResponsiveGrid = styled(Grid)`
  padding: ${({ theme }) => theme.space.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.space.md} 0;
  }
`;

export const PlanBody = () => {
  const { activeTab } = usePlanContext();
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const isMobile = width < breakpointSm;

  // Debug info
  const params = new URLSearchParams(window.location.search);
  const debug = params.get('debug');

  return (
    <LayoutWrapper>
      <ResponsiveGrid style={{}}>
        {activeTab.name === 'summary' ? (
          <SummaryBody />
        ) : (
          <Row>
            <HiddenColSm style={{ padding: 0 }} sm="3">
              <Nav />
            </HiddenColSm>
            <Col sm="12" md="6">
              <ModulesList />
            </Col>
            <HiddenColSm sm="12" md="3">
              <PlanInfo />
            </HiddenColSm>
            <Col sm="12" md="3">
              {debug && <PlanDetails />}
            </Col>
          </Row>
        )}
        {isMobile && (
          <Row>
            <Col sm="12" style={{ display: 'flex', justifyContent: 'center' }}>
              <Controls />
            </Col>
          </Row>
        )}
      </ResponsiveGrid>
    </LayoutWrapper>
  );
};
