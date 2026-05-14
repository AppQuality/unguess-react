import { Navigate, Outlet } from 'react-router-dom';

const CampaignsHubsMiddleware = () => {
  // TODO: GET /campaigns/:cid and /hubs/:hid to check if the campaign or hub exists, if not navigate to 404 page
  // Set a props "isHub" and send it to the page to know if it's a hub or a campaign, and use it to fetch the right data in the page
  const isHub = window.location.pathname.includes('/hubs/'); // TODO: implement logic
  return <Outlet context={{ isHub }} />;
};

export default CampaignsHubsMiddleware;
