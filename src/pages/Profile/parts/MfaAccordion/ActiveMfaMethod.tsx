import {
  ButtonMenu,
  IconButton,
  MD,
  SM,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as DotsIcon } from '@zendeskgarden/svg-icons/src/16/overflow-vertical-stroke.svg';
import { ReactComponent as TrashIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import styled from 'styled-components';

type MfaMethod = 'authenticator' | 'sms';

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
    method === 'authenticator'
      ? t('__PROFILE_PAGE_MFA_ACTIVE_AUTHENTICATOR_LABEL')
      : t('__PROFILE_PAGE_MFA_ACTIVE_SMS_LABEL');

  const methodDescription =
    method === 'authenticator'
      ? t('__PROFILE_PAGE_MFA_ACTIVE_AUTHENTICATOR_DESCRIPTION')
      : t('__PROFILE_PAGE_MFA_ACTIVE_SMS_DESCRIPTION');

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
          <SM style={{ color: appTheme.palette.grey[500] }}>{lastChanged}</SM>
        )}
      </Info>
      <ButtonMenu
        onSelect={(value) => {
          if (value === 'remove' && onRemove) {
            onRemove();
          }
        }}
        label={(props) => (
          <IconButton {...props}>
            <DotsIcon />
          </IconButton>
        )}
      >
        <ButtonMenu.Item value="remove" type="danger" icon={<TrashIcon />}>
          {t('__PROFILE_PAGE_MFA_ACTIVE_REMOVE')}
        </ButtonMenu.Item>
      </ButtonMenu>
    </Container>
  );
};
