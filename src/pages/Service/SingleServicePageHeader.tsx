import { useAppSelector } from 'src/app/hooks';
import { ServiceResponse } from 'src/features/backoffice';
import { PageHeaderContainer } from 'src/common/components/pageHeaderContainer';
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
  XXXL,
} from '@appquality/unguess-design-system';
import { useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as TailoredIcon } from 'src/assets/icons/tailored-icon.svg';
import { ReactComponent as ExpressIcon } from 'src/assets/icons/express-icon.svg';
import { ReactComponent as ExperientialIcon } from 'src/assets/icons/experiential-icon.svg';
import { ReactComponent as FunctionalIcon } from 'src/assets/icons/functional-icon.svg';
import { ReactComponent as EnvironmentIcon } from 'src/assets/icons/environment-icon.svg';
import { ReactComponent as TimeIcon } from 'src/assets/icons/time-icon.svg';
import { ServiceExpressCta } from './ServiceExpressCta';
import { ServiceMailToCta } from './ServiceMailToCta';

const CampaignType = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-top: ${({ theme }) => theme.space.base * 4}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
`;

const ServiceTitle = styled(XXXL)`
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

const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-width: 60%;

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      max-width: 70%;
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

export const SingleServicePageHeader = (response: ServiceResponse) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data } = response;
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const servicesRoute = useLocalizeRoute('templates');
  const homeRoute = useLocalizeRoute('');
  const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || '';

  // Strapi response
  const serviceName = data ? data?.attributes?.title : '';
  const campaignType = data ? data?.attributes?.campaign_type : '';
  const serviceDescription = data ? data?.attributes?.description : '';
  const isExpress = data ? data?.attributes?.is_express : false;
  const isFunctional = data ? data?.attributes?.is_functional : false;
  const days = data ? data?.attributes?.duration_in_days : 3;
  const hours = (days || 3) * 24;
  const environment = data ? data?.attributes?.environment : '';

  const bannerImg = data
    ? data?.attributes?.output_image?.data?.attributes?.url
    : '';
  const bannerImgUrl = `${STRAPI_URL}${bannerImg}`;

  return (
    <PageHeaderContainer>
      <Grid>
        <Row>
          <Col>
            <StyledBreadcrumb>
              <Anchor onClick={() => navigate(homeRoute)}>
                {activeWorkspace?.company || t('__BREADCRUMB_ITEM_DASHBOARD')}
              </Anchor>
              <Anchor onClick={() => navigate(servicesRoute)}>
                {t('__BREADCRUMB_ITEM_SERVICES')}
              </Anchor>
              <Span>{campaignType}</Span>
            </StyledBreadcrumb>
          </Col>
        </Row>
        <Row>
          <ColMeta xs={12} lg={bannerImg ? 6 : 12}>
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
              {environment && (
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
              )}
            </TagsContainer>
            {isExpress ? <ServiceExpressCta /> : <ServiceMailToCta />}
          </ColMeta>
          {bannerImg && (
            <ColBanner xs={12} lg={6}>
              <BannerContainer>
                <img src={bannerImgUrl} alt={serviceName} />
              </BannerContainer>
            </ColBanner>
          )}
        </Row>
      </Grid>
    </PageHeaderContainer>
  );
};
