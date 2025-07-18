import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageLoader } from 'src/common/components/PageLoader';
import PlanCreationInterface from 'src/common/components/PlanCreationInterface';
import {
  useGetUsersMeQuery,
  useGetWorkspacesByWidTemplatesQuery,
} from 'src/features/api';
import { Page } from 'src/features/templates/Page';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
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
    <LayoutWrapper>
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
    </LayoutWrapper>
  );
};

const Templates = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const location = useLocation();
  const { activeWorkspace } = useActiveWorkspace();
  const { isLoading: isUserLoading, isFetching: isUserFetching } =
    useGetUsersMeQuery();

  const { isLoading, isError } = useGetWorkspacesByWidTemplatesQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
      orderBy: 'order',
      order: 'asc',
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

  if (isLoading || isUserFetching || isUserLoading) {
    return <PageLoader />;
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
