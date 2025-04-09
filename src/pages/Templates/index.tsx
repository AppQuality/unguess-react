import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { PageLoader } from 'src/common/components/PageLoader';
import PlanCreationInterface from 'src/common/components/PlanCreationInterface';
import { useGetWorkspacesByWidTemplatesQuery } from 'src/features/api';
import { Page } from 'src/features/templates/Page';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import Body from './Body';
import { CategoriesNav } from './CategoriesNav';
import { TemplatesContextProvider, useTemplatesContext } from './Context';
import PageHeader from './PageHeader';

const PageInner = () => {
  const { setIsDrawerOpen, selectedTemplate, isDrawerOpen } =
    useTemplatesContext();
  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, [setIsDrawerOpen]);
  return (
    <>
      <Grid>
        <Row>
          <Col xs={12} lg={2} style={{ margin: 0 }}>
            <CategoriesNav />
          </Col>
          <Col xs={12} lg={10}>
            <Body />
          </Col>
        </Row>
      </Grid>
      {selectedTemplate && (
        <PlanCreationInterface
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          template={selectedTemplate}
        />
      )}
    </>
  );
};

const Templates = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const location = useLocation();
  const { activeWorkspace } = useActiveWorkspace();
  const { status } = useAppSelector((state) => state.user);
  const canViewTemplates = useCanAccessToActiveWorkspace();

  const { data, isLoading, isError } = useGetWorkspacesByWidTemplatesQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
      orderBy: 'order',
      order: 'asc',
    },
    {
      skip: !activeWorkspace,
    }
  );

  if (!data || isLoading || status === 'loading') {
    return <PageLoader />;
  }

  if (!canViewTemplates || isError) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  return (
    <Page
      pageHeader={<PageHeader />}
      title={t('__PAGE_TITLE_TEMPLATES')}
      route="templates"
    >
      <TemplatesContextProvider>
        <PageInner />
      </TemplatesContextProvider>
    </Page>
  );
};

export default Templates;
