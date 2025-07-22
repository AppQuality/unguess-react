import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageLoader } from 'src/common/components/PageLoader';
import PlanCreationInterface from 'src/common/components/PlanCreationInterface';
import {
  useGetUsersMeQuery,
  useGetWorkspacesByWidTemplatesAndTidQuery,
} from 'src/features/api';
import { Page } from 'src/features/templates/Page';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  getTemplateTitle,
  SingleTemplatePageHeader,
} from './SingleTemplatePageHeader';
import { TemplateTimeline } from './TemplateTimeline';

const Template = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const location = useLocation();
  const { activeWorkspace } = useActiveWorkspace();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { isLoading: isUserLoading, isFetching: isUserFetching } =
    useGetUsersMeQuery();

  if (typeof templateId === 'undefined') {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
    return null;
  }

  const { data, isLoading, isError } =
    useGetWorkspacesByWidTemplatesAndTidQuery(
      {
        wid: activeWorkspace?.id.toString() || '',
        tid: templateId,
      },
      {
        skip: !activeWorkspace,
      }
    );

  if (isError) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
    return null;
  }

  if (
    !data ||
    isLoading ||
    isUserFetching ||
    isUserLoading ||
    !activeWorkspace
  ) {
    return <PageLoader />;
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLaunchActivity = () => {
    setIsDrawerOpen(true);
  };

  return (
    <Page
      pageHeader={
        <SingleTemplatePageHeader
          template={data}
          handleLaunchActivity={handleLaunchActivity}
        />
      }
      title={getTemplateTitle(data)}
      route="template"
    >
      <LayoutWrapper>
        <TemplateTimeline
          template={data}
          handleLaunchActivity={handleLaunchActivity}
        />
      </LayoutWrapper>

      <PlanCreationInterface
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        template={data}
      />
    </Page>
  );
};

export default Template;
