import { PageLoader, Paragraph, XXL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { Divider } from 'src/common/components/divider';
import { FEATURE_FLAG_EXPRESS } from 'src/constants';
import { ServiceResponse } from 'src/features/backoffice';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { ReactComponent as InfoImg } from 'src/assets/icons/info-image.svg';
import i18n from 'src/i18n';
import { useGeti18nServicesQuery } from 'src/features/backoffice/strapi';
import styled from 'styled-components';
import { WaterButton } from 'src/common/components/waterButton';
import { Services } from './services-list';

const PageTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StyledDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.space.base * 3}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
`;

interface InfoService {
  data: {
    id: number;
    attributes: {
      is_info: boolean;
      info_img: React.ReactNode;
      info_subtitle: string;
      info_title: string;
      info_buttons: Array<React.ReactNode>;
    };
  };
}

export const Categories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userData, status } = useAppSelector((state) => state.user);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const notFoundRoute = useLocalizeRoute('oops');

  const hasExpress =
    status === 'logged' &&
    userData.features?.find((feature) => feature.slug === FEATURE_FLAG_EXPRESS);

  const servicesData = useGeti18nServicesQuery({
    populate: '*',
    locale: i18n.language,
    sort: 'sort_order',
  });

  const services: Array<ServiceResponse | InfoService> = [];

  if (servicesData.data) {
    if (servicesData.data.data) {
      servicesData.data.data.forEach((service) => {
        if (service.attributes?.is_express && hasExpress) {
          services.push({ data: service });
        } else {
          services.push({ data: service });
        }
      });
    }
  }

  if (servicesData.error) {
    navigate(notFoundRoute, { replace: true });
  }

  // Add info card service
  services.push({
    data: {
      id: 0,
      attributes: {
        is_info: true,
        info_img: <InfoImg />,
        info_subtitle: t('__CATALOG_PAGE_INFO_SERVICE_SUBTITLE'),
        info_title: t('__CATALOG_PAGE_INFO_SERVICE_TITLE'),
        info_buttons: [
          <WaterButton
            isPill
            isPrimary
            size="small"
            onClick={() => {
              window.location.href = `mailto:${
                activeWorkspace?.csm.email || 'info@unguess.io'
              }`;
            }}
          >
            {t('__CATALOG_PAGE_INFO_SERVICE_BUTTON_CONTACT_LABEL')}
          </WaterButton>,
        ],
      },
    },
  });

  return servicesData.isLoading || status === 'loading' ? (
    <PageLoader />
  ) : (
    <>
      <PageTitle>Category Title</PageTitle>
      <Paragraph>Category Description</Paragraph>
      <StyledDivider />
      {services.length > 0 ? (
        <Services services={services} />
      ) : (
        <Paragraph>{t('__CATALOG_PAGE_CONTENT_NO_SERVICES')}</Paragraph>
      )}
    </>
  );
};
