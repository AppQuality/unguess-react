import {
  Anchor,
  ContainerCard,
  LG,
  MD,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as ShieldIcon } from 'src/assets/icons/shield-fill.svg';
import { Divider } from 'src/common/components/divider';
import styled from 'styled-components';
import { FormPassword } from '../FormPassword';
import {
  StyledCardHeader,
  StyledNotificationsCardHeaderWrapper,
} from './common';
import { MfaAccordion } from './MfaAccordion';

const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.sm} 0;
`;

export const SecuritySettingsCard = () => {
  const { t } = useTranslation();

  return (
    <ContainerCard
      id="anchor-security-settings-id"
      data-qa="security-settings-card"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <StyledNotificationsCardHeaderWrapper>
          <StyledCardHeader>
            <ShieldIcon
              style={{
                color: appTheme.palette.blue[600],
                width: appTheme.iconSizes.md,
                height: appTheme.iconSizes.md,
              }}
            />
            <LG isBold style={{ color: appTheme.palette.grey[800] }}>
              {t('__PROFILE_PAGE_SECURITY_CARD_LABEL')}
            </LG>
          </StyledCardHeader>
          <MD color={appTheme.palette.grey[600]}>
            {t('__PROFILE_PAGE_SECURITY_CARD_DESCRIPTION')}
          </MD>
        </StyledNotificationsCardHeaderWrapper>
        <Divider
          style={{
            marginTop: appTheme.space.sm,
            marginBottom: appTheme.space.sm,
          }}
        />
        <AccordionWrapper>
          <FormPassword />
          <MfaAccordion />
        </AccordionWrapper>
      </div>
      <MD
        color={appTheme.palette.grey[600]}
        style={{ marginTop: appTheme.space.sm }}
      >
        {t('__PROFILE_PAGE_SECURITY_NEED_HELP')}{' '}
        <Anchor
          href="mailto:support@unguess.io"
          style={{ color: appTheme.palette.blue[600] }}
        >
          {t('__PROFILE_PAGE_SECURITY_CONTACT_SUPPORT')}
        </Anchor>
      </MD>
    </ContainerCard>
  );
};
