import { Button, Col, Grid, Row } from '@appquality/unguess-design-system';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { updateFilters } from 'src/features/bugsPage/bugsPageSlice';
import { BugsDetail } from '../Detail';
import { BugsFilters } from '../Filters';
import { BugsTable } from '../Table';
import BugsPageContentLoader from './ContentLoader';

interface BugsPageContentProps {
  isDetailOpen: boolean;
  setIsDetailOpen: (open: boolean) => void;
}

const BugsPageContent = ({
  isDetailOpen,
  setIsDetailOpen,
}: BugsPageContentProps) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.bugsPage);

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
