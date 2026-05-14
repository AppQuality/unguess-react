import { useTranslation } from 'react-i18next';
import {
  useLocation,
  useNavigate,
  useParams,
  useOutletContext,
} from 'react-router-dom';
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
  // Use context from Outlet to get "isHub" param
  const { isHub } = useOutletContext<{ isHub: boolean }>();

  console.log('🚀 ~ file: index.tsx:17 ~ HubVideosPage ~ isHub:', isHub);

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
