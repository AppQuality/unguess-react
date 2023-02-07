import { useNavigate, useParams } from 'react-router-dom';
import { useGetCampaignsByCidBugsAndBidQuery } from 'src/features/api';
import { Grid, Row, Col } from '@appquality/unguess-design-system';
import { Page } from 'src/features/templates/Page';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { selectBug, selectCampaign } from 'src/features/bugsPage/bugsPageSlice';
import { Header } from './Header';
import { Content } from './Content';
import { LoadingSkeleton } from './LoadingSkeleton';

const Bug = () => {
  const dispatch = useAppDispatch();
  const { campaignId, bugId } = useParams();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');

  // Update currentCampaign and selectedBug for future hook calls
  useEffect(() => {
    dispatch(
      selectCampaign({
        cp_id: Number(campaignId),
        filters: {},
      })
    );

    dispatch(
      selectBug({
        bug_id: Number(bugId),
      })
    );
  }, []);

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
  } = useGetCampaignsByCidBugsAndBidQuery({
    cid: campaignId,
    bid: bugId,
  });

  if (isLoading || isFetching) {
    return <LoadingSkeleton />;
  }

  if (isError || typeof bug === 'undefined') {
    navigate(notFoundRoute);
    return null;
  }

  return (
    <Page
      title={bug.title.compact}
      pageHeader={<Header campaignId={campaignId} title={bug.title} />}
      route="bug"
    >
      <Grid>
        <Row>
          <Col xl={8} offsetXl={2}>
            <Content bug={bug} campaignId={campaignId} />
          </Col>
        </Row>
      </Grid>
    </Page>
  );
};

export default Bug;
