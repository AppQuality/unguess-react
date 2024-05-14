import { Button, Skeleton } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  CampaignWithOutput,
  useGetCampaignsByCidMetaQuery,
} from 'src/features/api';
import { Link } from 'react-router-dom';
import { Pipe } from 'src/common/components/Pipe';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { CampaignStatus } from 'src/types';
import { StatusMeta } from 'src/common/components/meta/StatusMeta';
import { PageMeta } from 'src/common/components/PageMeta';
import { CampaignSettings } from 'src/common/components/inviteUsers/campaignSettings';
import { DesktopMeta } from './DesktopMeta';
import { SmartphoneMeta } from './SmartphoneMeta';
import { TabletMeta } from './TabletMeta';
import { CampaignDurationMeta } from './CampaignDurationMeta';
import { TvMeta } from './TvMeta';

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: ${({ theme }) => theme.space.sm};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-direction: row;
    align-items: center;

    ${ButtonWrapper} {
      margin-top: inherit;
      margin-bottom: inherit;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    ${ButtonWrapper} {
      margin-top: ${({ theme }) => theme.space.md};
    }
  }
`;

export const Metas = ({ campaign }: { campaign: CampaignWithOutput }) => {
  const {
    data: meta,
    isLoading,
    isFetching,
  } = useGetCampaignsByCidMetaQuery({ cid: campaign.id.toString() });

  const { t } = useTranslation();
  const functionalDashboardLink = useLocalizeRoute(
    `campaigns/${campaign.id}/bugs`
  );
  const videoDashboardLink = useLocalizeRoute(
    `campaigns/${campaign.id}/videos`
  );
  const { start_date, end_date, type, status, outputs, family } = campaign;

  if (isLoading || isFetching) return <Skeleton width="200px" height="20px" />;

  return (
    <FooterContainer>
      <PageMeta>
        <StatusMeta status={family.name.toLowerCase() as CampaignStatus}>
          {type.name}
        </StatusMeta>
        <StatusMeta status={status.name as CampaignStatus} />
        <CampaignDurationMeta start={start_date} end={end_date} />
        {meta ? (
          <>
            <Pipe />
            {meta.allowed_devices.includes('desktop') && <DesktopMeta />}
            {meta.allowed_devices.includes('smartphone') && <SmartphoneMeta />}
            {meta.allowed_devices.includes('tablet') && <TabletMeta />}
            {meta.allowed_devices.includes('tv') && <TvMeta />}
          </>
        ) : null}
      </PageMeta>
      <ButtonWrapper>
        <CampaignSettings />
        {outputs?.includes('bugs') && (
          <Link to={functionalDashboardLink}>
            <Button id="button-bugs-list-header" isPrimary isAccent>
              {t('__CAMPAIGN_PAGE_BUTTON_DETAIL_BUG')}
            </Button>
          </Link>
        )}
      </ButtonWrapper>
    </FooterContainer>
  );
};
