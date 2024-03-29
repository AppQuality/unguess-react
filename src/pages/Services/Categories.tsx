import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import i18n from 'src/i18n';
import { useGeti18nCategoriesQuery } from 'src/features/backoffice/strapi';
import styled from 'styled-components';
import { extractStrapiData } from 'src/common/getStrapiData';
import { LoadingServices } from './LoadingServices';
import { Category } from './Category';

const CategoryContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.space.xxl};
`;

const Categories = ({ handleHubspot }: { handleHubspot: () => void }) => {
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.user);
  const notFoundRoute = useLocalizeRoute('oops');
  const location = useLocation();

  const {
    data: categoriesData,
    isLoading,
    isError,
  } = useGeti18nCategoriesQuery({
    populate: {
      services: {
        locale: i18n.language,
        sort: 'sort_order',
      },
    },
    locale: i18n.language,
  });

  let formattedCategories;
  const categories: Array<any> = [];

  if (categoriesData) {
    formattedCategories = extractStrapiData(categoriesData);
    formattedCategories.forEach((category: any) => {
      categories.push(category);
    });
  }

  if (isError) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  if (isLoading || status === 'loading') {
    return (
      <CategoryContainer>
        <LoadingServices />
      </CategoryContainer>
    );
  }

  if (!categories.length) return null;

  return (
    <>
      {categories.map((category) => (
        <Category id={category.id} handleHubspot={handleHubspot} />
      ))}
    </>
  );
};

export { Categories };
