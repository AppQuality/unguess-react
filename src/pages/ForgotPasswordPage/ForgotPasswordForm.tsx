import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Anchor,
  Button,
  FormField,
  Label,
  MD,
  MediaInput,
  Message,
  Title,
  XL,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 100%;
  padding: ${({ theme }) => theme.space.xl} 0;
  text-align: left;
`;

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
}

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordFormProps) => {
  const { t } = useTranslation();
  const loginRoute = useLocalizeRoute('login');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) return t('__FORM_FIELD_REQUIRED_MESSAGE');
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
      return t('__LOGIN_FORM_EMAIL_FIELD_INVALID_MESSAGE');
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit(email);
    } catch (err: any) {
      setError(err.message || t('FORGOT_PASSWORD_ERROR_GENERIC'));
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Title
        style={{
          textAlign: 'center',
          marginTop: appTheme.space.sm,
        }}
      >
        <XL isBold style={{ color: appTheme.palette.blue[600] }}>
          {t('FORGOT_PASSWORD_TITLE')}
        </XL>
      </Title>
      <MD
        style={{
          textAlign: 'center',
          color: appTheme.palette.grey[700],
          marginBottom: appTheme.space.lg,
          whiteSpace: 'pre-line',
        }}
      >
        {t('FORGOT_PASSWORD_SUBTITLE')}
      </MD>
      <StyledForm onSubmit={handleSubmit}>
        <FormField>
          <Label>
            {t('FORGOT_PASSWORD_EMAIL_LABEL')}
            <span style={{ color: appTheme.palette.red[600] }}>*</span>
          </Label>
          <MediaInput
            type="email"
            placeholder={t('FORGOT_PASSWORD_EMAIL_PLACEHOLDER')}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            {...(error ? { validation: 'error' as const } : {})}
          />
          {error && <Message validation="error">{error}</Message>}
        </FormField>
        <Button
          type="submit"
          isStretched
          isPrimary
          isAccent
          disabled={isSubmitting}
          style={{ marginTop: appTheme.space.lg }}
        >
          {isSubmitting ? t('LOADING') : t('FORGOT_PASSWORD_SEND_CTA')}
        </Button>
        <div style={{ textAlign: 'center', marginTop: appTheme.space.md }}>
          <Anchor
            href={loginRoute}
            style={{ color: appTheme.palette.blue[600] }}
          >
            {t('FORGOT_PASSWORD_BACK_TO_LOGIN')}
          </Anchor>
        </div>
      </StyledForm>
    </>
  );
};
