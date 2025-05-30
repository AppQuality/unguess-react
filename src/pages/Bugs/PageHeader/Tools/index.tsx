import { Button, Skeleton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { SeverityMeta } from 'src/common/components/meta/SeverityMeta';
import { Pipe } from 'src/common/components/Pipe';
import { ReactComponent as ArrowDowloadIcon } from 'src/assets/icons/download-stroke.svg';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear.svg';
import { useTranslation } from 'react-i18next';
import { getLocalizeIntegrationCenterRoute } from 'src/hooks/useLocalizeIntegrationCenterUrl';
import WPAPI from 'src/common/wpapi';
import { StatusMeta } from 'src/common/components/meta/StatusMeta';
import { CampaignStatus } from 'src/types';
import { PageMeta } from 'src/common/components/PageMeta';
import { CampaignSettings } from 'src/common/components/inviteUsers/campaignSettings';
import { useGetCampaignsByCidQuery } from 'src/features/api';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import { UniqueBugsCounter } from './UniqueBugsCounter';
import { useCampaignBugs } from './useCampaignBugs';

const ButtonsWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    ${ButtonsWrapper} {
      margin-top: ${({ theme }) => theme.space.md};
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
  const { t } = useTranslation();
  const hasWorksPacePermission = useCanAccessToActiveWorkspace();
  const integrationCenterUrl = getLocalizeIntegrationCenterRoute(campaignId);
  const {
    isCampaignLoading,
    isCampaignBugsLoading,
    isCampaignFetching,
    isCampaignBugsFetching,
    severities,
    status,
  } = useCampaignBugs(campaignId);

  const { data: campaignData } = useGetCampaignsByCidQuery({
    cid: campaignId.toString(),
  });

  if (isCampaignLoading || isCampaignBugsLoading) {
    return <Skeleton width="200px" height="30px" />;
  }

  return (
    <Container
      style={{
        opacity: isCampaignFetching || isCampaignBugsFetching ? 0.5 : 1,
      }}
    >
      <PageMeta>
        <UniqueBugsCounter campaignId={campaignId} />
        {severities &&
          Object.keys(severities).map((severity) => (
            <SeverityMeta
              key={severity}
              counter={severities[severity as Severities]}
              severity={severity as Severities}
              size="large"
            />
          ))}
        <Pipe />
        {status && <StatusMeta status={status.name as CampaignStatus} />}
      </PageMeta>
      <ButtonsWrapper>
        {campaignData &&
          campaignData.isArchived !== true &&
          hasWorksPacePermission && <CampaignSettings />}
        <Button
          isBasic
          className="header-dowlnoad-report"
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
          className="header-integration-center"
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
