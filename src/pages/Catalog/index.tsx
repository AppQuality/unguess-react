import { Page } from 'src/features/templates/Page';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  Col,
  Grid,
  Row,
  MD,
  Paragraph,
  Timeline,
  XXL,
  XXXL,
  LG,
  ContainerCard,
} from '@appquality/unguess-design-system';
import i18n from 'src/i18n';
import { useGeti18nServicesQuery } from 'src/features/backoffice/strapi';
import { ReactComponent as TailoredIcon } from 'src/assets/icons/tailored-icon.svg';
import { ReactComponent as ExpressIcon } from 'src/assets/icons/express-icon.svg';
import { useAppSelector } from 'src/app/hooks';
import { FEATURE_FLAG_CATALOG, FEATURE_FLAG_EXPRESS } from 'src/constants';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useNavigate } from 'react-router-dom';
import { Feature } from 'src/features/api';
import { PageHeaderContainer } from 'src/common/components/pageHeaderContainer';
import PageLoader from 'src/features/templates/PageLoader';
import { Divider } from 'src/common/components/divider';
import { WaterButton } from 'src/common/components/waterButton';
import { ReactComponent as InfoImg } from 'src/assets/icons/info-image.svg';
import { Services } from './services-list';

const StickyContainer = styled(ContainerCard)`
  position: sticky;
  top: ${({ theme }) => theme.space.md};
  z-index: 1;
  padding: ${({ theme }) => theme.space.base * 6}px;
  padding-top: ${({ theme }) => theme.space.xl};
  background-color: ${({ theme }) => theme.palette.white};
`;

const StickyContainerTitle = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StickyContainerParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[800]};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const PageContent = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => theme.space.xl};
`;

const PageTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const StyledDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.space.base * 3}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
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

  if (
    status === 'logged' &&
    (!userData.features ||
      !userData.features.find(
        (feature: Feature) => feature.slug === FEATURE_FLAG_CATALOG
      ))
  ) {
    navigate(notFoundRoute, { replace: true });
  }

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

  // Add info card service
  services.push({
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
  });

  return isLoading || status === 'loading' ? (
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
      route="templates"
    >
      <Grid gutters="lg">
        <Row>
          <Col xs={12} lg={3}>
            <StickyContainer>
              <StickyContainerTitle>
                {t('__CATALOG_STICKY_CONTAINER_TITLE')}
              </StickyContainerTitle>
              <StickyContainerParagraph>
                {t('__CATALOG_STICKY_CONTAINER_PARAGRAPH')}
              </StickyContainerParagraph>
              <Timeline>
                <Timeline.Item hiddenLine icon={<ExpressIcon />}>
                  <Timeline.Content>
                    <Paragraph style={{ fontWeight: 500 }}>
                      {t('__EXPRESS_LABEL')}
                    </Paragraph>
                    {t(
                      '__CATALOG_STICKY_CONTAINER_TIMELINE_ITEM_EXPRESS_DESCRIPTION'
                    )}
                  </Timeline.Content>
                </Timeline.Item>
                <Timeline.Item hiddenLine icon={<TailoredIcon />}>
                  <Timeline.Content>
                    <Paragraph style={{ fontWeight: 500 }}>
                      {t('__TAILORED_LABEL')}
                    </Paragraph>
                    {t(
                      '__CATALOG_STICKY_CONTAINER_TIMELINE_ITEM_TAILORED_DESCRIPTION'
                    )}
                  </Timeline.Content>
                </Timeline.Item>
              </Timeline>
            </StickyContainer>
          </Col>
          <Col xs={12} lg={9}>
            <PageContent>
              <PageTitle>{t('__CATALOG_PAGE_CONTENT_TITLE')}</PageTitle>
              <Paragraph>{t('__CATALOG_PAGE_CONTENT_PARAGRAPH')}</Paragraph>
              <StyledDivider />
              {services.length > 0 ? (
                <Services services={services} />
              ) : (
                <Paragraph>{t('__CATALOG_PAGE_CONTENT_NO_SERVICES')}</Paragraph>
              )}
            </PageContent>
          </Col>
        </Row>
      </Grid>
    </Page>
  );
};

export default Catalog;
