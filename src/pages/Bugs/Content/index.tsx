import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';
import { BugsFilters } from '../Filters';
import { BugPreview } from './BugPreview';
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

const BugsPageContent = ({ campaignId }: { campaignId: number }) => {
  const currentBugId = getSelectedBugId();

  return (
    <>
      <LayoutWrapper isNotBoxed>
        <BugsFilters />
      </LayoutWrapper>
      <LayoutWrapperBugs isNotBoxed isPreviewOpen={!!currentBugId}>
        <Grid gutters="xxl">
          <Row>
            <Col xs={12} md={currentBugId ? 8 : 12}>
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
