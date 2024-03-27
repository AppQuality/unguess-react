import { Page } from 'src/features/templates/Page';
import VideosPageHeader from './PageHeader';
import VideosPageContent from './Content';

const VideosPage = () => {
  console.log('VideosPage');

  return (
    <Page
      title="Videos Page"
      className="videos-page"
      pageHeader={<VideosPageHeader />}
      route="videos-page"
      excludeMarginTop
      excludeMarginBottom
    >
      <VideosPageContent />
    </Page>
  );
};

export default VideosPage;
