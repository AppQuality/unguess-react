import {
  Anchor,
  PageHeader,
  Paragraph,
  TemplateCard,
} from '@appquality/unguess-design-system';
import { useNavigate } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { Meta } from 'src/common/components/Meta';
import { PageMeta } from 'src/common/components/PageMeta';
import { PageTitle } from 'src/common/components/PageTitle';
import { GetWorkspacesByWidTemplatesAndTidApiResponse } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { LaunchActivityCTA } from './LaunchActivityCTA';

export const getTemplateTitle = (
  data: GetWorkspacesByWidTemplatesAndTidApiResponse
) => data.strapi?.title || data.name;

export const SingleTemplatePageHeader = ({
  template,
  handleLaunchActivity,
}: {
  template: GetWorkspacesByWidTemplatesAndTidApiResponse;
  handleLaunchActivity: () => void;
}) => {
  const navigate = useNavigate();
  const workspaceRoute = useLocalizeRoute('');
  const { activeWorkspace } = useActiveWorkspace();

  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Breadcrumbs>
          <Anchor onClick={() => navigate(workspaceRoute)}>
            {activeWorkspace?.company || 'Default'}’s Workspace
          </Anchor>
        </PageHeader.Breadcrumbs>
        <PageHeader.Main mainTitle={getTemplateTitle(template)}>
          <PageHeader.Overline>
            {template.strapi?.pre_title.toUpperCase()}
          </PageHeader.Overline>
          <PageHeader.Title>
            <PageTitle>{getTemplateTitle(template)}</PageTitle>
          </PageHeader.Title>
          <PageHeader.Description style={{ whiteSpace: 'pre-wrap' }}>
            {template.strapi?.description || template.description}
          </PageHeader.Description>
          <PageHeader.Meta>
            <PageMeta>
              {template.strapi?.tags &&
                template.strapi?.tags.map((tag) => (
                  <Meta
                    size="large"
                    icon={<img src={tag.icon} alt={tag.text} />}
                  >
                    <Paragraph>{tag.text}</Paragraph>
                  </Meta>
                ))}
              {template.price &&
                TemplateCard.PriceTag({ text: template.price })}
            </PageMeta>
          </PageHeader.Meta>
        </PageHeader.Main>
        <PageHeader.Footer>
          <LaunchActivityCTA handleLaunchActivity={handleLaunchActivity} />
        </PageHeader.Footer>
      </PageHeader>
    </LayoutWrapper>
  );
};
