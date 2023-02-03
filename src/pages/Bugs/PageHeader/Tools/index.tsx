import { Skeleton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { SeverityPill } from 'src/common/components/pills/SeverityPill';
import { StatusPill } from 'src/common/components/pills/StatusPill';
import { Pipe } from 'src/common/components/Pipe';
import { UniqueBugsCounter } from './UniqueBugsCounter';
import { DotsMenu } from './DotsMenu';
import { useCampaign } from './useCampaign';

const SeveritiesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    > div {
      margin-right: ${({ theme }) => theme.space.xxs};
      margin-bottom: ${({ theme }) => theme.space.xxs};
    }
  }
`;

const StyledCounter = styled(UniqueBugsCounter)``;

const StyledStatus = styled(StatusPill)``;

const StyledMenu = styled(DotsMenu)``;

const ToolsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin-top: ${({ theme }) => theme.space.md};
  order: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.xxl}) {
    flex-wrap: nowrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    align-items: flex-start;

    ${Pipe} {
      display: none;
    }

    ${StyledCounter} {
      margin-bottom: ${({ theme }) => theme.space.sm};
    }

    ${SeveritiesWrapper} {
      margin-bottom: ${({ theme }) => theme.space.xxs};
    }

    ${StyledStatus} {
      margin-bottom: ${({ theme }) => theme.space.xs};
    }
  }
`;

export const Tools = ({
  campaignId,
  customerTitle,
}: {
  campaignId: number;
  customerTitle: string;
}) => {
  const { isLoading, status, severities } = useCampaign(campaignId);

  if (isLoading || !status || !severities)
    return <Skeleton width="200px" height="20px" />;

  return (
    <>
      <ToolsWrapper>
        <StyledCounter campaignId={campaignId} />
        <SeveritiesWrapper>
          {Object.keys(severities).map((severity) => (
            <SeverityPill
              key={severity}
              counter={severities[severity as Severities]}
              severity={severity as Severities}
            />
          ))}
        </SeveritiesWrapper>
        <Pipe />
        <StyledStatus status={status.name} />
      </ToolsWrapper>
      <StyledMenu campaignId={campaignId} customerTitle={customerTitle} />
    </>
  );
};
