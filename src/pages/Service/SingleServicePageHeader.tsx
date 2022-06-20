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
import { extractStrapiData } from 'src/common/getStrapiData';
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
  const { data: serviceData } = response;
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const servicesRoute = useLocalizeRoute('services');
  const homeRoute = useLocalizeRoute('');
  const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || '';
  const service = extractStrapiData({ data: serviceData });

  // Strapi response
  const days = service.duration_in_days ?? 3;
  const hours = (days || 3) * 24;

  const outputImage = extractStrapiData(service.output_image);
  const bannerImg = outputImage.url;
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
              <Span>{service.campaign_type}</Span>
            </StyledBreadcrumb>
          </Col>
        </Row>
        <Row>
          <ColMeta xs={12} lg={bannerImg ? 6 : 12}>
            <CampaignType>{service.campaign_type}</CampaignType>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <TagsContainer>
              {service.is_express ? (
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
              {service.is_functional ? (
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
              {service.environment && (
                <StyledTag
                  size="large"
                  isPill
                  isRegular
                  hue={globalTheme.palette.grey[100]}
                >
                  <StyledTag.Avatar>
                    <EnvironmentIcon />
                  </StyledTag.Avatar>
                  <Paragraph>{service.environment}</Paragraph>
                </StyledTag>
              )}
            </TagsContainer>
            {service.is_express ? <ServiceExpressCta /> : <ServiceMailToCta />}
          </ColMeta>
          {bannerImg && (
            <ColBanner xs={12} lg={6}>
              <BannerContainer>
                <img src={bannerImgUrl} alt={service.title} />
              </BannerContainer>
            </ColBanner>
          )}
        </Row>
      </Grid>
    </PageHeaderContainer>
  );
};
