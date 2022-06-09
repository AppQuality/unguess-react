import {
  Anchor,
  ContainerCard,
  MD,
  PageLoader,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { CategoryResponse, ServiceResponse } from 'src/features/backoffice';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import i18n from 'src/i18n';
import { useGeti18nCategoriesQuery } from 'src/features/backoffice/strapi';
import styled from 'styled-components';
import { Divider } from 'src/common/components/divider';
import { Link } from 'react-scroll';
import { FEATURE_FLAG_EXPRESS } from 'src/constants';

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
  const { userData, status } = useAppSelector((state) => state.user);
  const notFoundRoute = useLocalizeRoute('oops');

  const hasExpress =
    status === 'logged' &&
    userData.features?.find((feature) => feature.slug === FEATURE_FLAG_EXPRESS);

  const categoriesData = useGeti18nCategoriesQuery({
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

  if (categoriesData.data) {
    if (categoriesData.data.data) {
      categoriesData.data.data.forEach((category) => {
        categories.push({ data: category });
      });
    }
  }

  if (categoriesData.error) {
    navigate(notFoundRoute, { replace: true });
  }

  return categoriesData.isLoading || status === 'loading' ? (
    <PageLoader />
  ) : (
    <StickyContainer>
      {categories.length > 0 && (
        <StickyNavItem
          style={{ marginTop: 0 }}
          to="featured"
          containerId="main"
          spy
          smooth
          duration={500}
          offset={-350}
        >
          {t('__CATALOG_STICKY_CONTAINER_NAV_SHOW_ALL')}
        </StickyNavItem>
      )}
      <StickyNavItemLabel>
        {t('__CATALOG_STICKY_CONTAINER_NAV_CATEGORIES_LABEL')}
      </StickyNavItemLabel>
      {categories.map((category) => {
        const { data } = category;

        const categoryServices: Array<ServiceResponse> = [];
        if (category.data) {
          if (category.data.attributes?.services?.data) {
            category.data.attributes?.services?.data.forEach((service) => {
              if (service.attributes?.is_express && hasExpress) {
                categoryServices.push({ data: service });
              } else {
                categoryServices.push({ data: service });
              }
            });
          }
        }

        return (
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
        );
      })}
      <StyledDivider />
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
