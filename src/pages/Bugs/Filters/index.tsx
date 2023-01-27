import { Anchor, Col, Grid, Row, SM } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { setFilterDrawerOpen } from 'src/features/bugsPage/bugsPageSlice';
import { theme as globalTheme } from 'src/app/theme';
import { SeverityFilter } from './SeverityFilter';
import { ReadFilter } from './ReadFilter';
import { UniqueFilter } from './UniqueFilter';
import { SearchFilter } from './SearchFilter';
import { FilterRecap } from './FilterRecap';
import { GroupBy } from './GroupBy';
import { BugsFilterDrawer } from '../Drawer';

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space.base * 4}px;
`;

const RecapContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
`;

const OrderInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space.sm};
  flex-wrap: wrap;
  flex-direction: row;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    justify-content: flex-start;
  }
`;

const StyledSM = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const BugsFilters = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <>
      <Grid>
        <Row>
          <Col
            lg={12}
            xl={8}
            orderXs={1}
            orderXl={1}
            style={{ marginBottom: globalTheme.space.md }}
          >
            <FilterContainer>
              <SearchFilter />
              <UniqueFilter />
              <ReadFilter />
              <SeverityFilter />
              <Anchor
                onClick={() => {
                  dispatch(setFilterDrawerOpen(true));
                }}
              >
                {t('__BUGS_FILTER_VIEW_ALL_LABEL')}
              </Anchor>
            </FilterContainer>
          </Col>
          <Col
            lg={12}
            xl={4}
            orderXs={3}
            orderXl={2}
            style={{ marginBottom: globalTheme.space.md }}
          >
            <OrderInfo>
              <StyledSM isBold>
                {t('__BUGS_PAGE_DEFAULT_SEVERITY_SORT_LABEL')}
              </StyledSM>
              <GroupBy />
            </OrderInfo>
          </Col>
          <Col
            lg={12}
            xl={12}
            orderXs={2}
            orderXl={3}
            style={{ marginBottom: 0 }}
          >
            <RecapContainer>
              <FilterRecap />
            </RecapContainer>
          </Col>
        </Row>
      </Grid>
      <BugsFilterDrawer />
    </>
  );
};

export { BugsFilters };
