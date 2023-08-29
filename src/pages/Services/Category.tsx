import i18n from 'src/i18n';
import { useGetFullCategoriesByIdQuery } from 'src/features/backoffice/strapi';
import { Divider } from 'src/common/components/divider';
import { Paragraph, Row, XXL } from '@appquality/unguess-design-system';
import { extractStrapiData } from 'src/common/getStrapiData';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { SERVICES_SHOW_TIPS } from 'src/constants';
import { LoadingServices } from './LoadingServices';
import { ServiceItem } from './services-list/serviceItem';
import { ServiceCol } from './services-list/ServiceCol';
import { ServiceTip } from './services-list/serviceTip';

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

export const Category = ({
  id,
  handleHubspot,
}: {
  id: string;
  handleHubspot: () => void;
}) => {
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const location = useLocation();

  const {
    data: categoryData,
    isLoading,
    isError,
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

  const formattedCategory = extractStrapiData(categoryData);
  const formattedServices = extractStrapiData(formattedCategory.services);

  if (isError) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  if (isLoading) {
    return (
      <CategoryContainer>
        <LoadingServices />
      </CategoryContainer>
    );
  }

  return formattedServices.length ? (
    <CategoryContainer key={formattedCategory.Slug} id={formattedCategory.Slug}>
      <SectionTitle>{formattedCategory.Name}</SectionTitle>
      <Paragraph>{formattedCategory.Description}</Paragraph>
      <StyledDivider />
      <Row>
        {formattedServices.map((service: any) => (
          <ServiceItem
            serviceId={service.id}
            key={service.id}
            handleHubspot={handleHubspot}
          />
        ))}
        {SERVICES_SHOW_TIPS && (
          <ServiceCol xs={12} md={6} lg={4}>
            <ServiceTip />
          </ServiceCol>
        )}
      </Row>
    </CategoryContainer>
  ) : null;
};
