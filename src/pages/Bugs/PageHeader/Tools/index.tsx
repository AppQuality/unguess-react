import { Skeleton } from '@appquality/unguess-design-system';
import { theme as globalTheme } from 'src/app/theme';
import styled from 'styled-components';
import {
  CampaignWithOutput,
  useGetCampaignsByCidMetaQuery,
} from 'src/features/api';
import { SeverityPill } from 'src/common/components/pills/SeverityPill';
import { StatusPill } from 'src/pages/Campaign/pageHeader/Pills/StatusPill';
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

export const Tools = ({ campaign }: { campaign: CampaignWithOutput }) => {
  const { isLoading, isFetching } = useGetCampaignsByCidMetaQuery({
    cid: campaign.id,
  });

  const { status } = campaign;

  if (isLoading || isFetching) return <Skeleton width="200px" height="20px" />;

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
