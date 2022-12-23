import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { BugsDetail } from '../Detail';
import { BugsFilters } from '../Filters';
import BugsTable from '../Table';
import BugsPageContentLoader from './ContentLoader';

interface BugsPageContentProps {
  isDetailOpen: boolean;
  setIsDetailOpen: (open: boolean) => void;
}

const BugsPageContent = ({
  isDetailOpen,
  setIsDetailOpen,
}: BugsPageContentProps) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <BugsFilters />
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={isDetailOpen ? 8 : 12}>
        <BugsTable />
      </Col>
      {isDetailOpen && (
        <Col xs={12} md={4}>
          <BugsDetail
            isDetailOpen={isDetailOpen}
            setIsDetailOpen={setIsDetailOpen}
          />
        </Col>
      )}
    </Row>
  </Grid>
);

export { BugsPageContent, BugsPageContentLoader };
