import { SM, theme } from '@appquality/unguess-design-system';
import { ReactComponent as X } from 'src/assets/icons/password-check-x.svg';
import { ReactComponent as Check } from 'src/assets/icons/password-check-v.svg';
import { useTranslation } from 'react-i18next';

const PasswordRequirement = ({
  check,
  showStatus,
  children,
}: {
  check: () => boolean;
  showStatus: boolean;
  children: React.ReactNode;
}) => {
  if (!showStatus) {
    return (
      <li style={{ display: 'flex', alignItems: 'center' }}>
        <SM style={{ color: theme.palette.grey[700] }}>{children}</SM>
      </li>
    );
  }
  return (
    <li style={{ display: 'flex', alignItems: 'center' }}>
      {check() ? (
        <Check
          aria-hidden="true"
          fontSize={16}
          color={theme.palette.grey[500]}
        />
      ) : (
        <X aria-hidden="true" fontSize={16} />
      )}
      <SM
        isBold={!check()}
        style={{
          color: `${
            check() ? theme.palette.grey[500] : theme.palette.grey[700]
          }`,
        }}
      >
        {children}
      </SM>
    </li>
  );
};

const PasswordRequirements = ({
  password,
  showStatus = true,
}: {
  password: string;
  showStatus?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <div data-qa="password-requirements" className="aq-mb-3">
      <SM>{t('PASSWORD_VALIDATOR_PASSWORD_REQUIREMENTS')}</SM>
      <ul>
        <PasswordRequirement
          showStatus={showStatus}
          check={() => password.length >= 12}
        >
          {t('PASSWORD_VALIDATOR_MINIMUM_OF_12_CHARACTERS')}
        </PasswordRequirement>
        <PasswordRequirement
          showStatus={showStatus}
          check={() => password.match(/[A-Z]/) !== null}
        >
          {t('PASSWORD_VALIDATOR_CONTAIN_AN_UPPERCASE_LETTER')}
        </PasswordRequirement>
        <PasswordRequirement
          showStatus={showStatus}
          check={() => password.match(/[a-z]/) !== null}
        >
          {t('PASSWORD_VALIDATOR_CONTAIN_A_LOWERCASE_LETTER')}
        </PasswordRequirement>
        <PasswordRequirement
          showStatus={showStatus}
          check={() => password.match(/[0-9]/) !== null}
        >
          {t('PASSWORD_VALIDATOR_CONTAIN_A_NUMBER')}
        </PasswordRequirement>
      </ul>
    </div>
  );
};

export { PasswordRequirements };
