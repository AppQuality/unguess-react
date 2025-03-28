import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import {
  AsideNav,
  StickyNavItem,
  StickyNavItemExternal,
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation/asideNav';
import { extractStrapiData } from 'src/common/getStrapiData';
import { CategoryResponse, ServiceResponse } from 'src/features/backoffice';
import { useGeti18nCategoriesQuery } from 'src/features/backoffice/strapi';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import i18n from 'src/i18n';

const CategoriesNav = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.user);
  const notFoundRoute = useLocalizeRoute('oops');
  const location = useLocation();

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
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  return (
    <AsideNav
      isLoading={status === 'loading' || categoriesLoading}
      containerId="main"
    >
      <>
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
                    categoryServices.push({ data: service });
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
        {categories.length > 0 && <StyledDivider />}
        <StickyNavItemExternal
          isExternal
          onClick={() => {
            window.open('https://unguess.io/services/', '_blank');
          }}
        >
          {t('__CATALOG_STICKY_CONTAINER_NAV_EXTERNAL_LINK_LABEL')}
        </StickyNavItemExternal>
      </>
    </AsideNav>
  );
};

export { CategoriesNav };
