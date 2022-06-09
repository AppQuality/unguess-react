import { PageLoader, Paragraph, XXL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { Divider } from 'src/common/components/divider';
import { FEATURE_FLAG_EXPRESS } from 'src/constants';
import { CategoryResponse, ServiceResponse } from 'src/features/backoffice';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { ReactComponent as InfoImg } from 'src/assets/icons/info-image.svg';
import i18n from 'src/i18n';
import { useGeti18nCategoriesQuery } from 'src/features/backoffice/strapi';
import styled from 'styled-components';
import { WaterButton } from 'src/common/components/waterButton';
import { Services } from './services-list';
import { CardRowLoading } from '../Dashboard/CardRowLoading';

const PageTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StyledDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.space.base * 3}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
`;

const CategoryContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.space.xxl};
`;

const Wrapper = styled.div``;

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

const Categories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userData, status } = useAppSelector((state) => state.user);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const notFoundRoute = useLocalizeRoute('oops');
  const showTipCard = true;

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
    <CategoryContainer>
      <CardRowLoading />
    </CategoryContainer>
  ) : (
    <Wrapper>
      {categories.map((category) => {
        const categoryServices: Array<ServiceResponse | InfoService> = [];
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

        // Add info card service
        if (showTipCard)
          categoryServices.push({
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

        return (
          <CategoryContainer id={category.data?.attributes?.Slug}>
            <PageTitle>{category.data?.attributes?.Name}</PageTitle>
            <Paragraph>{category.data?.attributes?.Description}</Paragraph>
            <StyledDivider />
            {categoryServices.length > 0 ? (
              <Services services={categoryServices} />
            ) : (
              <Paragraph>{t('__CATALOG_PAGE_CONTENT_NO_SERVICES')}</Paragraph>
            )}
          </CategoryContainer>
        );
      })}
    </Wrapper>
  );
};

export { Categories };
