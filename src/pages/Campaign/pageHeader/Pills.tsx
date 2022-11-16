import {
  Button,
  Span,
  theme as globalTheme,
  Skeleton,
} from '@appquality/unguess-design-system';
import { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import styled from 'styled-components';
import { Campaign, useGetCampaignsByCidMetaQuery } from 'src/features/api';
import { Pill } from 'src/common/components/Pill';
import { ReactComponent as ClockIcon } from 'src/assets/icons/pill-icon-clock.svg';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';
import { ReactComponent as MobileIcon } from 'src/assets/icons/pill-icon-mobile.svg';
import { ReactComponent as UsersIcon } from 'src/assets/icons/pill-icon-users.svg';
import { ReactComponent as ProgressIcon } from 'src/assets/icons/pill-icon-progress.svg';
import { ReactComponent as GearIcon } from 'src/assets/icons/pill-icon-gear.svg';
import { format } from 'date-fns';

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

export const Pills: FC<{ campaign: Campaign }> = ({ campaign }) => {
  const {
    data: meta,
    isLoading,
    isFetching,
  } = useGetCampaignsByCidMetaQuery({ cid: campaign.id });

  const { t } = useTranslation();

  // Format dates
  const startDate = new Date(campaign.start_date);
  const endDate = new Date(campaign.end_date);
  const formattedStartDate =
    startDate.getFullYear() === endDate.getFullYear()
      ? format(startDate, 'dd/MM')
      : format(startDate, 'dd/MM/yyyy');
  const formattedEndDate = format(endDate, 'dd/MM/yyyy');

  if (isLoading || isFetching) return <Skeleton width="200px" height="20px" />;
  return (
    <FooterContainer>
      <PillsWrapper>
        <Pill
          icon={<GearIcon />}
          title={campaign.type.name}
          color={globalTheme.palette.blue[600]}
        />
        <Pill
          icon={<ProgressIcon />}
          title={capitalizeFirstLetter(campaign.status.name)}
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
            {(meta.allowed_devices.includes('smartphone') ||
              meta.allowed_devices.includes('tablet')) && (
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
              <Span>{meta.selected_testers}</Span>
            </Pill>
          </>
        ) : null}
      </PillsWrapper>
      <ButtonWrapper>
        <Button isPrimary isPill themeColor={globalTheme.palette.water[600]}>
          {t('__CAMPAIGN_PAGE_BUTTON_DETAIL_BUG')}
        </Button>
      </ButtonWrapper>
    </FooterContainer>
  );
};
