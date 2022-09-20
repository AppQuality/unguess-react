import { Paragraph, Row, XXL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { Divider } from 'src/common/components/divider';
import { extractStrapiData } from 'src/common/getStrapiData';
import { hasEnoughCoins } from 'src/common/utils';
import { useGeti18nServicesFeaturedQuery } from 'src/features/backoffice/strapi';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { LoadingServices } from './LoadingServices';
import { ServiceItem } from './services-list/serviceItem';

const SectionTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StyledDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.space.base * 3}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
`;

const FeaturedContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.space.xxl};
`;

export const Featured = ({ handleHubspot }: { handleHubspot: () => void }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const notFoundRoute = useLocalizeRoute('oops');

  const {
    data: featuredData,
    isLoading,
    isFetching,
    isError,
  } = useGeti18nServicesFeaturedQuery({
    populate: '*',
    locale: i18n.language,
    sort: 'sort_order',
    pagination: {
      limit: 3,
    },
    filters: {
      is_featured: {
        $eq: true,
      },
    },
  });

  let formattedFeatured = [];
  if (featuredData) {
    formattedFeatured = extractStrapiData(featuredData);
  }

  // Reduce the featured services to only the ones that have enough coins
  let featuredServices = [];
  if (formattedFeatured) {
    featuredServices = formattedFeatured.filter((service: any) =>
      hasEnoughCoins({
        workspace: activeWorkspace,
        coins: extractStrapiData(service.express).cost,
      })
    );
  }

  if (isError) {
    navigate(notFoundRoute, { replace: true });
  }

  if (isLoading || isFetching) {
    return (
      <FeaturedContainer>
        <LoadingServices />
      </FeaturedContainer>
    );
  }

  return featuredServices.length ? (
    <FeaturedContainer id="featured">
      <SectionTitle>{t('__CATALOG_PAGE_CONTENT_FEATURED_TITLE')}</SectionTitle>
      <Paragraph>{t('__CATALOG_PAGE_CONTENT_FEATURED_PARAGRAPH')}</Paragraph>
      <StyledDivider />
      <Row>
        {featuredServices.map((featured: any) => (
          <ServiceItem
            serviceId={featured.id}
            key={featured.id}
            handleHubspot={handleHubspot}
          />
        ))}
      </Row>
    </FeaturedContainer>
  ) : null;
};
