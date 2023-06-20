import { Anchor, PageHeader } from '@appquality/unguess-design-system';
import { useNavigate } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { Metas } from './Meta';
import { HeaderSkeleton } from './HeaderSkeleton';
import { EditableTitle } from './EditableTitle';
import { useCampaign } from './useCampaign';

const CampaignPageHeader = ({ campaignId }: { campaignId: number }) => {
  const navigate = useNavigate();
  const { isUserLoading, isLoading, isError, campaign, project } =
    useCampaign(campaignId);

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return isUserLoading || isError ? null : (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Breadcrumbs>
          {project.hasAccess ? (
            <Anchor
              id="breadcrumb-parent"
              onClick={() => navigate(project.route)}
            >
              {project.name}
            </Anchor>
          ) : (
            project.name
          )}
        </PageHeader.Breadcrumbs>
        <PageHeader.Main mainTitle={campaign.customer_title}>
          <PageHeader.Title>
            <EditableTitle campaignId={campaignId} />
          </PageHeader.Title>
          <PageHeader.Meta>
            <Metas campaign={campaign} />
          </PageHeader.Meta>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};
export default CampaignPageHeader;
