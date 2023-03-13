import { Anchor, PageHeader } from '@appquality/unguess-design-system';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { Metas } from './Meta';
import { HeaderSkeleton } from './HeaderSkeleton';
import { EditableTitle } from './EditableTitle';
import { useCampaign } from './useCampaign';

const StyledMetasWrapper = styled(PageHeader.Meta)`
  width: 100%;
`;

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
          <Anchor
            id="breadcrumb-parent"
            onClick={() => navigate(project.route)}
          >
            {project.name}
          </Anchor>
        </PageHeader.Breadcrumbs>
        <PageHeader.Main mainTitle={campaign.customer_title}>
          <PageHeader.Title>
            <EditableTitle campaignId={campaignId} />
          </PageHeader.Title>
          <StyledMetasWrapper>
            <Metas campaign={campaign} />
          </StyledMetasWrapper>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};
export default CampaignPageHeader;
