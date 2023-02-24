import { Anchor, PageHeader } from '@appquality/unguess-design-system';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { Tags } from './Tags';
import { HeaderSkeleton } from './HeaderSkeleton';
import { EditableTitle } from './EditableTitle';
import { useCampaign } from './useCampaign';

const StyledTagsWrapper = styled(PageHeader.Counters)`
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
        <PageHeader.Breadcrumb>
          <Anchor
            id="breadcrumb-parent"
            onClick={() => navigate(project.route)}
          >
            {project.name}
          </Anchor>
        </PageHeader.Breadcrumb>
        <PageHeader.Main infoTitle={campaign.customer_title}>
          <PageHeader.Title>
            <EditableTitle campaignId={campaignId} />
          </PageHeader.Title>
          <StyledTagsWrapper>
            <Tags campaign={campaign} />
          </StyledTagsWrapper>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};
export default CampaignPageHeader;
