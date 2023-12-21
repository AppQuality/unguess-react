import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useGetCampaignsByCidBugsAndBidQuery } from 'src/features/api';
import { useGetCampaignWithWorkspaceQuery } from 'src/features/api/customEndpoints/getCampaignWithWorkspace';
import { setCustomStatusDrawerOpen } from 'src/features/bugsPage/bugsPageSlice';
import { setWorkspace } from 'src/features/navigation/navigationSlice';
import { Page } from 'src/features/templates/Page';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import useWindowSize from 'src/hooks/useWindowSize';
import { CustomStatusDrawer } from 'src/common/components/CustomStatusDrawer';
import { Content } from './Content';
import { Header } from './Header';
import { LoadingSkeleton } from './LoadingSkeleton';
import { Actions } from './Actions';

const Bug = () => {
  const { campaignId, bugId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute('oops');
  const [showSkeleton, setShowSkeleton] = useState(true);
  const location = useLocation();
  const { isCustomStatusDrawerOpen } = useAppSelector((state) => ({
    isCustomStatusDrawerOpen: state.bugsPage.isCustomStatusDrawerOpen,
  }));
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const breakpointLg = parseInt(appTheme.breakpoints.lg, 10);

  const [hideDrawer, setHideDrawer] = useState(width < breakpointSm);
  const [hideActions, setHideActions] = useState(width < breakpointLg);

  if (
    !campaignId ||
    Number.isNaN(Number(campaignId)) ||
    !bugId ||
    Number.isNaN(Number(bugId))
  ) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
    return null;
  }

  const {
    data: bug,
    isLoading,
    isFetching,
    isError,
  } = useGetCampaignsByCidBugsAndBidQuery({
    cid: campaignId,
    bid: bugId,
  });

  const { data: { workspace } = {} } = useGetCampaignWithWorkspaceQuery({
    cid: campaignId,
  });

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [workspace]);

  useEffect(() => {
    if (hideDrawer) dispatch(setCustomStatusDrawerOpen(false));
    setHideDrawer(width < breakpointSm);
    setHideActions(width < breakpointLg);
  }, [width]);

  if (showSkeleton && (isLoading || isFetching)) {
    return <LoadingSkeleton />;
  }

  if (isError || typeof bug === 'undefined') {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
    return null;
  }

  return (
    <Page
      title={bug.title.compact}
      className="bug-page"
      pageHeader={<Header campaignId={campaignId} bug={bug} />}
      route="bug"
      excludeMarginTop
      excludeMarginBottom
    >
      <LayoutWrapper
        isNotBoxed
        {...(!hideActions && { style: { paddingRight: 0 } })}
      >
        <Grid gutters="xxl">
          <Row>
            <Col lg={8} style={{ marginBottom: 0 }}>
              <Content bug={bug} campaignId={campaignId} />
            </Col>
            <Col lg={4} style={{ marginBottom: 0 }}>
              <Actions />
            </Col>
          </Row>
        </Grid>
      </LayoutWrapper>
      {isCustomStatusDrawerOpen && !hideDrawer && <CustomStatusDrawer />}
    </Page>
  );
};

export default Bug;
