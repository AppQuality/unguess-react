import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';
import { BugsFilters } from '../Filters';
import { FilterRecap } from '../Filters/FilterRecap';
import { BugPreview, filtersHeight } from './BugPreview';
import BugsTable from './BugsTable';
import BugsPageContentLoader from './ContentLoader';

const LayoutWrapperBugs = styled(LayoutWrapper)<{
  isPreviewOpen?: boolean;
}>`
  ${({ isPreviewOpen }) =>
    isPreviewOpen &&
    `
      padding-right: 0;
    `}
`;

const LayoutWrapperFilters = styled(LayoutWrapper)`
  background: white;
  @media (min-width: ${(p) => p.theme.breakpoints.xl}) {
    position: sticky;
    top: 0;
    z-index: 2;
    max-height: ${filtersHeight}px;
  }
`;

const BugsPageContent = ({ campaignId }: { campaignId: number }) => {
  const currentBugId = getSelectedBugId();

  return (
    <>
      <LayoutWrapperFilters isNotBoxed>
        <BugsFilters />
      </LayoutWrapperFilters>
      <LayoutWrapperBugs isNotBoxed isPreviewOpen={!!currentBugId}>
        <Grid gutters="xxl">
          <Row>
            <Col xs={12} md={currentBugId ? 8 : 12}>
              <FilterRecap />
              <BugsTable campaignId={campaignId} />
            </Col>
            {currentBugId && (
              <Col xs={12} md={4} style={{ paddingRight: 0 }}>
                <BugPreview bugId={currentBugId} campaignId={campaignId} />
              </Col>
            )}
          </Row>
        </Grid>
      </LayoutWrapperBugs>
    </>
  );
};

export { BugsPageContent, BugsPageContentLoader };
