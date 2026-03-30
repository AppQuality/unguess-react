import { Button, MD, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';

type MfaMethod = 'TOTP' | 'SMS' | 'EMAIL';

interface ActiveMfaMethodProps {
  method: MfaMethod;
  lastChanged?: string;
  onRemove?: () => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ActiveMfaMethod = ({
  method,
  lastChanged,
  onRemove,
}: ActiveMfaMethodProps) => {
  const { t } = useTranslation();

  const methodLabel =
    method === 'TOTP'
      ? t('__PROFILE_PAGE_MFA_ACTIVE_AUTHENTICATOR_LABEL')
      : t('__PROFILE_PAGE_MFA_ACTIVE_SMS_LABEL');

  const methodDescription =
    method === 'SMS' ? t('__PROFILE_PAGE_MFA_ACTIVE_SMS_DESCRIPTION') : null;

  return (
    <Container>
      <Info>
        <MD isBold style={{ color: appTheme.palette.grey[800] }}>
          {methodLabel}
        </MD>
        <SM style={{ color: appTheme.palette.grey[600] }}>
          {methodDescription}
        </SM>
        {lastChanged && (
          <SM style={{ color: appTheme.palette.grey[600] }}>{lastChanged}</SM>
        )}
      </Info>
      <Button size="small" isDanger onClick={onRemove}>
        {t('__PROFILE_PAGE_MFA_ACTIVE_TURN_OFF')}
      </Button>
    </Container>
  );
};
