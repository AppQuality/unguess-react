import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormField,
  Label,
  MD,
  MediaInput,
  Message,
  Title,
  XL,
} from '@appquality/unguess-design-system';
import { ReactComponent as EyeIcon } from '@zendeskgarden/svg-icons/src/16/eye-fill.svg';
import { ReactComponent as EyeOffIcon } from '@zendeskgarden/svg-icons/src/16/eye-hide-fill.svg';
import { appTheme } from 'src/app/theme';
import { PasswordRequirements } from 'src/common/components/PasswordRequirements';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 100%;
  padding: ${({ theme }) => theme.space.xl} 0;
  text-align: left;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: ${appTheme.palette.grey[600]};
`;

interface ChangePasswordFormProps {
  onSubmit: (newPassword: string) => Promise<void>;
}

export const ChangePasswordForm = ({ onSubmit }: ChangePasswordFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginRoute = useLocalizeRoute('login');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [passwordTouched, setPasswordTouched] = useState(false);

  const validatePassword = () => {
    if (newPassword.length < 12) return false;
    if (!/[A-Z]/.test(newPassword)) return false;
    if (!/[a-z]/.test(newPassword)) return false;
    if (!/[0-9]/.test(newPassword)) return false;
    return true;
  };

  const getPasswordError = (): string | null => {
    if (!newPassword) return t('SIGNUP_FORM_PASSWORD_REQUIRED');
    if (newPassword.length < 12)
      return t('SIGNUP_FORM_PASSWORD_MUST_BE_AT_LEAST_12_CHARACTER_LONG');
    if (!/[a-z]/.test(newPassword))
      return t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_LOWERCASE_LETTER');
    if (!/[A-Z]/.test(newPassword))
      return t(
        'SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_AN_UPPERCASE_LETTER'
      );
    if (!/[0-9]/.test(newPassword))
      return t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_NUMBER');
    return null;
  };

  const passwordError = passwordTouched ? getPasswordError() : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError(t('FORGOT_PASSWORD_PASSWORDS_DONT_MATCH'));
      return;
    }
    if (!validatePassword()) return;

    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit(newPassword);
      navigate(loginRoute);
    } catch (err: any) {
      setError(err.message || t('FORGOT_PASSWORD_ERROR_GENERIC'));
      setIsSubmitting(false);
    }
  };

  const isValid =
    validatePassword() &&
    confirmPassword.length > 0 &&
    newPassword === confirmPassword;

  return (
    <>
      <Title
        style={{
          textAlign: 'center',
          marginTop: appTheme.space.sm,
        }}
      >
        <XL isBold style={{ color: appTheme.palette.blue[600] }}>
          {t('FORGOT_PASSWORD_CHANGE_TITLE')}
        </XL>
      </Title>
      <MD
        style={{
          textAlign: 'center',
          color: appTheme.palette.grey[700],
          marginBottom: appTheme.space.lg,
        }}
      >
        {t('FORGOT_PASSWORD_CHANGE_SUBTITLE')}
      </MD>
      <StyledForm onSubmit={handleSubmit}>
        <FormField>
          <Label>
            {t('FORGOT_PASSWORD_NEW_PASSWORD_LABEL')}
            <span style={{ color: appTheme.palette.red[600] }}>*</span>
          </Label>
          <MediaInput
            type={showNewPassword ? 'text' : 'password'}
            placeholder={t('FORGOT_PASSWORD_NEW_PASSWORD_PLACEHOLDER')}
            value={newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
            onBlur={() => setPasswordTouched(true)}
            end={
              <ToggleButton
                type="button"
                onClick={() => setShowNewPassword((v) => !v)}
                aria-label={showNewPassword ? 'Hide password' : 'Show password'}
              >
                {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
              </ToggleButton>
            }
            {...(passwordError ? { validation: 'error' as const } : {})}
          />
          <PasswordRequirements password={newPassword} />
          {passwordError && (
            <Message validation="error">{passwordError}</Message>
          )}
        </FormField>
        <FormField style={{ marginTop: appTheme.space.md }}>
          <Label>
            {t('FORGOT_PASSWORD_CONFIRM_LABEL')}
            <span style={{ color: appTheme.palette.red[600] }}>*</span>
          </Label>
          <MediaInput
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder={t('FORGOT_PASSWORD_CONFIRM_PLACEHOLDER')}
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            end={
              <ToggleButton
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={
                  showConfirmPassword ? 'Hide password' : 'Show password'
                }
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </ToggleButton>
            }
            {...(confirmPassword && newPassword !== confirmPassword
              ? { validation: 'error' as const }
              : {})}
          />
          {confirmPassword && newPassword !== confirmPassword && (
            <Message validation="error">
              {t('FORGOT_PASSWORD_PASSWORDS_DONT_MATCH')}
            </Message>
          )}
        </FormField>
        {error && (
          <Message
            validation="error"
            style={{ marginTop: appTheme.space.md, textAlign: 'center' }}
          >
            {error}
          </Message>
        )}
        <Button
          type="submit"
          isStretched
          isPrimary
          isAccent
          disabled={!isValid || isSubmitting}
          style={{ marginTop: appTheme.space.lg }}
        >
          {isSubmitting ? t('LOADING') : t('FORGOT_PASSWORD_RESET_CTA')}
        </Button>
      </StyledForm>
    </>
  );
};
