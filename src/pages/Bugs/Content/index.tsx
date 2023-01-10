import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { BugsDetail } from '../Detail';
import { BugsFilters } from '../Filters';
import BugsTable from '../BugsTable';
import BugsPageContentLoader from './ContentLoader';

interface BugsPageContentProps {
  isDetailOpen: boolean;
  setIsDetailOpen: (open: boolean) => void;
}

const BugsPageContent = ({
  isDetailOpen,
  setIsDetailOpen,
}: BugsPageContentProps) => {
  const [currentBugId, setCurrentBugId] = useState<string | null>(null);
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <BugsFilters />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={isDetailOpen ? 8 : 12}>
          <BugsTable
            currentBugId={currentBugId}
            setCurrentBugId={setCurrentBugId}
          />
        </Col>
        {isDetailOpen && (
          <Col xs={12} md={4}>
            <BugsDetail
              currentBugId={currentBugId}
              isDetailOpen={isDetailOpen}
              setIsDetailOpen={setIsDetailOpen}
            />
          </Col>
        )}
      </Row>
    </Grid>
  );
};

export { BugsPageContent, BugsPageContentLoader };
