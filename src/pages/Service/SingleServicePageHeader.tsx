import { ServiceResponse } from 'src/features/backoffice';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  Anchor,
  Paragraph,
  Span,
  PageHeader,
  Tag,
} from '@appquality/unguess-design-system';
import { useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as TailoredIcon } from 'src/assets/icons/tailored-icon.svg';
import { ReactComponent as ExpressIcon } from 'src/assets/icons/express-icon.svg';
import { ReactComponent as ExperientialIcon } from 'src/assets/icons/experiential-icon.svg';
import { ReactComponent as FunctionalIcon } from 'src/assets/icons/functional-icon.svg';
import { ReactComponent as EnvironmentIcon } from 'src/assets/icons/environment-icon.svg';
import { ReactComponent as TimeIcon } from 'src/assets/icons/time-icon.svg';
import { extractStrapiData } from 'src/common/getStrapiData';
import { PageTitle } from 'src/common/components/PageTitle';
import { getLocalizedStrapiData } from 'src/common/utils';
import i18n from 'src/i18n';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageMeta } from 'src/common/components/PageMeta';
import { ServiceExpressCta } from './ServiceExpressCta';
import { ServiceContactUsCta } from './ServiceContactUsCta';

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
        <PageHeader.Breadcrumbs>
          <Anchor onClick={() => navigate(servicesRoute)}>
            {t('__BREADCRUMB_ITEM_SERVICES')}
          </Anchor>
        </PageHeader.Breadcrumbs>
        <PageHeader.Main
          mainTitle={service.title}
          {...(bannerImg && { mainImageUrl: bannerImgUrl })}
        >
          <PageHeader.Overline>
            {service.campaign_type.toUpperCase()}
          </PageHeader.Overline>
          <PageHeader.Title>
            <PageTitle>{service.title}</PageTitle>
          </PageHeader.Title>
          <PageHeader.Description>{service.description}</PageHeader.Description>
          <PageHeader.Meta>
            <PageMeta>
              {expressType && expressType.id ? (
                <Tag size="large">
                  <Tag.Avatar>
                    <ExpressIcon />
                  </Tag.Avatar>
                  <Span>{t('__EXPRESS_LABEL')}</Span>
                </Tag>
              ) : (
                <Tag size="large">
                  <Tag.Avatar>
                    <TailoredIcon />
                  </Tag.Avatar>
                  <Span>{t('__TAILORED_LABEL')}</Span>
                </Tag>
              )}
              {service.is_functional ? (
                <Tag size="large">
                  <Tag.Avatar>
                    <FunctionalIcon />
                  </Tag.Avatar>
                  <Span>{t('__FUNCTIONAL_LABEL')}</Span>
                </Tag>
              ) : (
                <Tag size="large">
                  <Tag.Avatar>
                    <ExperientialIcon />
                  </Tag.Avatar>
                  <Paragraph>{t('__EXPERIENTIAL_LABEL')}</Paragraph>
                </Tag>
              )}
              <Tag size="large">
                <Tag.Avatar>
                  <TimeIcon />
                </Tag.Avatar>
                <Paragraph>
                  <Trans i18nKey="__SERVICE_DETAIL_PAGE_TAG_RESULTS_DAYS_LABEL">
                    First results in <Span isBold>{{ hours }}</Span>h
                  </Trans>
                </Paragraph>
              </Tag>
              {service.environment && (
                <Tag size="large">
                  <Tag.Avatar>
                    <EnvironmentIcon />
                  </Tag.Avatar>
                  <Paragraph>{service.environment}</Paragraph>
                </Tag>
              )}
            </PageMeta>
          </PageHeader.Meta>
        </PageHeader.Main>
        <PageHeader.Footer>
          {expressType && expressType.id ? (
            <ServiceExpressCta expressTypeId={expressType.id} />
          ) : (
            <ServiceContactUsCta onCtaClick={onContactClick} />
          )}
        </PageHeader.Footer>
      </PageHeader>
    </LayoutWrapper>
  );
};
