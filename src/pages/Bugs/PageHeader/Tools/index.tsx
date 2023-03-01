import { Button, Skeleton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import { CampaignStatus, StatusTag } from 'src/common/components/tag/StatusTag';
import { Pipe } from 'src/common/components/Pipe';
import { ReactComponent as ArrowDowloadIcon } from 'src/assets/icons/download-stroke.svg';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear.svg';
import { useTranslation } from 'react-i18next';
import { getLocalizeIntegrationCenterRoute } from 'src/hooks/useLocalizeIntegrationCenterUrl';
import WPAPI from 'src/common/wpapi';
import useWindowSize from 'src/hooks/useWindowSize';
import { theme as globalTheme } from 'src/app/theme';
import { UniqueBugsCounter } from './UniqueBugsCounter';
import { useCampaign } from './useCampaign';

const SeveritiesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const ToolsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const StyledCounter = styled(UniqueBugsCounter)``;

const StyledStatus = styled(StatusTag)``;

const StyledSeverityTag = styled(SeverityTag)``;

export const Tools = ({
  campaignId,
  customerTitle,
}: {
  campaignId: number;
  customerTitle: string;
}) => {
  const { width } = useWindowSize();
  const breakpoint = parseInt(globalTheme.breakpoints.lg, 10);
  const hide = width < breakpoint;
  const { t } = useTranslation();
  const integrationCenterUrl = getLocalizeIntegrationCenterRoute(campaignId);
  const { isLoading, status, severities } = useCampaign(campaignId);

  if (isLoading || !status || !severities)
    return <Skeleton width="200px" height="20px" />;

  return (
    <Container>
      <ToolsWrapper>
        {!hide && <StyledCounter campaignId={campaignId} />}
        <SeveritiesWrapper>
          {Object.keys(severities).map((severity) => (
            <StyledSeverityTag
              key={severity}
              counter={severities[severity as Severities]}
              severity={severity as Severities}
              size="large"
            />
          ))}
          {!hide && <Pipe />}
          <StyledStatus status={status.name as CampaignStatus} />
        </SeveritiesWrapper>
      </ToolsWrapper>
      <ButtonsWrapper>
        <Button
          isBasic
          onClick={() =>
            WPAPI.getReport({
              campaignId,
              title: customerTitle,
            })
          }
        >
          <Button.StartIcon>
            <ArrowDowloadIcon />
          </Button.StartIcon>
          {t('__PAGE_HEADER_BUGS_DOTS_MENU_ITEM_REPORT')}
        </Button>
        <Button
          isBasic
          onClick={() => {
            window.location.href = integrationCenterUrl;
          }}
        >
          <Button.StartIcon>
            <GearIcon />
          </Button.StartIcon>
          {t('__PAGE_HEADER_BUGS_DOTS_MENU_ITEM_INT_CENTER')}
        </Button>
      </ButtonsWrapper>
    </Container>
  );
};
