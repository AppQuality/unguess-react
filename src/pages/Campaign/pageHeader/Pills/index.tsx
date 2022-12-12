import { Button, Skeleton } from '@appquality/unguess-design-system';
import { theme as globalTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  CampaignWithOutput,
  useGetCampaignsByCidMetaQuery,
} from 'src/features/api';
import {
  getLocalizedFunctionalDashboardUrl,
  getLocalizedUXDashboardUrl,
} from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
import { openUrl } from 'src/common/openUrl';
import { DesktopPill } from './devicePills/DesktopPill';
import { SmartphonePill } from './devicePills/SmartphonePill';
import { TabletPill } from './devicePills/TabletPill';
import { StatusPill } from './StatusPill';
import { CampaignTypePill } from './CampaignTypePill';
import { CampaignDurationPill } from './CampaignDurationPill';

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
  const { start_date, end_date, type, status, outputs } = campaign;

  if (isLoading || isFetching) return <Skeleton width="200px" height="20px" />;

  return (
    <FooterContainer>
      <PillsWrapper>
        <CampaignTypePill className="campaign-type-pill" type={type.name} />
        <StatusPill className="campaign-status-pill" status={status.name} />
        <CampaignDurationPill
          className="campaign-duration-pill"
          start={start_date}
          end={end_date}
        />
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
        {outputs?.includes('bugs') && (
          <Button
            id="button-bugs-list-header"
            isPrimary
            isPill
            themeColor={globalTheme.palette.water[600]}
            onClick={() =>
              openUrl(
                getLocalizedFunctionalDashboardUrl(campaign.id, i18n.language),
                {
                  newTab: true,
                }
              )
            }
          >
            {t('__CAMPAIGN_PAGE_BUTTON_DETAIL_BUG')}
          </Button>
        )}
        {outputs?.includes('media') && (
          <Button
            id="button-media-list-header"
            isPrimary
            isPill
            themeColor={globalTheme.palette.water[600]}
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
      </ButtonWrapper>
    </FooterContainer>
  );
};
