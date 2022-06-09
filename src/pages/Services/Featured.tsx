import { PageLoader, Paragraph, XXL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { Divider } from 'src/common/components/divider';
import { FEATURE_FLAG_EXPRESS } from 'src/constants';
import { ServiceResponse } from 'src/features/backoffice';
import { useGeti18nServicesFeaturedQuery } from 'src/features/backoffice/strapi';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { Services } from './services-list';

const PageTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StyledDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.space.base * 3}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
`;

export const Featured = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userData, status } = useAppSelector((state) => state.user);
  const notFoundRoute = useLocalizeRoute('oops');

  const hasExpress =
    status === 'logged' &&
    userData.features?.find((feature) => feature.slug === FEATURE_FLAG_EXPRESS);

  const featuredData = useGeti18nServicesFeaturedQuery({
    populate: '*',
    locale: i18n.language,
    sort: 'sort_order',
    filters: {
      is_featured: {
        $eq: true,
      },
    },
  });

  const featured: Array<ServiceResponse> = [];

  if (featuredData.data) {
    if (featuredData.data.data) {
      featuredData.data.data.forEach((service) => {
        if (service.attributes?.is_express && hasExpress) {
          featured.push({ data: service });
        } else {
          featured.push({ data: service });
        }
      });
    }
  }

  if (featuredData.error) {
    navigate(notFoundRoute, { replace: true });
  }

  return featuredData.isLoading || status === 'loading' ? (
    <PageLoader />
  ) : (
    <>
      <PageTitle>{t('__CATALOG_PAGE_CONTENT_FEATURED_TITLE')}</PageTitle>
      <Paragraph>{t('__CATALOG_PAGE_CONTENT_FEATURED_PARAGRAPH')}</Paragraph>
      <StyledDivider />
      {featured.length > 0 ? (
        <Services services={featured} />
      ) : (
        <Paragraph>{t('__CATALOG_PAGE_CONTENT_NO_SERVICES')}</Paragraph>
      )}
    </>
  );
};
