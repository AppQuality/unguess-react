import { Page } from 'src/features/templates/Page';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Col, Grid, Row, XXXL, LG } from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import { FEATURE_FLAG_EXPRESS } from 'src/constants';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useNavigate } from 'react-router-dom';
import { PageHeaderContainer } from 'src/common/components/pageHeaderContainer';
import PageLoader from 'src/features/templates/PageLoader';
import { Featured } from './Featured';
import { Categories } from './Categories';
import { CategoriesNav } from './CategoriesNav';

const PageContent = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => theme.space.xl};
`;

const PageHeaderTitle = styled(XXXL)`
  color: ${({ theme }) => theme.colors.primaryHue};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const PageHeaderDescription = styled(LG)`
  color: ${({ theme }) => theme.palette.grey[700]};
  margin-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const Catalog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { userData, status } = useAppSelector((state) => state.user);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const notFoundRoute = useLocalizeRoute('oops');

  const hasExpress =
    status === 'logged' &&
    userData.features?.find((feature) => feature.slug === FEATURE_FLAG_EXPRESS);

  const { data, error, isLoading } = useGeti18nServicesQuery({
    populate: '*',
    locale: i18n.language,
    sort: 'sort_order',
  });

  const services = [];

  if (data) {
    if (data.data) {
      data.data.forEach((service) => {
        if (service.attributes?.is_express && hasExpress) {
          services.push(service);
        } else {
          services.push(service);
        }
      });
    }
  }

  if (error) {
    navigate(notFoundRoute, { replace: true });
  }

  return status === 'loading' ? (
    <PageLoader />
  ) : (
    <Page
      pageHeader={
        <PageHeaderContainer>
          <PageHeaderTitle>{t('__CATALOG_PAGE_TITLE')}</PageHeaderTitle>
          <PageHeaderDescription>
            {t('__CATALOG_PAGE_DESCRIPTION')}
          </PageHeaderDescription>
        </PageHeaderContainer>
      }
      title={t('__PAGE_TITLE_CATALOG')}
      route="services"
    >
      <Grid gutters="lg">
        <Row>
          <Col xs={12} lg={3}>
            <CategoriesNav />
          </Col>
          <Col xs={12} lg={9}>
            <PageContent>
              <Featured />
              <Categories />
            </PageContent>
          </Col>
        </Row>
      </Grid>
    </Page>
  );
};

export default Catalog;
