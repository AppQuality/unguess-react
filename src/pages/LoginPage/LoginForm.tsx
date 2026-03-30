import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  Anchor,
  Button,
  ContainerCard,
  FormField as Field,
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
import { LoginFormFields } from './type';

const StyledCard = styled(ContainerCard)`
  border: 0;
  padding: 0;
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

const StyledForm = styled(Form)`
  width: 100%;
  padding: ${({ theme }) => theme.space.xl} 0;
`;

const getValidation = (hasError: boolean, isTouched: boolean | undefined) => {
  if (hasError) return { validation: 'error' as const };
  if (isTouched) return { validation: 'success' as const };
  return {};
};

interface LoginFormProps {
  onSubmit: (
    values: LoginFormFields,
    actions: FormikHelpers<LoginFormFields>
  ) => void | Promise<void>;
  buttonText: string;
}

const LoginForm = ({ onSubmit, buttonText }: LoginFormProps) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const validate = (values: LoginFormFields) => {
    const errors: Partial<Record<keyof LoginFormFields, string>> = {};
    if (!values.email) {
      errors.email = t('__FORM_FIELD_REQUIRED_MESSAGE');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = t('__LOGIN_FORM_EMAIL_FIELD_INVALID_MESSAGE');
    }

    if (!values.password) {
      errors.password = t('__FORM_FIELD_REQUIRED_MESSAGE');
    }

    return errors;
  };

  return (
    <StyledCard style={{ width: '100%', maxWidth: '500px' }}>
      <Title
        style={{
          textAlign: 'center',
          marginTop: appTheme.space.sm,
        }}
      >
        <XL isBold style={{ color: appTheme.palette.blue[600] }}>
          {t('__LOGIN_FORM_TITLE')}
        </XL>
      </Title>
      <MD
        style={{
          textAlign: 'center',
          color: appTheme.palette.grey[700],
        }}
      >
        {t('__LOGIN_FORM_SUBTITLE')}
      </MD>
      <div style={{ textAlign: 'left' }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange
        >
          {({
            values,
            status,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <StyledForm onSubmit={handleSubmit}>
              <Field>
                <Label>
                  {t('__LOGIN_FORM_EMAIL_LABEL')}
                  <span style={{ color: appTheme.palette.red[600] }}>*</span>
                </Label>
                <MediaInput
                  type="email"
                  name="email"
                  placeholder={t('__LOGIN_FORM_EMAIL_PLACEHOLDER')}
                  onChange={handleChange}
                  value={values.email}
                  {...getValidation(!!errors.email, touched.email)}
                />
                {errors.email && (
                  <Message validation="error">{errors.email}</Message>
                )}
              </Field>
              <Field style={{ marginTop: appTheme.space.md }}>
                <Label>
                  {t('__LOGIN_FORM_PASSWORD_LABEL')}
                  <span style={{ color: appTheme.palette.red[600] }}>*</span>
                </Label>
                <MediaInput
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder={t('__LOGIN_FORM_PASSWORD_PLACEHOLDER')}
                  onChange={handleChange}
                  value={values.password}
                  end={
                    <ToggleButton
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </ToggleButton>
                  }
                  {...getValidation(!!errors.password, touched.password)}
                />
                {errors.password && (
                  <Message validation="error">{errors.password}</Message>
                )}
              </Field>
              <Anchor
                href="/forgot-password"
                style={{
                  color: appTheme.palette.blue[600],
                  marginTop: appTheme.space.xs,
                  display: 'inline-block',
                  marginBottom: appTheme.space.lg,
                }}
              >
                {t('__LOGIN_FORM_PASSWORD_FORGOT_LABEL')}
              </Anchor>
              <Button
                type="submit"
                isStretched
                disabled={Object.keys(errors).length > 0 || isSubmitting}
                isPrimary
                isAccent
                style={{ marginBottom: appTheme.space.md }}
              >
                {buttonText}
              </Button>
              <MD>
                {t('__LOGIN_FORM_NO_ACCOUNT_LABEL')}
                <Anchor
                  href="/join/signup"
                  style={{
                    marginLeft: appTheme.space.xs,
                    color: appTheme.palette.blue[600],
                  }}
                >
                  {t('__LOGIN_FORM_SIGNUP_CTA')}
                </Anchor>
              </MD>
              {status && (
                <div style={{ textAlign: 'center' }}>
                  <Message validation="error">{status.message}</Message>
                </div>
              )}
            </StyledForm>
          )}
        </Formik>
      </div>
    </StyledCard>
  );
};

export { LoginForm };
