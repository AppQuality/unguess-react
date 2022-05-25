import { Page } from 'src/features/templates/Page';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  Anchor,
  Breadcrumb,
  Col,
  Grid,
  LG,
  Paragraph,
  Row,
  Span,
  Tag,
  theme as globalTheme,
  XXL,
} from '@appquality/unguess-design-system';
import { ReactComponent as TailoredIcon } from 'src/assets/icons/tailored-icon.svg';
import { ReactComponent as ExpressIcon } from 'src/assets/icons/express-icon.svg';
import { ReactComponent as ExperientialIcon } from 'src/assets/icons/experiential-icon.svg';
import { ReactComponent as FunctionalIcon } from 'src/assets/icons/functional-icon.svg';
import { ReactComponent as EnvironmentIcon } from 'src/assets/icons/environment-icon.svg';
import { ReactComponent as TimeIcon } from 'src/assets/icons/time-icon.svg';
import { PageHeaderContainer } from 'src/common/components/pageHeaderContainer';
import { ExpressWizardContainer } from 'src/pages/ExpressWizard';
import { ExpressDrawer } from 'src/pages/ExpressWizard/drawer';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { FEATURE_FLAG_CATALOG } from 'src/constants';
import { Feature } from 'src/features/api';
import { openDrawer, openWizard } from 'src/features/express/expressSlice';
import { useGetFullServicesByIdQuery } from 'src/features/backoffice/strapi';
import { toggleChat } from 'src/common/utils';
import { WaterButton } from '../ExpressWizard/waterButton';

const CampaignType = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-top: ${({ theme }) => theme.space.base * 4}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
`;

const ServiceTitle = styled(XXL)`
  color: ${({ theme }) => theme.colors.primaryHue};
  margin-top: ${({ theme }) => theme.space.base * 4}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ServiceDescription = styled(LG)`
  color: ${({ theme }) => theme.palette.grey[700]};
  margin-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.space.base * 4}px;
`;

const StyledTag = styled(Tag)`
  margin-right: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const CTAButton = styled(WaterButton)`
  margin: ${({ theme }) => theme.space.md} 0;
`;

const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-width: 60%;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      max-width: 100%;
      width: 100%;
      margin: ${({ theme }) => theme.space.md} auto;
    }
  }
`;

const ColBanner = styled(Col)`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    order: 0;
  }
`;

const ColMeta = styled(Col)`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    order: 1;
  }
`;

const StyledBreadcrumb = styled(Breadcrumb)`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: ${({ theme }) => theme.space.lg};
  }
`;

