import { Page } from 'src/features/templates/Page';
import { useTranslation } from 'react-i18next';
import VideoPageHeader from './PageHeader';
import VideoPageContent from './Content';

const VideoPage = () => {
  const { t } = useTranslation();

  return (
    <Page
      title={t('__VIDEO_PAGE_TITLE')}
      className="video-page"
      pageHeader={<VideoPageHeader />}
      route="video"
      excludeMarginTop
    >
      <VideoPageContent />
    </Page>
  );
};

export default VideoPage;
