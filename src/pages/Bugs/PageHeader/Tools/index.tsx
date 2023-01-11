import { Skeleton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useGetCampaignsByCidQuery } from 'src/features/api';
import { SeverityPill } from 'src/common/components/pills/SeverityPill';
import { StatusPill } from 'src/common/components/pills/StatusPill';
import { Pipe } from 'src/common/components/Pipe';
import { UniqueBugsCounter } from './UniqueBugsCounter';
import { DotsMenu } from './DotsMenu';

const ToolsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Tools = ({ campaignId }: { campaignId: number }) => {
  const {
    isLoading,
    isFetching,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId?.toString() ?? '0',
  });

  if (isLoading || isFetching || !campaign)
    return <Skeleton width="200px" height="20px" />;

  const { status } = campaign;

  return (
    <ToolsWrapper>
      <UniqueBugsCounter campaignId={campaign.id} />
      <div>
        <SeverityPill counter={100} severity="critical" />
        <SeverityPill counter={100} severity="high" />
        <SeverityPill counter={100} severity="medium" />
        <SeverityPill counter={100} severity="low" />
      </div>
      <Pipe />
      <StatusPill status={status.name} />
      <DotsMenu />
    </ToolsWrapper>
  );
};
