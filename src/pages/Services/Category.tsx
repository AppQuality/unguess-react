import i18n from 'src/i18n';
import { useGetFullCategoriesByIdQuery } from 'src/features/backoffice/strapi';
import { ReactComponent as InfoImg } from 'src/assets/icons/info-image.svg';
import { Divider } from 'src/common/components/divider';
import { Paragraph, XXL } from '@appquality/unguess-design-system';
import { WaterButton } from 'src/common/components/waterButton';
import { FEATURE_FLAG_EXPRESS } from 'src/constants';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { extractStrapiData } from 'src/common/getStrapiData';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { LoadingServices } from './LoadingServices';
import { Services } from './services-list';

const SectionTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StyledDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.space.base * 3}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
`;

const CategoryContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.space.xxl};
`;

export const Category = ({ id }: { id: any }) => {
  const { t } = useTranslation();
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { userData, status } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');

  const hasExpress =
    status === 'logged' &&
    userData.features?.find((feature) => feature.slug === FEATURE_FLAG_EXPRESS);

  const showTipCard = true;

  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useGetFullCategoriesByIdQuery({
    id,
    locale: i18n.language,
    populate: {
      services: {
        populate: '*',
        locale: i18n.language,
        sort: 'sort_order',
      },
    },
  });

  let formattedCategory;
  let formattedServices;
  const services: Array<any> = [];

  if (categoryData) {
    formattedCategory = extractStrapiData(categoryData);
    formattedServices = extractStrapiData(formattedCategory.services);
    if (formattedServices.length) {
      formattedServices.forEach((service: any) => {
        if (!service.is_express || hasExpress) {
          services.push(service);
        }
      });
    }
  }

  // Add info card service
  if (showTipCard) {
    services.push({
      id: 0,
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
    });
  }

  const initialServicesLength = showTipCard ? 1 : 0;

  if (categoryError) {
    navigate(notFoundRoute, { replace: true });
  }

  if (categoryLoading) {
    return (
      <CategoryContainer>
        <LoadingServices />
      </CategoryContainer>
    );
  }

  return services.length > initialServicesLength ? (
    <CategoryContainer id={formattedCategory.Slug}>
      <SectionTitle>{formattedCategory.Name}</SectionTitle>
      <Paragraph>{formattedCategory.Description}</Paragraph>
      <StyledDivider />
      <Services services={services} />
    </CategoryContainer>
  ) : null;
};
