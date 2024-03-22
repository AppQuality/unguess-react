import { Page } from 'src/features/templates/Page';

const VideosPage = () => (
  <Page
    title="Video Dashboard"
    className="video-dashboard-page"
    pageHeader={<>page header</>}
    route="video-dashboard-page"
    excludeMarginTop
    excludeMarginBottom
  >
    page content
  </Page>
);

export default VideosPage;
