import { Button, Skeleton } from '@appquality/unguess-design-system';
import { theme as globalTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  CampaignWithOutput,
  useGetCampaignsByCidMetaQuery,
} from 'src/features/api';
import { getLocalizedUXDashboardUrl } from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
import { openUrl } from 'src/common/openUrl';
import { Link } from 'react-router-dom';
import { Pipe } from 'src/common/components/Pipe';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { StatusPill } from 'src/common/components/pills/StatusPill';
import { DesktopPill } from './devicePills/DesktopPill';
import { SmartphonePill } from './devicePills/SmartphonePill';
import { TabletPill } from './devicePills/TabletPill';
import { CampaignTypePill } from './CampaignTypePill';
import { CampaignDurationPill } from './CampaignDurationPill';

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  flex-direction: column;
  align-items: flex-start;
  ${ButtonWrapper} {
    margin-top: ${({ theme }) => theme.space.base * 5}px;
    margin-bottom: ${({ theme }) => theme.space.base * 6}px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-direction: row;
    align-items: center;
    ${ButtonWrapper} {
      margin-top: inherit;
      margin-bottom: inherit;
    }
  }
`;

const PillsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Pills = ({ campaign }: { campaign: CampaignWithOutput }) => {
  const {
    data: meta,
    isLoading,
    isFetching,
  } = useGetCampaignsByCidMetaQuery({ cid: campaign.id });

  const { t } = useTranslation();
  const functionalDashboardLink = useLocalizeRoute(
    `campaigns/${campaign.id}/bugs`
  );
  const { start_date, end_date, type, status, outputs, family } = campaign;
  const isFunctional = family.name.toLowerCase() === 'functional';

  if (isLoading || isFetching) return <Skeleton width="200px" height="20px" />;

  return (
    <FooterContainer>
      <PillsWrapper>
        <CampaignTypePill type={type.name} isFunctional={isFunctional} />
        <StatusPill status={status.name} />
        <CampaignDurationPill start={start_date} end={end_date} />
        {meta ? (
          <>
            <Pipe style={{ marginRight: globalTheme.space.md }} />
            {meta.allowed_devices.includes('desktop') && <DesktopPill />}
            {meta.allowed_devices.includes('smartphone') && <SmartphonePill />}
            {meta.allowed_devices.includes('tablet') && <TabletPill />}
          </>
        ) : null}
      </PillsWrapper>
      <ButtonWrapper>
        {outputs?.includes('media') && (
          <Button
            id="button-media-list-header"
            isPill
            onClick={() =>
              openUrl(getLocalizedUXDashboardUrl(campaign.id, i18n.language), {
                newTab: true,
              })
            }
            style={{ marginLeft: globalTheme.space.xs }}
          >
            {t('__CAMPAIGN_PAGE_BUTTON_DETAIL_MEDIA')}
          </Button>
        )}
        {outputs?.includes('bugs') && (
          <Link to={functionalDashboardLink}>
            <Button
              id="button-bugs-list-header"
              isPrimary
              isPill
              themeColor={globalTheme.palette.water[600]}
            >
              {t('__CAMPAIGN_PAGE_BUTTON_DETAIL_BUG')}
            </Button>
          </Link>
        )}
      </ButtonWrapper>
    </FooterContainer>
  );
};
