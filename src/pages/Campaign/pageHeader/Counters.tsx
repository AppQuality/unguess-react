import {
  Button,
  Counter,
  Span,
  Tag,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import styled from 'styled-components';
import { Campaign } from 'src/features/api';
import { Pill } from 'src/common/components/Pill';

import { ReactComponent as ClockIcon } from 'src/assets/icons/time-icon.svg';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/device-laptop-active.svg';
import { ReactComponent as MobileIcon } from 'src/assets/icons/device-smartphone.svg';
import { ReactComponent as UsersIcon } from 'src/assets/icons/users-icon-custom.svg';

const Pipe = styled.span`
  /** Vertical Separator */
  border-left: 1px solid ${({ theme }) => theme.palette.grey[300]};
  height: ${({ theme }) => theme.space.lg};
  margin: 0 ${({ theme }) => theme.space.lg};
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

const CounterWrapper = styled.div``;

const StyledTag = styled(Tag)`
  background: transparent;
  color: ${(props) => props.hue};
  pointer-events: none;

  svg {
    margin-right: ${({ theme }) => theme.space.xxs} !important;
  }
`;
const StyledTagValue = styled(Span)`
  background: transparent;
  color: ${globalTheme.palette.grey[700]};
`;

export const Counters: FC<{ campaign: Campaign }> = ({ campaign }) => {
  const { t } = useTranslation();

  const formattedStartDate = new Date(campaign.start_date)
    .toLocaleDateString('it')
    .substring(0, 4);
  const formattedEndDate = new Date(campaign.end_date).toLocaleDateString('it');

  return (
    <FooterContainer>
      <CounterWrapper>
        <Counter status="functional">{campaign.type.name}</Counter>

        <Counter status="progress">
          {capitalizeFirstLetter(campaign.status.name)}
        </Counter>

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

        <StyledTag isPill isRegular hue={globalTheme.palette.azure[600]}>
          <StyledTag.Avatar>
            <DesktopIcon />
          </StyledTag.Avatar>
          <Span isBold>{t('__CAMPAIGN_PAGE_INFO_HEADER_DESKTOP')} </Span>
        </StyledTag>

        <StyledTag isPill isRegular hue={globalTheme.palette.azure[600]}>
          <StyledTag.Avatar>
            <MobileIcon />
          </StyledTag.Avatar>
          <Span isBold>{t('__CAMPAIGN_PAGE_INFO_HEADER_MOBILE')} </Span>
        </StyledTag>

        <StyledTag isPill isRegular hue={globalTheme.palette.water[600]}>
          <StyledTag.Avatar>
            <UsersIcon />
          </StyledTag.Avatar>
          <Span isBold>{t('__CAMPAIGN_PAGE_INFO_HEADER_USERS_NUMBER')} </Span>
          <StyledTagValue>
            <Span>{campaign.id}</Span>
          </StyledTagValue>
        </StyledTag>
      </CounterWrapper>

      <ButtonWrapper>
        <Button>Button</Button>
      </ButtonWrapper>
    </FooterContainer>
  );
};
