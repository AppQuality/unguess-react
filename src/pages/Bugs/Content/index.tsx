import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import { BugsFilters } from '../Filters';
import { BugPreview } from './BugPreview';
import BugsTable from './BugsTable';
import BugsPageContentLoader from './ContentLoader';

const BugsPageContent = ({ campaignId }: { campaignId: number }) => {
  const currentBugId = getSelectedBugId();

  return (
    <>
      <BugsFilters />
      <Grid gutters="xxl">
        <Row>
          <Col xs={12} md={currentBugId ? 8 : 12}>
            <BugsTable campaignId={campaignId} />
          </Col>
          {currentBugId && (
            <Col xs={12} md={4}>
              <BugPreview bugId={currentBugId} campaignId={campaignId} />
            </Col>
          )}
        </Row>
      </Grid>
    </>
  );
};

export { BugsPageContent, BugsPageContentLoader };
