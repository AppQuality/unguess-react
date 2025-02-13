import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageLoader } from 'src/common/components/PageLoader';
import { openWizard } from 'src/features/express/expressSlice';
import { Page } from 'src/features/templates/Page';
import { useCampaignTemplateById } from 'src/hooks/useCampaignTemplateById';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { ExpressWizardContainer } from 'src/pages/ExpressWizard';
import { ExpressDrawer } from 'src/pages/ExpressWizard/drawer';
import { SingleTemplatePageHeader } from './SingleTemplatePageHeader';
import { TemplateTimeline } from './TemplateTimeline';

const Template = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute('oops');
  const location = useLocation();

  const { status } = useAppSelector((state) => state.user);

  if (!templateId || Number.isNaN(Number(templateId))) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }
  const { data, isLoading, isError } = useCampaignTemplateById(
    templateId || ''
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
      pageHeader={<SingleTemplatePageHeader />}
      title={data.title}
      route="template"
    >
      <LayoutWrapper>
        <TemplateTimeline />
        <ExpressDrawer
          onCtaClick={() => {
            dispatch(openWizard());
          }}
        />
        <ExpressWizardContainer />
      </LayoutWrapper>
    </Page>
  );
};

export default Template;
