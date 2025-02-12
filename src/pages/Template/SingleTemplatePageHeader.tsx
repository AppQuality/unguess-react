import {
  Anchor,
  PageHeader,
  Paragraph,
} from '@appquality/unguess-design-system';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetFullTemplatesByIdQuery } from 'src/features/backoffice/strapi';
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
import { TemplateContactUsCta } from './TemplateContactUsCta';
import { TemplateExpressCta } from './TemplateExpressCta';

export const SingleTemplatePageHeader = ({
  response,
  onContactClick,
}: {
  response: ServiceResponse;
  onContactClick: () => void;
}) => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const servicesRoute = useLocalizeRoute('services');
  const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || '';
  const service = getLocalizedStrapiData({
    item: response,
    language: i18n.language,
  });
  const { activeWorkspace } = useActiveWorkspace();
  const { data } = useGetFullTemplatesByIdQuery({
    id: templateId || '',
    populate: {
      icon: '*',
      Price: {
        populate: {
          tag_price: {
            populate: '*',
          },
        },
      },
      output: {
        populate: '*',
      },
      requirements: {
        populate: '*',
      },
      why: {
        populate: '*',
      },
      how: {
        populate: '*',
      },
      what: {
        populate: '*',
      },
    },
  });

  const tags = data?.data?.attributes?.output?.map((o) => {
    const oUrl = o.Icon?.data?.attributes?.url;
    return {
      label: o.Text ?? '',
      icon: oUrl ? `${STRAPI_URL}${oUrl}` : '',
      id: o.id ?? '',
    };
  });

  // Strapi response
  const outputImage = extractStrapiData(service.output_image);
  const bannerImg = outputImage.url;
  const bannerImgUrl = `${STRAPI_URL}${bannerImg}`;
  const express = extractStrapiData(service.express);
  const expressType = extractStrapiData(express.express_type);
  const priceIconData =
    data?.data?.attributes?.Price?.tag_price?.icon?.data?.attributes;

  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Breadcrumbs>
          <Anchor onClick={() => navigate(servicesRoute)}>
            {activeWorkspace?.company || 'Default'}’s Workspace
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
              {tags &&
                tags.map((tag) => (
                  <Meta
                    size="large"
                    icon={<img src={tag.icon} alt={tag.label} />}
                  >
                    <Paragraph>{tag.label}</Paragraph>
                  </Meta>
                ))}
              {data?.data?.attributes?.Price?.tag_price && (
                <Meta
                  size="large"
                  icon={
                    <img
                      src={`${STRAPI_URL}${priceIconData?.url}`}
                      alt={data?.data?.attributes?.Price?.tag_price?.label}
                    />
                  }
                >
                  <Paragraph>
                    {data?.data?.attributes?.Price?.tag_price?.label}
                  </Paragraph>
                </Meta>
              )}
            </PageMeta>
          </PageHeader.Meta>
        </PageHeader.Main>
        <PageHeader.Footer>
          {!activeWorkspace?.isShared && (
            <div>
              {expressType && expressType.id ? (
                <TemplateExpressCta expressTypeId={expressType.id} />
              ) : (
                <TemplateContactUsCta onCtaClick={onContactClick} />
              )}
            </div>
          )}
        </PageHeader.Footer>
      </PageHeader>
    </LayoutWrapper>
  );
};
