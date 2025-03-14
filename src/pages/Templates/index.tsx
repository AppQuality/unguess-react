import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { PageLoader } from 'src/common/components/PageLoader';
import { useGetWorkspacesByWidTemplatesQuery } from 'src/features/api';
import { Page } from 'src/features/templates/Page';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import Body from './Body';
import { TemplatesContextProvider } from './Context';
import PageHeader from './PageHeader';

const Templates = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const location = useLocation();
  const { activeWorkspace } = useActiveWorkspace();
  const { status } = useAppSelector((state) => state.user);
  const { data, isLoading, isError } = useGetWorkspacesByWidTemplatesQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
    },
    {
      skip: !activeWorkspace,
    }
  );

  if (isError) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  if (!data || isLoading || status === 'loading') {
    return <PageLoader />;
  }

  return (
    <Page
      pageHeader={<PageHeader />}
      title={t('__PAGE_TITLE_TEMPLATES')}
      route="templates"
    >
      <TemplatesContextProvider>
        <Body />
      </TemplatesContextProvider>
    </Page>
  );
};

export default Templates;
