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
import { UniqueBugsCounter } from './UniqueBugsCounter';
import { useCampaign } from './useCampaign';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  display: none;
  @media screen and (min-width: ${(p) => p.theme.breakpoints.lg}) {
    display: block;
    flex: 1 0 auto;
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
  const integrationCenterUrl = getLocalizeIntegrationCenterRoute(campaignId);
  const { isLoading, status, severities } = useCampaign(campaignId);

  if (isLoading || !status || !severities)
    return <Skeleton width="200px" height="20px" />;

  return (
    <Container>
      <PageMeta>
        <UniqueBugsCounter campaignId={campaignId} />
        {Object.keys(severities).map((severity) => (
          <SeverityMeta
            key={severity}
            counter={severities[severity as Severities]}
            severity={severity as Severities}
            size="large"
          />
        ))}
        <Pipe />
        <StatusMeta status={status.name as CampaignStatus} />
      </PageMeta>
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
