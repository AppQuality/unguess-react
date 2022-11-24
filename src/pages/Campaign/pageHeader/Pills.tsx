import {
  Button,
  Span,
  theme as globalTheme,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useTranslation, Trans } from 'react-i18next';
import styled from 'styled-components';
import {
  CampaignWithOutput,
  useGetCampaignsByCidMetaQuery,
} from 'src/features/api';
import { Pill } from 'src/common/components/Pill';
import { ReactComponent as ClockIcon } from 'src/assets/icons/pill-icon-clock.svg';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';
import { ReactComponent as SmartphoneIcon } from 'src/assets/icons/pill-icon-smartphone.svg';
import { ReactComponent as TabletIcon } from 'src/assets/icons/pill-icon-tablet.svg';
import { ReactComponent as UsersIcon } from 'src/assets/icons/pill-icon-users.svg';
import { ReactComponent as ProgressIcon } from 'src/assets/icons/pill-icon-progress.svg';
import { ReactComponent as IncomingIcon } from 'src/assets/icons/pill-icon-incoming.svg';
import { ReactComponent as CompletedIcon } from 'src/assets/icons/pill-icon-completed.svg';
import { ReactComponent as GearIcon } from 'src/assets/icons/pill-icon-gear.svg';
import { format } from 'date-fns';
import {
  getLocalizedFunctionalDashboardUrl,
  getLocalizedUXDashboardUrl,
} from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';

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

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const PillsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const Pills = ({ campaign }: { campaign: CampaignWithOutput }) => {
  const {
    data: meta,
    isLoading,
    isFetching,
  } = useGetCampaignsByCidMetaQuery({ cid: campaign.id });

  const { t } = useTranslation();
  const { start_date, end_date, type, status, outputs } = campaign;

  // Format dates
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const formattedStartDate =
    startDate.getFullYear() === endDate.getFullYear()
      ? format(startDate, 'dd/MM')
      : format(startDate, 'dd/MM/yyyy');
  const formattedEndDate = format(endDate, 'dd/MM/yyyy');

  function renderStatusPill(statusName: string) {
    switch (statusName) {
      case 'incoming':
        return (
          <Pill
            icon={<IncomingIcon />}
            title={capitalizeFirstLetter(statusName)}
            color={globalTheme.palette.azure[600]}
          />
        );
      case 'completed':
        return (
          <Pill
            icon={<CompletedIcon />}
            title={capitalizeFirstLetter(statusName)}
            color={globalTheme.palette.green[800]}
          />
        );
      case 'running':
      default:
        return (
          <Pill
            icon={<ProgressIcon />}
            title={capitalizeFirstLetter(statusName)}
            color={globalTheme.palette.yellow[700]}
          />
        );
    }
  }

  if (isLoading || isFetching) return <Skeleton width="200px" height="20px" />;

  return (
    <FooterContainer>
      <PillsWrapper>
        <Pill
          icon={<GearIcon />}
          title={type.name}
          color={globalTheme.palette.blue[600]}
        />
        {renderStatusPill(status.name)}
        <Pill
          icon={<ClockIcon />}
          title={t('__CAMPAIGN_PAGE_INFO_HEADER_TEST_TIMING')}
          color={globalTheme.palette.azure[600]}
        >
          <Trans i18nKey="__CAMPAIGN_PAGE_INFO_HEADER_FROM_DATE_TO_DATE">
            <Span>{{ start_date: formattedStartDate }}</Span> to{' '}
            <Span>{{ end_date: formattedEndDate }}</Span>
          </Trans>
        </Pill>
        {meta ? (
          <>
            <Pipe style={{ marginRight: globalTheme.space.md }} />
            {meta.allowed_devices.includes('desktop') && (
              <Pill
                icon={<DesktopIcon />}
                title={t('__CAMPAIGN_PAGE_INFO_HEADER_DESKTOP')}
                color={globalTheme.palette.azure[600]}
              />
            )}
            {meta.allowed_devices.includes('smartphone') && (
              <Pill
                icon={<SmartphoneIcon />}
                title={t('__CAMPAIGN_PAGE_INFO_HEADER_PLATFORM_SMARTPHONE')}
                color={globalTheme.palette.azure[600]}
              />
            )}
            {meta.allowed_devices.includes('tablet') && (
              <Pill
                icon={<TabletIcon />}
                title={t('__CAMPAIGN_PAGE_INFO_HEADER_PLATFORM_TABLET')}
                color={globalTheme.palette.azure[600]}
              />
            )}
            <Pill
              icon={<UsersIcon />}
              title={t('__CAMPAIGN_PAGE_INFO_HEADER_USERS_NUMBER')}
              color={globalTheme.palette.water[600]}
            >
              <Span>{meta.selected_testers}</Span>
            </Pill>
          </>
        ) : null}
      </PillsWrapper>
      <ButtonWrapper>
        {outputs?.includes('bugs') && (
          <Button
            isPrimary
            isPill
            themeColor={globalTheme.palette.water[600]}
            onClick={() =>
              // eslint-disable-next-line security/detect-non-literal-fs-filename
              window.open(
                getLocalizedFunctionalDashboardUrl(campaign.id, i18n.language),
                '_blank'
              )
            }
          >
            {t('__CAMPAIGN_PAGE_BUTTON_DETAIL_BUG')}
          </Button>
        )}
        {outputs?.includes('media') && (
          <Button
            isPrimary
            isPill
            themeColor={globalTheme.palette.water[600]}
            onClick={() =>
              // eslint-disable-next-line security/detect-non-literal-fs-filename
              window.open(
                getLocalizedUXDashboardUrl(campaign.id, i18n.language),
                '_blank'
              )
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
