import { Page } from 'src/features/templates/Page';
import { useTranslation } from 'react-i18next';
import VideosPageHeader from './PageHeader';
import VideosPageContent from './Content';

const VideosPage = () => {
  const { t } = useTranslation();

  return (
    <Page
      title={t('__VIDEOS_PAGE_TITLE')}
      className="videos-page"
      pageHeader={<VideosPageHeader />}
      route="videos"
    >
      <VideosPageContent />
    </Page>
  );
};

export default VideosPage;
