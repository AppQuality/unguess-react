import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useGetHubsByHidQuery } from 'src/features/api';
import { Page } from 'src/features/templates/Page';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import HubPageHeader from './pageHeader';
import { HeaderLoader } from './pageHeaderLoading';

const HubPage = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const { hubId } = useParams();
  const location = useLocation();

  if (!hubId || Number.isNaN(Number(hubId))) {
    navigate(notFoundRoute, { state: { from: location.pathname } });
  }

  const {
    isLoading,
    isFetching,
    isError,
    data: hub,
  } = useGetHubsByHidQuery({ hid: hubId ?? '' }, { skip: !hubId });

  if (isError) {
    navigate(notFoundRoute, { state: { from: location.pathname } });
  }

  return (
    <Page
      title={hub?.title ?? 'Hub'}
      pageHeader={
        isLoading || isFetching ? (
          <HeaderLoader />
        ) : (
          <HubPageHeader hubId={Number(hubId)} />
        )
      }
      route="hubs"
    >
      <LayoutWrapper>
        <Grid>
          <Row>
            <Col>{children}</Col>
          </Row>
        </Grid>
      </LayoutWrapper>
    </Page>
  );
};

export default HubPage;
