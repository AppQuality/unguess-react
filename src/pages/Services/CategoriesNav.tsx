import {
  Anchor,
  ContainerCard,
  MD,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { CategoryResponse, ServiceResponse } from 'src/features/backoffice';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import i18n from 'src/i18n';
import {
  useGeti18nCategoriesQuery,
  useGeti18nServicesFeaturedQuery,
} from 'src/features/backoffice/strapi';
import styled from 'styled-components';
import { Divider } from 'src/common/components/divider';
import { Link } from 'react-scroll';
import { hasEnoughCoins } from 'src/common/utils';

const StyledDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.space.base * 3}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
`;

const StickyContainer = styled(ContainerCard)`
  position: sticky;
  top: ${({ theme }) => theme.space.md};
  z-index: 1;
  padding: ${({ theme }) => theme.space.base * 6}px;
  background-color: ${({ theme }) => theme.palette.white};
`;

const StickyNavItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-top-left-radius: ${({ theme }) => theme.space.lg};
  border-bottom-left-radius: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  cursor: pointer;
  color: ${({ theme }) => theme.palette.blue[600]};
  margin: ${({ theme }) => theme.space.sm} 0;
  background-color: transparent;
  transition: background-color 0.1s ease-in-out;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.palette.blue[700]};
    background-color: ${({ theme }) => theme.palette.kale[100]};
    transition: all 0.1s ease-in-out;
    text-decoration: none;
  }

  &.active {
    color: ${({ theme }) => theme.palette.blue[700]};
    background-color: ${({ theme }) => theme.palette.kale[100]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;

const StickyNavItemLabel = styled(MD)`
  color: ${({ theme }) => theme.palette.blue[700]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const CategoriesNav = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.user);

  const { activeWorkspace } = useAppSelector((state) => state.navigation);

  const notFoundRoute = useLocalizeRoute('oops');

  const hasExpress =
    status === 'logged' && hasEnoughCoins({ workspace: activeWorkspace });

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
      featuredData.data.forEach((service) => {
        const isExpress = service.attributes?.express?.data;
        if (!isExpress || hasExpress) {
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
          {categories.map((category) => {
            const { data } = category;

            const categoryServices: Array<ServiceResponse> = [];
            if (category.data) {
              if (category.data.attributes?.services?.data) {
                category.data.attributes?.services?.data.forEach((service) => {
                  const isExpress = service.attributes?.express?.data;
                  if (!isExpress || hasExpress) {
                    categoryServices.push({ data: service });
                  }
                });
              }
            }

            return categoryServices.length ? (
              <StickyNavItem
                to={data?.attributes?.Slug || ''}
                containerId="main"
                spy
                smooth
                duration={500}
                offset={-350}
              >
                {data?.attributes?.Name} ({categoryServices.length})
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
