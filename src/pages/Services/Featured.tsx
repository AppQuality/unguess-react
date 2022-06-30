import { Paragraph, XXL } from '@appquality/unguess-design-system';
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
import { Services } from './services-list';

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

export const Featured = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.user);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const notFoundRoute = useLocalizeRoute('oops');

  const hasExpress =
    status === 'logged' && hasEnoughCoins({ workspace: activeWorkspace });

  const {
    data: featuredData,
    isLoading,
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

  const featured: Array<any> = [];

  const formattedFeatured = extractStrapiData(featuredData);

  if (featuredData) {
    formattedFeatured.forEach((service: any) => {
      if (!service.is_express || hasExpress) {
        featured.push(service);
      }
    });
  }

  if (isError) {
    navigate(notFoundRoute, { replace: true });
  }

  if (isLoading || status === 'loading') {
    return (
      <FeaturedContainer>
        <LoadingServices />
      </FeaturedContainer>
    );
  }

  return featured.length ? (
    <FeaturedContainer id="featured">
      <SectionTitle>{t('__CATALOG_PAGE_CONTENT_FEATURED_TITLE')}</SectionTitle>
      <Paragraph>{t('__CATALOG_PAGE_CONTENT_FEATURED_PARAGRAPH')}</Paragraph>
      <StyledDivider />
      <Services services={featured} />
    </FeaturedContainer>
  ) : null;
};
