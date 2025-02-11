import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { HubspotModal } from 'src/common/components/HubspotModal';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { checkHubspotURL, getLocalizedStrapiData } from 'src/common/utils';
import { useGetFullServicesByIdQuery } from 'src/features/backoffice/strapi';
import { openWizard } from 'src/features/express/expressSlice';
import { Page } from 'src/features/templates/Page';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import i18n from 'src/i18n';
import { ExpressWizardContainer } from 'src/pages/ExpressWizard';
import { ExpressDrawer } from 'src/pages/ExpressWizard/drawer';
import { PageLoader } from 'src/common/components/PageLoader';
import { TemplateTimeline } from './TemplateTimeline';
import { SingleTemplatePageHeader } from './SingleTemplatePageHeader';
import { strapiParams } from './strapi';

const Template = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute('oops');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeWorkspace } = useActiveWorkspace();
  const location = useLocation();

  const memoCsm = useMemo(() => activeWorkspace?.csm, [activeWorkspace]);

  const { status } = useAppSelector((state) => state.user);

  if (!templateId || Number.isNaN(Number(templateId))) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  const { data, isLoading, isError } = useGetFullServicesByIdQuery({
    id: templateId || '',
    populate: {
      ...strapiParams,
      localizations: {
        populate: {
          ...strapiParams,
        },
      },
    },
  });

  let template;

  if (data) {
    template = getLocalizedStrapiData({
      item: data,
      language: i18n.language,
    });
  }

  if (isError) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  const handleContactUsClick = () => {
    if (memoCsm && memoCsm.url && checkHubspotURL(memoCsm.url)) {
      setIsModalOpen(true);
    } else {
      window.location.href = `mailto:${
        activeWorkspace?.csm.email || 'info@unguess.io'
      }`;
    }
  };

  if (!data || isLoading || status === 'loading') {
    return <PageLoader />;
  }

  return (
    <Page
      pageHeader={
        <SingleTemplatePageHeader
          response={data}
          onContactClick={handleContactUsClick}
        />
      }
      title={template.title}
      route="template"
    >
      <LayoutWrapper>
        <HubspotModal
          isOpen={isModalOpen}
          meetingUrl={memoCsm?.url}
          onClose={() => setIsModalOpen(false)}
        />
        <TemplateTimeline
          response={data}
          onContactClick={handleContactUsClick}
        />
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
