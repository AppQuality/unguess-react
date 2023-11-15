import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import { CustomStatusDrawer } from 'src/common/components/CustomStatusDrawer';
import { useAppSelector } from 'src/app/hooks';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { BugsFilters } from '../Filters';
import { FilterRecap } from '../Filters/FilterRecap';
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

const LayoutWrapperFilters = styled(LayoutWrapper)`
  background: white;
  @media (min-width: ${(p) => p.theme.breakpoints.xl}) {
    position: sticky;
    top: 0;
    z-index: 2;
  }
`;

const BugsPageContent = ({ campaignId }: { campaignId: number }) => {
  const currentBugId = getSelectedBugId();
  const previewOpenStyle = currentBugId ? { marginRight: 0 } : {};
  const { isCustomStatusDrawerOpen } = useAppSelector((state) => ({
    isCustomStatusDrawerOpen: state.bugsPage.isCustomStatusDrawerOpen,
  }));
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const hideDrawer = width < breakpointSm;

  return (
    <>
      <LayoutWrapperFilters isNotBoxed>
        <BugsFilters />
      </LayoutWrapperFilters>
      <LayoutWrapperBugs isNotBoxed isPreviewOpen={!!currentBugId}>
        <Grid gutters="xxl">
          <Row style={{ ...previewOpenStyle }}>
            <Col
              xs={12}
              md={currentBugId ? 8 : 12}
              style={{ paddingBottom: appTheme.space.lg }}
            >
              <FilterRecap />
              <BugsTable campaignId={campaignId} />
            </Col>
            {currentBugId && (
              <Col xs={12} md={4} style={{ margin: 0, paddingRight: 0 }}>
                <BugPreview bugId={currentBugId} campaignId={campaignId} />
              </Col>
            )}
          </Row>
        </Grid>
      </LayoutWrapperBugs>
      {isCustomStatusDrawerOpen && !hideDrawer && <CustomStatusDrawer />}
    </>
  );
};

export { BugsPageContent, BugsPageContentLoader };
