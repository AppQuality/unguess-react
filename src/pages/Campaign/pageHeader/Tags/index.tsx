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
import { CampaignStatus, StatusTag } from 'src/common/components/tag/StatusTag';
import useWindowSize from 'src/hooks/useWindowSize';
import { DesktopTag } from './deviceTags/DesktopTag';
import { SmartphoneTag } from './deviceTags/SmartphoneTag';
import { TabletTag } from './deviceTags/TabletTag';
import { CampaignDurationTag } from './CampaignDurationTag';

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
  margin-top: ${({ theme }) => theme.space.xxs};

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

const TagsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledStatusTag = styled(StatusTag)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
`;

const StyledCampaignDurationTag = styled(CampaignDurationTag)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
`;

const StyledDesktopTag = styled(DesktopTag)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
`;

const StyledSmartphoneTag = styled(SmartphoneTag)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
`;

const StyledTabletTag = styled(TabletTag)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
`;

export const Tags = ({ campaign }: { campaign: CampaignWithOutput }) => {
  const { width } = useWindowSize();
  const breakpoint = parseInt(globalTheme.breakpoints.lg, 10);
  const hide = width < breakpoint;

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

  if (isLoading || isFetching) return <Skeleton width="200px" height="20px" />;

  return (
    <FooterContainer>
      <TagsWrapper>
        <StyledStatusTag status={family.name.toLowerCase() as CampaignStatus}>
          {type.name}
        </StyledStatusTag>
        <StyledStatusTag status={status.name as CampaignStatus} />
        <StyledCampaignDurationTag start={start_date} end={end_date} />
        {meta ? (
          <>
            {!hide && <Pipe style={{ marginRight: globalTheme.space.lg }} />}
            {meta.allowed_devices.includes('desktop') && <StyledDesktopTag />}
            {meta.allowed_devices.includes('smartphone') && (
              <StyledSmartphoneTag />
            )}
            {meta.allowed_devices.includes('tablet') && <StyledTabletTag />}
          </>
        ) : null}
      </TagsWrapper>
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
