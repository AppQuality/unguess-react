import { Skeleton } from '@appquality/unguess-design-system';
import { theme as globalTheme } from 'src/app/theme';
import styled from 'styled-components';
import {
  CampaignWithOutput,
  useGetCampaignsByCidMetaQuery,
} from 'src/features/api';
import { Pill } from 'src/common/components/Pill';
import { StatusPill } from 'src/pages/Campaign/pageHeader/Pills/StatusPill';
import { UniqueBugsCounter } from './UniqueBugsCounter';
import { DotsMenu } from './DotsMenu';

const Pipe = styled.span`
  /** Vertical Separator */
  border-left: 1px solid ${({ theme }) => theme.palette.grey[300]};
  height: ${({ theme }) => theme.space.lg};
  margin: 0 ${({ theme }) => theme.space.sm};
  display: inline;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    height: 0;
    margin: 0;
  }
`;

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

      <Pill
        id="pill-severity-critical"
        title="CRITICAL 69"
        color={globalTheme.colors.bySeverity.critical}
      />

      <Pill
        id="pill-severity-high"
        title="HIGH 11"
        color={globalTheme.colors.bySeverity.high}
      />

      <Pill
        id="pill-severity-medium"
        title="MEDIUM 7"
        color={globalTheme.colors.bySeverity.medium}
      />
      <Pill
        id="pill-severity-low"
        title="LOW 0"
        color={globalTheme.colors.bySeverity.low}
      />
      <Pipe style={{ marginRight: globalTheme.space.md }} />
      <StatusPill status={status.name} />
      <DotsMenu />
    </ToolsWrapper>
  );
};
