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
import { useCampaignTemplateById } from 'src/hooks/useCampaignTemplateById';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { TemplateExpressCta } from './TemplateExpressCta';

export const SingleTemplatePageHeader = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const workspaceRoute = useLocalizeRoute('');
  const { activeWorkspace } = useActiveWorkspace();
  const { data } = useCampaignTemplateById(templateId || '');

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
          {...(data.outputImage && { mainImageUrl: data.outputImage })}
        >
          <PageHeader.Overline>
            {data.campaignType?.toUpperCase()}
          </PageHeader.Overline>
          <PageHeader.Title>
            <PageTitle>{data.title}</PageTitle>
          </PageHeader.Title>
          <PageHeader.Description style={{ whiteSpace: 'pre-wrap' }}>
            {data.description}
          </PageHeader.Description>
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
                  icon={<img src={data.price.icon} alt={data.price.label} />}
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
