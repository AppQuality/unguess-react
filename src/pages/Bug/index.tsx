import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCampaignsByCidBugsAndBidQuery } from 'src/features/api';
import { Grid, Row, Col } from '@appquality/unguess-design-system';
import { Page } from 'src/features/templates/Page';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useGetCampaignWithWorkspaceQuery } from 'src/features/api/customEndpoints/getCampaignWithWorkspace';
import { setWorkspace } from 'src/features/navigation/navigationSlice';
import { useAppDispatch } from 'src/app/hooks';
import { Header } from './Header';
import { Content } from './Content';
import { LoadingSkeleton } from './LoadingSkeleton';

const Bug = () => {
  const { campaignId, bugId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute('oops');
  const [showSkeleton, setShowSkeleton] = useState(true);

  if (
    !campaignId ||
    Number.isNaN(Number(campaignId)) ||
    !bugId ||
    Number.isNaN(Number(bugId))
  ) {
    navigate(notFoundRoute);
    return null;
  }

  const {
    data: bug,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetCampaignsByCidBugsAndBidQuery(
    {
      cid: campaignId,
      bid: bugId,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: { workspace } = {} } = useGetCampaignWithWorkspaceQuery({
    cid: campaignId,
  });

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [workspace]);

  if (showSkeleton && (isLoading || isFetching)) {
    return <LoadingSkeleton />;
  }

  if (isError || typeof bug === 'undefined') {
    navigate(notFoundRoute);
    return null;
  }

  const refetchBugTags = () => {
    setShowSkeleton(false);
    refetch().then(() => setShowSkeleton(true));
  };

  return (
    <Page
      title={bug.title.compact}
      className="bug-page"
      pageHeader={<Header campaignId={campaignId} bug={bug} />}
      route="bug"
    >
      <LayoutWrapper>
        <Grid>
          <Row>
            <Col xl={8} offsetXl={2}>
              <Content
                bug={bug}
                campaignId={campaignId}
                refetchBugTags={refetchBugTags}
              />
            </Col>
          </Row>
        </Grid>
      </LayoutWrapper>
    </Page>
  );
};

export default Bug;
