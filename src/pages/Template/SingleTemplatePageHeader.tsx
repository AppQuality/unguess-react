import {
  Anchor,
  PageHeader,
  Paragraph,
} from '@appquality/unguess-design-system';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { Meta } from 'src/common/components/Meta';
import { PageMeta } from 'src/common/components/PageMeta';
import { PageTitle } from 'src/common/components/PageTitle';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useCampaignTemplateById } from 'src/hooks/useCampaignTemplateById';
import { TemplateExpressCta } from './TemplateExpressCta';

export const SingleTemplatePageHeader = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const workspaceRoute = useLocalizeRoute('');
  const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || '';
  const { activeWorkspace } = useActiveWorkspace();
  const { data } = useCampaignTemplateById(templateId || '');

  // Strapi response
  const bannerImg = data.outputImage.url;
  const bannerImgUrl = `${STRAPI_URL}${bannerImg}`;

  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Breadcrumbs>
          <Anchor onClick={() => navigate(workspaceRoute)}>
            {activeWorkspace?.company || 'Default'}’s Workspace
          </Anchor>
        </PageHeader.Breadcrumbs>
        <PageHeader.Main
          mainTitle={data.title}
          {...(bannerImg && { mainImageUrl: bannerImgUrl })}
        >
          <PageHeader.Overline>
            {data.campaignType?.toUpperCase()}
          </PageHeader.Overline>
          <PageHeader.Title>
            <PageTitle>{data.title}</PageTitle>
          </PageHeader.Title>
          <PageHeader.Description>{data.description}</PageHeader.Description>
          <PageHeader.Meta>
            <PageMeta>
              {data.tags &&
                data.tags.map((tag) => (
                  <Meta
                    size="large"
                    icon={<img src={tag.icon} alt={tag.label} />}
                  >
                    <Paragraph>{tag.label}</Paragraph>
                  </Meta>
                ))}
              {data.price && (
                <Meta
                  size="large"
                  icon={
                    <img
                      src={`${STRAPI_URL}${data.price.icon}`}
                      alt={data.price.label}
                    />
                  }
                >
                  <Paragraph>{data.price.label}</Paragraph>
                </Meta>
              )}
            </PageMeta>
          </PageHeader.Meta>
        </PageHeader.Main>
        <PageHeader.Footer>
          {data.express?.data?.id ? <TemplateExpressCta /> : null}
        </PageHeader.Footer>
      </PageHeader>
    </LayoutWrapper>
  );
};
