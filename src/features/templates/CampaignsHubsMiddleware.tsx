import { Navigate, Outlet } from 'react-router-dom';
import { useGetCampaignsByCidQuery, useGetHubsByHidQuery } from '../api';

const CampaignsHubsMiddleware = () => {
  const isHub = useGetHubsByHidQuery({
    hid: window.location.pathname.split('/hubs/')[1],
  });
  const isCampaign = useGetCampaignsByCidQuery({
    cid: window.location.pathname.split('/campaigns/')[1],
  });
  if (isHub.isSuccess) {
    return <Outlet context={{ isHub: true }} />;
  }
  if (isCampaign.isSuccess) {
    return <Outlet context={{ isHub: false }} />;
  }
  return <Navigate to="/404" />;
};

export default CampaignsHubsMiddleware;
