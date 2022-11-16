import {
  Button,
  Span,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import styled from 'styled-components';
import { Campaign, CampaignWithOutput } from 'src/features/api';
import { Pill } from 'src/common/components/Pill';
import { ReactComponent as ClockIcon } from 'src/assets/icons/pill-icon-clock.svg';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';
import { ReactComponent as MobileIcon } from 'src/assets/icons/pill-icon-mobile.svg';
import { ReactComponent as UsersIcon } from 'src/assets/icons/pill-icon-users.svg';
import { ReactComponent as ProgressIcon } from 'src/assets/icons/pill-icon-progress.svg';
import { ReactComponent as GearIcon } from 'src/assets/icons/pill-icon-gear.svg';
import { getLocalizedFunctionalDashboardUrl } from 'src/hooks/useLocalizeDashboardUrl';
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
const ButtonWrapper = styled.div``;

const PillsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const Pills: FC<{ campaign: CampaignWithOutput }> = ({ campaign }) => {
  // TODO: Fetch campaign details from API
  const useGetCpMetaQuery = (): {
    campaign: Campaign;
    selected_testers: number;
    allowed_devices: string[];
  } => ({
    campaign,
    selected_testers: 69,
    allowed_devices: ['desktop', 'mobile'],
  });

  const { t } = useTranslation();
  const { start_date, end_date, type, status, outputs } = campaign;

  // Format dates
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const formattedStartDate =
    startYear === endYear
      ? startDate.toLocaleDateString('it').substring(0, 4)
      : startDate.toLocaleDateString('it');
  const formattedEndDate = endDate.toLocaleDateString('it');

  return (
    <FooterContainer>
      <PillsWrapper>
        <Pill
          icon={<GearIcon />}
          title={type.name}
          color={globalTheme.palette.blue[600]}
        />
        <Pill
          icon={<ProgressIcon />}
          title={capitalizeFirstLetter(status.name)}
          color={globalTheme.palette.yellow[700]}
        />
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
        {useGetCpMetaQuery() ? (
          <>
            <Pipe style={{ marginRight: globalTheme.space.md }} />
            {useGetCpMetaQuery().allowed_devices.includes('desktop') && (
              <Pill
                icon={<DesktopIcon />}
                title={t('__CAMPAIGN_PAGE_INFO_HEADER_DESKTOP')}
                color={globalTheme.palette.azure[600]}
              />
            )}
            {useGetCpMetaQuery().allowed_devices.includes('mobile') && (
              <Pill
                icon={<MobileIcon />}
                title={t('__CAMPAIGN_PAGE_INFO_HEADER_MOBILE')}
                color={globalTheme.palette.azure[600]}
              />
            )}
            <Pill
              icon={<UsersIcon />}
              title={t('__CAMPAIGN_PAGE_INFO_HEADER_USERS_NUMBER')}
              color={globalTheme.palette.water[600]}
            >
              <Span>{useGetCpMetaQuery().selected_testers}</Span>
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
      </ButtonWrapper>
    </FooterContainer>
  );
};
