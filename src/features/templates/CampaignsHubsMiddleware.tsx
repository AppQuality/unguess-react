import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PageLoader } from 'src/common/components/PageLoader';
import { useEntityId } from 'src/hooks/useEntityId';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  useGetCampaignsByCidQuery,
  useGetHubsByHidQuery,
  useGetUsersMeQuery,
} from '../api';

export type CampaignHubContext = {
  isHub: boolean;
  entityId: string;
};

const CampaignsHubsMiddleware = () => {
  const location = useLocation();
  const entityId = useEntityId();
  const loginRoute = useLocalizeRoute('login');
  const notFoundRoute = useLocalizeRoute('oops');
  const {
    data: userData,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    error: userError,
  } = useGetUsersMeQuery();
  const isHub = location.pathname.includes('/hubs/');
  const shouldSkipEntityQuery =
    !entityId || isUserLoading || isUserFetching || !userData || !!userError;

  if (!entityId) {
    return <Navigate to={notFoundRoute} replace />;
  }
  const hubQuery = useGetHubsByHidQuery(
    {
      hid: entityId,
    },
    {
      skip: shouldSkipEntityQuery || !isHub,
    }
  );

  const campaignQuery = useGetCampaignsByCidQuery(
    {
      cid: entityId,
    },
    {
      skip: shouldSkipEntityQuery || isHub,
    }
  );

  const query = isHub ? hubQuery : campaignQuery;

  if (isUserLoading || isUserFetching) {
    return <PageLoader />;
  }

  if (!userData || userError) {
    return (
      <Navigate to={loginRoute} state={{ from: location.pathname }} replace />
    );
  }

  if (query.isLoading) {
    return <PageLoader />;
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
