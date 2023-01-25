import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import { BugsDetail } from '../Detail';
import { BugsFilters } from '../Filters';
import BugsTable from '../BugsTable';
import BugsPageContentLoader from './ContentLoader';

const BugsPageContent = ({ campaignId }: { campaignId: number }) => {
  const currentBugId = getSelectedBugId();

  return (
    <div>
      <BugsFilters />
      <Grid>
        <Row>
          <Col xs={12} md={currentBugId ? 8 : 12}>
            <BugsTable campaignId={campaignId} />
          </Col>
          {currentBugId && (
            <Col xs={12} md={4}>
              <BugsDetail campaignId={campaignId} />
            </Col>
          )}
        </Row>
      </Grid>
    </div>
  );
};

export { BugsPageContent, BugsPageContentLoader };
