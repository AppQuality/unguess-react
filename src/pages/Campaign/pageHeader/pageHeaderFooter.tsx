import {
  Button,
  Span,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import styled from 'styled-components';
import { Campaign } from 'src/features/api';
import { Pill } from 'src/common/components/Pill';
import { ReactComponent as ClockIcon } from 'src/assets/icons/pill-icon-clock.svg';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';
import { ReactComponent as MobileIcon } from 'src/assets/icons/pill-icon-mobile.svg';
import { ReactComponent as UsersIcon } from 'src/assets/icons/pill-icon-users.svg';
import { ReactComponent as ProgressIcon } from 'src/assets/icons/pill-icon-progress.svg';
import { ReactComponent as GearIcon } from 'src/assets/icons/pill-icon-gear.svg';
import { getDashboardDetailUrl } from 'src/hooks/useDetailDashboardUrl';

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

// TODO: Fetch campaign details from API
const campaignDetails = {
  devices: ['desktop', 'mobile'],
  users: 100,
};

export const HeaderFooter: FC<{ campaign: Campaign }> = ({ campaign }) => {
  const { t } = useTranslation();
  const { start_date, end_date, type, status } = campaign;

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
        {campaignDetails ? (
          <>
            <Pipe style={{ marginRight: globalTheme.space.md }} />
            {campaignDetails.devices.includes('desktop') && (
              <Pill
                icon={<DesktopIcon />}
                title={t('__CAMPAIGN_PAGE_INFO_HEADER_DESKTOP')}
                color={globalTheme.palette.azure[600]}
              />
            )}
            {campaignDetails.devices.includes('mobile') && (
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
              <Span>{campaignDetails.users}</Span>
            </Pill>
          </>
        ) : null}
      </PillsWrapper>
      <ButtonWrapper>
        <Button
          isPrimary
          isPill
          themeColor={globalTheme.palette.water[600]}
          onClick={() => window.open(getDashboardDetailUrl(campaign), '_blank')}
        >
          {t('__CAMPAIGN_PAGE_BUTTON_DETAIL_BUG')}
        </Button>
      </ButtonWrapper>
    </FooterContainer>
  );
};
