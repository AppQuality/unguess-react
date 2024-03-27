import { Page } from 'src/features/templates/Page';
import VideosPageHeader from './PageHeader';
import VideosPageContent from './Content';

const VideosPage = () => (
  <Page
    title="Videos Page"
    className="videos-page"
    pageHeader={<VideosPageHeader />}
    route="videos"
  >
    <VideosPageContent />
  </Page>
);

export default VideosPage;