const Service = () => {
  const { t } = useTranslation();
  const { templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute('oops');
  const homeRoute = useLocalizeRoute('');
  const servicesRoute = useLocalizeRoute('templates');
  const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || '';

  const { userData, status } = useAppSelector((state) => state.user);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);

  if (
    status === 'logged' &&
    (!userData.features ||
      !userData.features.find(
        (feature: Feature) => feature.slug === FEATURE_FLAG_CATALOG
      ))
  ) {
    navigate(notFoundRoute, { replace: true });
  }

  if (!templateId || Number.isNaN(Number(templateId))) {
    navigate(notFoundRoute, { replace: true });
  }
  const { data, error, isLoading } = useGetFullServicesByIdQuery({
    id: templateId || '',
    populate: {
      output_image: '*',
      requirements: '*',
      why: { populate: '*' },
      what: { populate: '*' },
      how: { populate: '*' },
    },
  });

  const serviceName = data ? data.data?.attributes?.title : '';
  const campaignType = data ? data.data?.attributes?.campaign_type : '';
  const serviceDescription = data ? data.data?.attributes?.description : '';
  const isExpress = data ? data.data?.attributes?.is_express : false;
  const isFunctional = data ? data.data?.attributes?.is_functional : false;
  const days = data ? data.data?.attributes?.duration_in_days : 3;
  const hours = (days || 3) * 24;
  const environment = data ? data.data?.attributes?.environment : '';
  const bannerImg = data
    ? data.data?.attributes?.output_image?.data?.attributes?.url
    : '';
  const bannerImgUrl = `${STRAPI_URL}${bannerImg}`;

  return (
    <Page
      pageHeader={
        <PageHeaderContainer>
          <Grid>
            <Row>
              <Col>
                <StyledBreadcrumb>
                  <Anchor
                    onClick={() => navigate(homeRoute, { replace: true })}
                  >
                    {t('__BREADCRUMB_ITEM_DASHBOARD')}
                  </Anchor>
                  <Anchor
                    onClick={() => navigate(servicesRoute, { replace: true })}
                  >
                    {t('__BREADCRUMB_ITEM_SERVICES')}
                  </Anchor>
                  <Span>{campaignType}</Span>
                </StyledBreadcrumb>
              </Col>
            </Row>
          </Grid>
          <Grid>
            <Row>
              <ColMeta xs={12} lg={6}>
                <CampaignType>{campaignType}</CampaignType>
                <ServiceTitle>{serviceName}</ServiceTitle>
                <ServiceDescription>{serviceDescription}</ServiceDescription>
                <TagsContainer>
                  {isExpress ? (
                    <StyledTag
                      size="large"
                      isPill
                      isRegular
                      hue={globalTheme.palette.grey[100]}
                    >
                      <StyledTag.Avatar>
                        <ExpressIcon />
                      </StyledTag.Avatar>
                      <Span>{t('__EXPRESS_LABEL')}</Span>
                    </StyledTag>
                  ) : (
                    <StyledTag
                      size="large"
                      isPill
                      isRegular
                      hue={globalTheme.palette.grey[100]}
                    >
                      <StyledTag.Avatar>
                        <TailoredIcon />
                      </StyledTag.Avatar>
                      <Span>{t('__TAILORED_LABEL')}</Span>
                    </StyledTag>
                  )}
                  {isFunctional ? (
                    <StyledTag
                      size="large"
                      isPill
                      isRegular
                      hue={globalTheme.palette.grey[100]}
                    >
                      <StyledTag.Avatar>
                        <FunctionalIcon />
                      </StyledTag.Avatar>
                      <Span>{t('__FUNCTIONAL_LABEL')}</Span>
                    </StyledTag>
                  ) : (
                    <StyledTag
                      size="large"
                      isPill
                      isRegular
                      hue={globalTheme.palette.grey[100]}
                    >
                      <StyledTag.Avatar>
                        <ExperientialIcon />
                      </StyledTag.Avatar>
                      <Paragraph>{t('__EXPERIENTIAL_LABEL')}</Paragraph>
                    </StyledTag>
                  )}
                  <StyledTag
                    size="large"
                    isPill
                    isRegular
                    hue={globalTheme.palette.grey[100]}
                  >
                    <StyledTag.Avatar>
                      <TimeIcon />
                    </StyledTag.Avatar>
                    <Paragraph>
                      <Trans i18nKey="__SERVICE_DETAIL_PAGE_TAG_RESULTS_DAYS_LABEL">
                        First results in <Span isBold>{{ hours }}</Span>h
                      </Trans>
                    </Paragraph>
                  </StyledTag>
                  <StyledTag
                    size="large"
                    isPill
                    isRegular
                    hue={globalTheme.palette.grey[100]}
                  >
                    <StyledTag.Avatar>
                      <EnvironmentIcon />
                    </StyledTag.Avatar>
                    <Paragraph>{environment}</Paragraph>
                  </StyledTag>
                </TagsContainer>
                {isExpress ? (
                  <CTAButton
                    size="medium"
                    isPrimary
                    isPill
                    onClick={() => {
                      dispatch(openDrawer());
                      toggleChat(false);
                    }}
                  >
                    {t('__CATALOG_PAGE_BUTTON_EXPRESS_LABEL')}
                  </CTAButton>
                ) : (
                  <CTAButton
                    size="medium"
                    isPrimary
                    isPill
                    onClick={() => {
                      window.location.href = `mailto:${
                        activeWorkspace?.csm.email || 'info@unguess.io'
                      }`;
                    }}
                  >
                    {t('__CATALOG_PAGE_BUTTON_CONTACT_LABEL')}
                  </CTAButton>
                )}
              </ColMeta>
              <ColBanner xs={12} lg={6}>
                <BannerContainer>
                  <img src={bannerImgUrl} alt={serviceName} />
                </BannerContainer>
              </ColBanner>
            </Row>
          </Grid>
        </PageHeaderContainer>
      }
      title={serviceName}
      route="templates"
    >
      {error && (
        <pre>{`>>> error: ${  JSON.stringify(error)}`}</pre>
      )} 
      {isLoading && (
        <div>Loading...</div>
      )}
      
      {data &&
      (
        <>
          <pre>{`>>> data: ${  JSON.stringify(data, null, 2)}`}</pre>
          <ExpressDrawer
            onCtaClick={() => {
              dispatch(openWizard());
            }}
          />
          <ExpressWizardContainer />
        </>
      )}
    </Page>
  );
};

export default Service;
