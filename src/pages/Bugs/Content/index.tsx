import { Button, Col, Grid, Row } from '@appquality/unguess-design-system';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  updateFilters,
  getSelectedBugId,
} from 'src/features/bugsPage/bugsPageSlice';
import { BugsDetail } from '../Detail';
import { BugsFilters } from '../Filters';
import BugsTable from '../BugsTable';
import BugsPageContentLoader from './ContentLoader';

const BugsPageContent = ({ campaignId }: { campaignId: number }) => {
  const dispatch = useAppDispatch();
  const currentBugId = getSelectedBugId();
  const data = useAppSelector((state) => state.bugsPage);

  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <BugsFilters />
          {JSON.stringify(data)}
          <Button
            onClick={() => {
              dispatch(
                updateFilters({
                  filters: {
                    types: [{ id: 1, name: 'Crash' }],
                  },
                })
              );
            }}
          >
            Crash only
          </Button>
          <Button
            onClick={() => {
              dispatch(
                updateFilters({
                  filters: {
                    severities: [{ id: 2, name: 'Medium' }],
                  },
                })
              );
            }}
          >
            Medium only
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={currentBugId ? 8 : 12}>
          <BugsTable campaignId={campaignId} />
        </Col>
        {currentBugId && (
          <Col xs={12} md={4}>
            <BugsDetail />
          </Col>
        )}
      </Row>
    </Grid>
  );
};

export { BugsPageContent, BugsPageContentLoader };
