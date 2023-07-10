import { Anchor, Skeleton } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { StickyContainer } from 'src/common/components/StickyContainer';
import {
  StickyNavItem,
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation';
import { extractStrapiData } from 'src/common/getStrapiData';
import { hasEnoughCoins } from 'src/common/utils';
import { CategoryResponse, ServiceResponse } from 'src/features/backoffice';
import {
  useGeti18nCategoriesQuery,
  useGeti18nServicesFeaturedQuery,
} from 'src/features/backoffice/strapi';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import i18n from 'src/i18n';

const CategoriesNav = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.user);

  const { activeWorkspace } = useActiveWorkspace();

  const notFoundRoute = useLocalizeRoute('oops');

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGeti18nCategoriesQuery({
    populate: {
      services: {
        populate: '*',
        locale: i18n.language,
        sort: 'sort_order',
      },
    },
    locale: i18n.language,
  });

  const categories: Array<CategoryResponse> = [];

  if (categoriesData) {
    if (categoriesData.data) {
      categoriesData.data.forEach((category) => {
        categories.push({ data: category });
      });
    }
  }

  if (categoriesError) {
    navigate(notFoundRoute, { replace: true });
  }

  const {
    data: featuredData,
    isLoading: featuredLoading,
    isError: featuredError,
  } = useGeti18nServicesFeaturedQuery({
    populate: '*',
    locale: i18n.language,
    sort: 'sort_order',
    filters: {
      is_featured: {
        $eq: true,
      },
    },
    pagination: {
      limit: 3,
    },
  });

  const featured: Array<ServiceResponse> = [];

  if (featuredData) {
    if (featuredData.data) {
      featuredData.data.forEach((serviceData) => {
        const service = extractStrapiData({ data: serviceData });
        // Check coins availability for each service considering the service express cost
        const express = extractStrapiData(service.express);
        if (
          !express ||
          hasEnoughCoins({ workspace: activeWorkspace, coins: express.cost })
        ) {
          featured.push({ data: service });
        }
      });
    }
  }

  if (featuredError) {
    navigate(notFoundRoute, { replace: true });
  }

  return featuredLoading || categoriesLoading || status === 'loading' ? (
    <StickyContainer>
      <Skeleton width="100%" height="20px" style={{ margin: '10px 0' }} />
      <Skeleton width="100%" height="20px" style={{ margin: '10px 0' }} />
      <Skeleton width="100%" height="20px" style={{ margin: '10px 0' }} />
      <StyledDivider />
      <Skeleton width="100%" height="20px" />
    </StickyContainer>
  ) : (
    <StickyContainer>
      {featured.length > 0 ? (
        <StickyNavItem
          style={{ marginTop: 0 }}
          to="featured"
          containerId="main"
          spy
          smooth
          duration={500}
          offset={-350}
        >
          {t('__CATALOG_PAGE_CONTENT_FEATURED_TITLE')}
        </StickyNavItem>
      ) : null}
      {categories.length > 0 ? (
        <>
          <StickyNavItemLabel>
            {t('__CATALOG_STICKY_CONTAINER_NAV_CATEGORIES_LABEL')}
          </StickyNavItemLabel>
          {categories.map((categoryResponse) => {
            const { data: categoryData } = categoryResponse;
            const category = extractStrapiData({ data: categoryData });
            const categoryServices: Array<ServiceResponse> = [];
            if (category) {
              if (category.services) {
                const services = extractStrapiData(category.services);
                services.forEach((service: any) => {
                  // Check coins availability for each service considering the service express cost
                  const express = extractStrapiData(service.express);
                  if (
                    !express ||
                    hasEnoughCoins({
                      workspace: activeWorkspace,
                      coins: express.cost,
                    })
                  ) {
                    categoryServices.push({ data: service });
                  }
                });
              }
            }

            return categoryServices.length ? (
              <StickyNavItem
                to={category.Slug || ''}
                containerId="main"
                spy
                smooth
                duration={500}
                offset={-350}
              >
                {category.Name} ({categoryServices.length})
              </StickyNavItem>
            ) : null;
          })}
        </>
      ) : null}
      {(featured.length > 0 || categories.length > 0) && <StyledDivider />}
      <Anchor
        isExternal
        onClick={() => {
          window.open('https://unguess.io/services/', '_blank');
        }}
      >
        {t('__CATALOG_STICKY_CONTAINER_NAV_EXTERNAL_LINK_LABEL')}
      </Anchor>
    </StickyContainer>
  );
};

export { CategoriesNav };
