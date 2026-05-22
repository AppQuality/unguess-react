import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetCampaignsByCidQuery, useGetHubsByHidQuery } from '../api';

const extractIdFromPath = (pathname: string, prefix: string): string | undefined => {
  return pathname.split(`/${prefix}/`)[1]?.split('/')[0];
};

const isHubLocation = (pathname: string): boolean => {
  return pathname.includes('/hubs/');
};

const isCampaignLocation = (pathname: string): boolean => {
  return pathname.includes('/campaigns/');
};

const CampaignsHubsMiddleware = () => {
  const location = useLocation();
  
  const getHubId = () => extractIdFromPath(location.pathname, 'hubs');
  const getCpId = () => extractIdFromPath(location.pathname, 'campaigns');
  
  const hid = getHubId();
  const cid = getCpId();
  
  const isHub = useGetHubsByHidQuery({
    hid: hid!
  }, {
    skip: !isHubLocation(location.pathname) || !hid,
  });
  const isCampaign = useGetCampaignsByCidQuery({
    cid: cid!
  }, {
    skip: !isCampaignLocation(location.pathname) || !cid,
  });
  
  if (isHubLocation(location.pathname)) {
    if (!hid) {
      return <Navigate to="/404" />;
    }
    // todo: sostituire con skeleton o loading state
    if (isHub.isLoading) {
      return <div>Loading...</div>;
    }
    
    if (isHub.isError || !isHub.data) {
      return <Navigate to="/404" />;
    }
    
    if (isHub.isSuccess) {
      return <Outlet context={{ isHub: true }} />;
    }
  }
  
  if (isCampaignLocation(location.pathname)) {
    if (!cid) {
      return <Navigate to="/404" />;
    }
    
    // todo: sostituire con skeleton o loading state
    if (isCampaign.isLoading) {
      return <div>Loading...</div>;
    }
    
    if (isCampaign.isError || !isCampaign.data) {
      return <Navigate to="/404" />;
    }
    
    if (isCampaign.isSuccess) {
      return <Outlet context={{ isHub: false }} />;
    }
  }
  
  return <Navigate to="/404" />;
};

export default CampaignsHubsMiddleware;
