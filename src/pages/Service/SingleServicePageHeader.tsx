import { ServiceResponse } from 'src/features/backoffice';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  Anchor,
  Paragraph,
  Span,
  PageHeader,
} from '@appquality/unguess-design-system';
import { Tag } from '@appquality/unguess-design-system';
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
import { getLocalizedStrapiData } from 'src/common/utils';
import i18n from 'src/i18n';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
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
  const servicesRoute = useLocalizeRoute('services');
  const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || '';
  const service = getLocalizedStrapiData({
    item: response,
    language: i18n.language,
  });

  // Strapi response
  const days = service.duration_in_days ?? 3;
  const hours = (days || 3) * 24;

  const outputImage = extractStrapiData(service.output_image);
  const bannerImg = outputImage.url;
  const bannerImgUrl = `${STRAPI_URL}${bannerImg}`;
  const express = extractStrapiData(service.express);
  const expressType = extractStrapiData(express.express_type);

  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Breadcrumb>
          <Anchor onClick={() => navigate(servicesRoute)}>
            {t('__BREADCRUMB_ITEM_SERVICES')}
          </Anchor>
        </PageHeader.Breadcrumb>
        <PageHeader.Main
          infoTitle={service.title}
          {...(bannerImg && { metaImage: bannerImgUrl })}
        >
          <PageHeader.Overline>
            {service.campaign_type.toUpperCase()}
          </PageHeader.Overline>
          <PageHeader.Title>{service.title}</PageHeader.Title>
          <PageHeader.Description>{service.description}</PageHeader.Description>
          <PageHeader.Counters>
            <TagsContainer>
              {expressType && expressType.id ? (
                <StyledTag size="large" isRegular>
                  <StyledTag.Avatar>
                    <ExpressIcon />
                  </StyledTag.Avatar>
                  <Span>{t('__EXPRESS_LABEL')}</Span>
                </StyledTag>
              ) : (
                <StyledTag size="large" isRegular>
                  <StyledTag.Avatar>
                    <TailoredIcon />
                  </StyledTag.Avatar>
                  <Span>{t('__TAILORED_LABEL')}</Span>
                </StyledTag>
              )}
              {service.is_functional ? (
                <StyledTag size="large" isRegular>
                  <StyledTag.Avatar>
                    <FunctionalIcon />
                  </StyledTag.Avatar>
                  <Span>{t('__FUNCTIONAL_LABEL')}</Span>
                </StyledTag>
              ) : (
                <StyledTag size="large" isRegular>
                  <StyledTag.Avatar>
                    <ExperientialIcon />
                  </StyledTag.Avatar>
                  <Paragraph>{t('__EXPERIENTIAL_LABEL')}</Paragraph>
                </StyledTag>
              )}
              <StyledTag size="large" isRegular>
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
                <StyledTag size="large" isRegular>
                  <StyledTag.Avatar>
                    <EnvironmentIcon />
                  </StyledTag.Avatar>
                  <Paragraph>{service.environment}</Paragraph>
                </StyledTag>
              )}
            </TagsContainer>
          </PageHeader.Counters>
        </PageHeader.Main>
        <PageHeader.Buttons>
          {expressType && expressType.id ? (
            <ServiceExpressCta expressTypeId={expressType.id} />
          ) : (
            <ServiceContactUsCta onCtaClick={onContactClick} />
          )}
        </PageHeader.Buttons>
      </PageHeader>
    </LayoutWrapper>
  );
};
