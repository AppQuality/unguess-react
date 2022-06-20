import { Page } from 'src/features/templates/Page';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

import { ExpressWizardContainer } from 'src/pages/ExpressWizard';
import { ExpressDrawer } from 'src/pages/ExpressWizard/drawer';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { openWizard } from 'src/features/express/expressSlice';
import { useGetFullServicesByIdQuery } from 'src/features/backoffice/strapi';
import PageLoader from 'src/features/templates/PageLoader';
import { extractStrapiData } from 'src/common/getStrapiData';
import { ServiceTimeline } from './ServiceTimeline';
import { SingleServicePageHeader } from './SingleServicePageHeader';

const Service = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute('oops');

  const { status } = useAppSelector((state) => state.user);

  if (!templateId || Number.isNaN(Number(templateId))) {
    navigate(notFoundRoute, { replace: true });
  }

  const { data, isLoading, isError } = useGetFullServicesByIdQuery({
    id: templateId || '',
    populate: {
      output_image: '*',
      requirements: {
        populate: {
          description: {
            populate: '*',
          },
          list: {
            populate: '*',
          },
        },
      },
      why: {
        populate: {
          reasons: {
            populate: '*',
          },
          advantages: {
            populate: '*',
          },
        },
      },
      what: { populate: '*' },
      how: {
        populate: {
          timeline: {
            populate: '*',
          },
        },
      },
    },
  });

  let service;

  if (data) {
    service = extractStrapiData(data);
  }

  if (isError) {
    navigate(notFoundRoute, { replace: true });
  }

  return isLoading || status === 'loading' ? (
    <PageLoader />
  ) : (
    <Page
      pageHeader={data && <SingleServicePageHeader {...data} />}
      title={service.title}
      route="services"
    >
      {data && (
        <>
          <ServiceTimeline {...data} />
          <ExpressDrawer
            onCtaClick={() => {
              dispatch(openWizard());
            }}
          />
          <ExpressWizardContainer />
        </>
      )}
    </Page>
  );
};

export default Service;
