import {
  Anchor,
  PageHeader,
  Paragraph,
  Span,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EnvironmentIcon } from 'src/assets/icons/environment-icon.svg';
import { ReactComponent as ExperientialIcon } from 'src/assets/icons/experiential-icon.svg';
import { ReactComponent as ExpressIcon } from 'src/assets/icons/express-icon.svg';
import { ReactComponent as FunctionalIcon } from 'src/assets/icons/functional-icon.svg';
import { ReactComponent as TailoredIcon } from 'src/assets/icons/tailored-icon.svg';
import { ReactComponent as TimeIcon } from 'src/assets/icons/time-icon.svg';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { Meta } from 'src/common/components/Meta';
import { PageMeta } from 'src/common/components/PageMeta';
import { PageTitle } from 'src/common/components/PageTitle';
import { extractStrapiData } from 'src/common/getStrapiData';
import { getLocalizedStrapiData } from 'src/common/utils';
import { ServiceResponse } from 'src/features/backoffice';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import i18n from 'src/i18n';
import { ServiceContactUsCta } from './ServiceContactUsCta';
import { ServiceExpressCta } from './ServiceExpressCta';

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
  const { activeWorkspace } = useActiveWorkspace();

  // Strapi response
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
                <Meta size="large" icon={<ExpressIcon />}>
                  <Span>{t('__EXPRESS_LABEL')}</Span>
                </Meta>
              ) : (
                <Meta size="large" icon={<TailoredIcon />}>
                  <Span>{t('__TAILORED_LABEL')}</Span>
                </Meta>
              )}
              {service.is_functional ? (
                <Meta size="large" icon={<FunctionalIcon />}>
                  <Span>{t('__FUNCTIONAL_LABEL')}</Span>
                </Meta>
              ) : (
                <Meta size="large" icon={<ExperientialIcon />}>
                  <Paragraph>{t('__EXPERIENTIAL_LABEL')}</Paragraph>
                </Meta>
              )}
              {!!service.duration_in_days && (
                <Meta size="large" icon={<TimeIcon />}>
                  <Paragraph>
                    <Trans
                      i18nKey="__SERVICE_DETAIL_PAGE_TAG_RESULTS_DAYS_LABEL"
                      components={{
                        span: <Span isBold />,
                      }}
                      values={{
                        hours: service.duration_in_days * 24,
                      }}
                      default="First results in <span>{{ hours }}</span>h"
                    />
                  </Paragraph>
                </Meta>
              )}
              {service.environment && (
                <Meta size="large" icon={<EnvironmentIcon />}>
                  <Paragraph>{service.environment}</Paragraph>
                </Meta>
              )}
            </PageMeta>
          </PageHeader.Meta>
        </PageHeader.Main>
        <PageHeader.Footer>
          {!activeWorkspace?.isShared && (
            <div>
              {expressType && expressType.id ? (
                <ServiceExpressCta expressTypeId={expressType.id} />
              ) : (
                <ServiceContactUsCta onCtaClick={onContactClick} />
              )}
            </div>
          )}
        </PageHeader.Footer>
      </PageHeader>
    </LayoutWrapper>
  );
};
