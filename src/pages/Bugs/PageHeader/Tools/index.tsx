import { Skeleton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { SeverityPill } from 'src/common/components/pills/SeverityPill';
import { StatusPill } from 'src/common/components/pills/StatusPill';
import { Pipe } from 'src/common/components/Pipe';
import { UniqueBugsCounter } from './UniqueBugsCounter';
import { DotsMenu } from './DotsMenu';
import { useCampaign } from './useCampaign';

const ToolsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Tools = ({ campaignId }: { campaignId: number }) => {
  const { isLoading, status, severities } = useCampaign(campaignId);

  if (isLoading || !status || !severities)
    return <Skeleton width="200px" height="20px" />;

  return (
    <ToolsWrapper>
      <UniqueBugsCounter campaignId={campaignId} />
      <div>
        {Object.keys(severities).map((severity) =>
          severities[severity as Severities] > 0 ? (
            <SeverityPill
              key={severity}
              counter={severities[severity as Severities]}
              severity={severity as Severities}
            />
          ) : null
        )}
      </div>
      <Pipe />
      <StatusPill status={status.name} />
      <DotsMenu />
    </ToolsWrapper>
  );
};
