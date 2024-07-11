import { Page } from 'src/features/templates/Page';
import styled from 'styled-components';
import { observations } from './data';
import ObservationCard from './ObservationCard';
import { InsightDrawer } from './InsightDrawer';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const DashboardResearcher = () => (
  <Page title="Dashboard Researcher" route="">
    <Wrapper>
      <div
        id="observations"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3 200px)',
          gap: '1rem',
        }}
      >
        {observations.map((observation) => (
          <ObservationCard key={observation.id} {...observation} />
        ))}
      </div>
      <div id="insights">
        <InsightDrawer />
      </div>
    </Wrapper>
  </Page>
);

export default DashboardResearcher;
