import { Page } from 'src/features/templates/Page';

const VideoPage = () => (
  <Page
    title="Video Page"
    className="video-page"
    pageHeader={<>page header</>}
    route="video-page"
    excludeMarginTop
    excludeMarginBottom
  >
    page content
  </Page>
);

export default VideoPage;
