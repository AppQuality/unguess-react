import { Anchor, Skeleton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import { CampaignStatus, StatusTag } from 'src/common/components/tag/StatusTag';
import { Pipe } from 'src/common/components/Pipe';
import { ReactComponent as ArrowDowloadIcon } from 'src/assets/icons/dowload-arrow.svg';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear.svg';
import { useTranslation } from 'react-i18next';
import { getLocalizeIntegrationCenterRoute } from 'src/hooks/useLocalizeIntegrationCenterUrl';
import WPAPI from 'src/common/wpapi';
import { UniqueBugsCounter } from './UniqueBugsCounter';
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

const StyledStatus = styled(StatusTag)``;

const ToolsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: auto;
`;

export const Tools = ({
  campaignId,
  customerTitle,
}: {
  campaignId: number;
  customerTitle: string;
}) => {
  const { t } = useTranslation();
  const integrationCenterUrl = getLocalizeIntegrationCenterRoute(campaignId);
  const { isLoading, status, severities } = useCampaign(campaignId);

  if (isLoading || !status || !severities)
    return <Skeleton width="200px" height="20px" />;

  return (
    <>
      <ToolsWrapper>
        <StyledCounter campaignId={campaignId} />
        <SeveritiesWrapper>
          {Object.keys(severities).map((severity) => (
            <SeverityTag
              key={severity}
              counter={severities[severity as Severities]}
              severity={severity as Severities}
              size="large"
            />
          ))}
        </SeveritiesWrapper>
        <Pipe />
        <StyledStatus status={status.name as CampaignStatus} />
      </ToolsWrapper>
      <>
        <Anchor href={integrationCenterUrl}>
          <ArrowDowloadIcon />
          {t('__PAGE_HEADER_BUGS_DOTS_MENU_ITEM_REPORT')}
        </Anchor>
        <Anchor
          onClick={() => WPAPI.getReport({ campaignId, title: customerTitle })}
        >
          <GearIcon />
          {t('__PAGE_HEADER_BUGS_DOTS_MENU_ITEM_INT_CENTER')}
        </Anchor>
      </>
    </>
  );
};
