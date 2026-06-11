import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useGetCampaignsByCidQuery, useGetHubsByHidQuery } from '../api';

export type CampaignHubContext = {
  isHub: boolean;
  entityId: string;
};

const CampaignsHubsMiddleware = () => {
  const location = useLocation();
  const { entityId } = useParams<{ entityId: string }>();
  const notFoundRoute = useLocalizeRoute('oops');

  if (!entityId) {
    return <Navigate to={notFoundRoute} replace />;
  }

  const isHub = location.pathname.includes('/hubs/');

  const hubQuery = useGetHubsByHidQuery(
    {
      hid: entityId,
    },
    {
      skip: !isHub,
    }
  );

  const campaignQuery = useGetCampaignsByCidQuery(
    {
      cid: entityId,
    },
    {
      skip: isHub,
    }
  );

  const query = isHub ? hubQuery : campaignQuery;

  // todo: sostituire con skeleton o loading state
  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError || !query.data) {
    return <Navigate to={notFoundRoute} replace />;
  }

  if (query.isSuccess) {
    const context: CampaignHubContext = { isHub, entityId };
    return <Outlet context={context} />;
  }

  return <Navigate to={notFoundRoute} replace />;
};

export default CampaignsHubsMiddleware;
