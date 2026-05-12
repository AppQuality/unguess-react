import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { Page } from 'src/features/templates/Page';
import HubVideosPageHeader from './PageHeader';
import HubVideosContent from './Content';

const HubVideosPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const { hubId } = useParams();
  const location = useLocation();

  if (!hubId || Number.isNaN(Number(hubId))) {
    navigate(notFoundRoute, { state: { from: location.pathname } });
  }

  return (
    <Page
      title={t('__VIDEOS_PAGE_TITLE')}
      className="hub-videos-page"
      pageHeader={<HubVideosPageHeader />}
      route="hubs"
      excludeMarginTop
    >
      <HubVideosContent />
    </Page>
  );
};

export default HubVideosPage;
