import { useAppSelector } from 'src/app/hooks';
import { ServiceResponse } from 'src/features/backoffice';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  Anchor,
  Paragraph,
  Span,
  Tag,
  theme as globalTheme,
  PageHeader,
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
import { ServiceContactUsCta } from './ServiceContactUsCta';

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.space.base * 4}px;
`;

const StyledTag = styled(Tag)`
  margin-right: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

export const SingleServicePageHeader = ({
  response,
  onContactClick,
}: {
  response: ServiceResponse;
  onContactClick: () => void;
}) => {
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
    <PageHeader>
      <PageHeader.Breadcrumb>
        <Anchor onClick={() => navigate(homeRoute)}>
          {activeWorkspace?.company || t('__BREADCRUMB_ITEM_DASHBOARD')}
        </Anchor>
        <Anchor onClick={() => navigate(servicesRoute)}>
          {t('__BREADCRUMB_ITEM_SERVICES')}
        </Anchor>
        <Span>{service.campaign_type}</Span>
      </PageHeader.Breadcrumb>
      <PageHeader.Main
        infoOverline={service.campaign_type.toUpperCase()}
        infoTitle={service.title}
        infoDescription={service.description}
        infoCounters={
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
        }
        {...(bannerImg && { metaImage: bannerImgUrl })}
      />
      <PageHeader.Buttons>
        {service.is_express ? (
          <ServiceExpressCta />
        ) : (
          <ServiceContactUsCta onCtaClick={onContactClick} />
        )}
      </PageHeader.Buttons>
    </PageHeader>
  );
};
