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
import { ReactComponent as UsersIcon } from 'src/assets/icons/pill-icon-users.svg';
import { ReactComponent as ProgressIcon } from 'src/assets/icons/pill-icon-progress.svg';
import { ReactComponent as GearIcon } from 'src/assets/icons/pill-icon-gear.svg';

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
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const ButtonWrapper = styled.div``;

const PillsWrapper = styled.div``;

export const Counters: FC<{ campaign: Campaign }> = ({ campaign }) => {
  const { t } = useTranslation();

  const formattedStartDate = new Date(campaign.start_date)
    .toLocaleDateString('it')
    .substring(0, 4);
  const formattedEndDate = new Date(campaign.end_date).toLocaleDateString('it');

  return (
    <FooterContainer>
      <PillsWrapper>
        <Pill
          icon={<GearIcon />}
          title={campaign.type.name}
          hue={globalTheme.palette.blue[600]}
        />
        <Pill
          icon={<ProgressIcon />}
          title={capitalizeFirstLetter(campaign.status.name)}
          hue={globalTheme.palette.yellow[700]}
        />
        <Pill
          icon={<ClockIcon />}
          title={t('__CAMPAIGN_PAGE_INFO_HEADER_TEST_TIMING')}
          hue={globalTheme.palette.azure[600]}
        >
          <Trans i18nKey="__CAMPAIGN_PAGE_INFO_HEADER_FROM_DATE_TO_DATE">
            <Span>{{ start_date: formattedStartDate }}</Span> to{' '}
            <Span>{{ end_date: formattedEndDate }}</Span>
          </Trans>
        </Pill>

        <Pipe />

        <Pill
          icon={<DesktopIcon />}
          title={t('__CAMPAIGN_PAGE_INFO_HEADER_DESKTOP')}
          hue={globalTheme.palette.azure[600]}
        />

        <Pill
          icon={<UsersIcon />}
          title={t('__CAMPAIGN_PAGE_INFO_HEADER_USERS_NUMBER')}
          hue={globalTheme.palette.water[600]}
        >
          <Span>{campaign.id}</Span>
        </Pill>
      </PillsWrapper>

      <ButtonWrapper>
        <Button isPrimary isPill themeColor={globalTheme.palette.water[600]}>
          {t('__CAMPAIGN_PAGE_BUTTON_DETAIL_BUG')}
        </Button>
      </ButtonWrapper>
    </FooterContainer>
  );
};
