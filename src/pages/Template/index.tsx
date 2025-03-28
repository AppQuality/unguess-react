import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageLoader } from 'src/common/components/PageLoader';
import { useGetWorkspacesByWidTemplatesAndTidQuery } from 'src/features/api';
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

  const { status } = useAppSelector((state) => state.user);

  if (typeof templateId === 'undefined') {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
    return null;
  }

  const { data, isLoading, isError } =
    useGetWorkspacesByWidTemplatesAndTidQuery({
      wid: activeWorkspace?.id.toString() || '',
      tid: templateId,
    });

  if (isError) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
    return null;
  }

  if (!data || isLoading || status === 'loading' || !activeWorkspace) {
    return <PageLoader />;
  }

  return (
    <Page
      pageHeader={<SingleTemplatePageHeader template={data} />}
      title={getTemplateTitle(data)}
      route="template"
    >
      <LayoutWrapper>
        <TemplateTimeline template={data} />
      </LayoutWrapper>
    </Page>
  );
};

export default Template;
