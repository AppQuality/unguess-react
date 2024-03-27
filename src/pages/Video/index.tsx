import { Page } from 'src/features/templates/Page';
import VideoPageHeader from './PageHeader';
import VideoPageContent from './Content';

const VideoPage = () => (
  <Page
    title="Video Page"
    className="video-page"
    pageHeader={<VideoPageHeader />}
    route="video"
  >
    <VideoPageContent />
  </Page>
);

export default VideoPage;
