import { useTranslation } from 'react-i18next';
import { Page } from 'src/features/templates/Page';

const UxDashboard = () => {
  const { t } = useTranslation();

  return (
    <Page
      title="UX Dashboard"
      className="ux-dashboard-page"
      pageHeader={<>page header</>}
      route="ux-dashboard-page"
      excludeMarginTop
      excludeMarginBottom
    >
      page content
    </Page>
  );
};

export default UxDashboard;
