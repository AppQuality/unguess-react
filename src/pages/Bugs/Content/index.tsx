import { Button, Col, Grid, Row } from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { updateFilters } from 'src/features/bugsFilters/bugsFiltersSlice';
import { BugsDetail } from '../Detail';
import { BugsFilters } from '../Filters';
import { BugsTable } from '../Table';
import BugsPageContentLoader from './ContentLoader';

interface BugsPageContentProps {
  isDetailOpen: boolean;
  setIsDetailOpen: (open: boolean) => void;
  campaignId: number;
}

const BugsPageContent = ({
  isDetailOpen,
  setIsDetailOpen,
  campaignId,
}: BugsPageContentProps) => {
  const dispatch = useAppDispatch();

  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <BugsFilters />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={isDetailOpen ? 8 : 12}>
          <BugsTable />
          <Button
            onClick={() => {
              dispatch(
                updateFilters({
                  cp_id: campaignId,
                  filters: {
                    types: [{ id: 1, name: 'Crash' }],
                  },
                })
              );
            }}
          >
            Provola
          </Button>
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
};

export { BugsPageContent, BugsPageContentLoader };
