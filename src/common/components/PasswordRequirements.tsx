import { MD, theme } from '@appquality/unguess-design-system';
import { ReactComponent as X } from 'src/assets/icons/password-check-x.svg';
import { ReactComponent as Check } from 'src/assets/icons/password-check-v.svg';
import { useTranslation } from 'react-i18next';

const PasswordRequirement = ({
  check,
  children,
}: {
  check: () => boolean;
  children: React.ReactNode;
}) => (
  <li style={{ display: 'flex', alignItems: 'center' }}>
    {check() ? (
      <Check aria-hidden="true" fontSize={16} color={theme.palette.grey[500]} />
    ) : (
      <X aria-hidden="true" fontSize={16} />
    )}
    <MD
      isBold={!check()}
      style={{
        color: `${check() ? theme.palette.grey[500] : theme.palette.grey[700]}`,
      }}
    >
      {children}
    </MD>
  </li>
);

const PasswordRequirements = ({ password }: { password: string }) => {
  const { t } = useTranslation();

  return (
    <div data-qa="password-requirements" className="aq-mb-3">
      <MD>{t('PASSWORD_VALIDATOR_PASSWORD_REQUIREMENTS')}</MD>
      <ul>
        <PasswordRequirement check={() => password.length >= 6}>
          {t('PASSWORD_VALIDATOR_MINIMUM_OF_6_CHARACTERS')}
        </PasswordRequirement>
        <PasswordRequirement check={() => password.match(/[A-Z]/) !== null}>
          {t('PASSWORD_VALIDATOR_CONTAIN_AN_UPPERCASE_LETTER')}
        </PasswordRequirement>
        <PasswordRequirement check={() => password.match(/[a-z]/) !== null}>
          {t('PASSWORD_VALIDATOR_CONTAIN_A_LOWERCASE_LETTER')}
        </PasswordRequirement>
        <PasswordRequirement check={() => password.match(/[0-9]/) !== null}>
          {t('PASSWORD_VALIDATOR_CONTAIN_A_NUMBER')}
        </PasswordRequirement>
      </ul>
    </div>
  );
};

export { PasswordRequirements };
