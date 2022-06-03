import { Page } from 'src/features/templates/Page';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

import { ExpressWizardContainer } from 'src/pages/ExpressWizard';
import { ExpressDrawer } from 'src/pages/ExpressWizard/drawer';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { FEATURE_FLAG_CATALOG } from 'src/constants';
import { Feature } from 'src/features/api';
import { openWizard } from 'src/features/express/expressSlice';
import { useGetFullServicesByIdQuery } from 'src/features/backoffice/strapi';
import PageLoader from 'src/features/templates/PageLoader';
import { ServiceTimeline } from './ServiceTimeline';
import { SingleServicePageHeader } from './SingleServicePageHeader';

const Service = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute('oops');

  const { userData, status } = useAppSelector((state) => state.user);
  if (
    status === 'logged' &&
    (!userData.features ||
      !userData.features.find(
        (feature: Feature) => feature.slug === FEATURE_FLAG_CATALOG
      ))
  ) {
    navigate(notFoundRoute, { replace: true });
  }

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

  if (isError) {
    navigate(notFoundRoute, { replace: true });
  }

  const serviceName = data ? data.data?.attributes?.title : '';
  

  return isLoading || status === 'loading' ? (
    <PageLoader />
  ) : (
    <Page
      pageHeader={data && <SingleServicePageHeader {...data} />}
      title={serviceName}
      route="templates"
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
