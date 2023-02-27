import { Anchor, PageHeader } from '@appquality/unguess-design-system';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { Pills } from './Pills';
import { HeaderSkeleton } from './HeaderSkeleton';
import { EditableTitle } from './EditableTitle';
import { useCampaign } from './useCampaign';

const StyledPillsWrapper = styled(PageHeader.Counters)`
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
          <StyledPillsWrapper>
            <Pills campaign={campaign} />
          </StyledPillsWrapper>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};
export default CampaignPageHeader;
