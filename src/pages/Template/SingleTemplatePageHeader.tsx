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
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { TemplateExpressCta } from './TemplateExpressCta';
import { strapiQueryArgs } from './strapiQueryArgs';

export const SingleTemplatePageHeader = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const workspaceRoute = useLocalizeRoute('');
  const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || '';
  const { activeWorkspace } = useActiveWorkspace();
  const { data } = useGetFullTemplatesByIdQuery({
    id: templateId || '',
    populate: strapiQueryArgs,
  });
  const template = data?.data?.attributes;

  const tags = template?.output?.map((o) => {
    const oUrl = o.Icon?.data?.attributes?.url;
    return {
      label: o.Text ?? '',
      icon: oUrl ? `${STRAPI_URL}${oUrl}` : '',
      id: o.id ?? '',
    };
  });

  // Strapi response
  const outputImage = extractStrapiData(template?.output_image);
  const bannerImg = outputImage.url;
  const bannerImgUrl = `${STRAPI_URL}${bannerImg}`;
  const priceIconData = template?.Price?.tag_price?.icon?.data?.attributes;

  console.log('template', template?.express?.data?.id);

  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Breadcrumbs>
          <Anchor onClick={() => navigate(workspaceRoute)}>
            {activeWorkspace?.company || 'Default'}’s Workspace
          </Anchor>
        </PageHeader.Breadcrumbs>
        <PageHeader.Main
          mainTitle={template?.title}
          {...(bannerImg && { mainImageUrl: bannerImgUrl })}
        >
          <PageHeader.Overline>
            {template?.campaign_type?.toUpperCase()}
          </PageHeader.Overline>
          <PageHeader.Title>
            <PageTitle>{template?.title}</PageTitle>
          </PageHeader.Title>
          <PageHeader.Description>
            {template?.description}
          </PageHeader.Description>
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
              {template?.Price?.tag_price && (
                <Meta
                  size="large"
                  icon={
                    <img
                      src={`${STRAPI_URL}${priceIconData?.url}`}
                      alt={template?.Price?.tag_price?.label}
                    />
                  }
                >
                  <Paragraph>{template?.Price?.tag_price?.label}</Paragraph>
                </Meta>
              )}
            </PageMeta>
          </PageHeader.Meta>
        </PageHeader.Main>
        <PageHeader.Footer>
          <div>
            {template?.express?.data?.id ? (
              <TemplateExpressCta
                expressTypeId={Number(template?.express?.data?.id)}
              />
            ) : null}
          </div>
        </PageHeader.Footer>
      </PageHeader>
    </LayoutWrapper>
  );
};
