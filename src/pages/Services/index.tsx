import { Page } from 'src/features/templates/Page';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Col, Grid, Row, PageHeader } from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import PageLoader from 'src/features/templates/PageLoader';
import { Featured } from './Featured';
import { Categories } from './Categories';
import { CategoriesNav } from './CategoriesNav';

const PageContent = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => theme.space.xl};
`;

const StyledGrid = styled(Grid)`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0;
  }
`;

const Catalog = () => {
  const { t } = useTranslation();
  const { status } = useAppSelector((state) => state.user);

  return status === 'loading' ? (
    <PageLoader />
  ) : (
    <Page
      pageHeader={
        <PageHeader>
          <PageHeader.Main
            infoTitle={t('__CATALOG_PAGE_TITLE')}
            infoDescription={t('__CATALOG_PAGE_DESCRIPTION')}
          />
        </PageHeader>
      }
      title={t('__PAGE_TITLE_CATALOG')}
      route="services"
    >
      <StyledGrid gutters="lg">
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
      </StyledGrid>
    </Page>
  );
};

export default Catalog;
