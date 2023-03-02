import { Page } from 'src/features/templates/Page';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useMemo, useState } from 'react';
import { ExpressWizardContainer } from 'src/pages/ExpressWizard';
import { ExpressDrawer } from 'src/pages/ExpressWizard/drawer';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { openWizard } from 'src/features/express/expressSlice';
import { useGetFullServicesByIdQuery } from 'src/features/backoffice/strapi';
import PageLoader from 'src/features/templates/PageLoader';
import { HubspotModal } from 'src/common/components/HubspotModal';
import { checkHubspotURL, getLocalizedStrapiData } from 'src/common/utils';
import i18n from 'src/i18n';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { ServiceTimeline } from './ServiceTimeline';
import { SingleServicePageHeader } from './SingleServicePageHeader';
import { strapiParams } from './strapi';

const Service = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute('oops');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);

  const memoCsm = useMemo(() => activeWorkspace?.csm, [activeWorkspace]);

  const { status } = useAppSelector((state) => state.user);

  if (!templateId || Number.isNaN(Number(templateId))) {
    navigate(notFoundRoute, { replace: true });
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

  let service;

  if (data) {
    service = getLocalizedStrapiData({
      item: data,
      language: i18n.language,
    });
  }

  if (isError) {
    navigate(notFoundRoute, { replace: true });
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

  return isLoading || status === 'loading' ? (
    <PageLoader />
  ) : (
    <Page
      pageHeader={
        data && (
          <SingleServicePageHeader
            response={data}
            onContactClick={handleContactUsClick}
          />
        )
      }
      title={service.title}
      route="service"
    >
      {data && (
        <LayoutWrapper>
          <HubspotModal
            isOpen={isModalOpen}
            meetingUrl={memoCsm?.url}
            onClose={() => setIsModalOpen(false)}
          />
          <ServiceTimeline
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
      )}
    </Page>
  );
};

export default Service;
