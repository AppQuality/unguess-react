/**
 * SignupForm - Form di registrazione con email e password
 * Usa Cognito per la registrazione
 */
import {
  Anchor,
  Button,
  FormField,
  Input,
  Label,
  MediaInput,
  Message,
  Paragraph,
  SM,
  Span,
  XL,
} from '@appquality/unguess-design-system';
import { ReactComponent as Eye } from '@zendeskgarden/svg-icons/src/16/eye-fill.svg';
import { ReactComponent as EyeHide } from '@zendeskgarden/svg-icons/src/16/eye-hide-fill.svg';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import {
  AuthOrDivider,
  GoogleSignInButton,
} from 'src/common/components/GoogleSignInButton';
import { PasswordRequirements } from 'src/common/components/PasswordRequirements';
import { isDisposableEmail } from 'src/common/disposableEmail';
import { useAuth } from 'src/features/auth/context';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import styled from 'styled-components';
import { getSignupValidationSchema } from './validationSchema';

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`;

interface SignupFormValues {
  email: string;
  password: string;
}

interface SignupFormProps {
  onSignupSuccess: (email: string, password: string) => void;
}

export const SignupForm = ({ onSignupSuccess }: SignupFormProps) => {
  const { t } = useTranslation();
  const { signup } = useAuth();
  const sendGTMevent = useSendGTMevent({ loggedUser: false });
  const [inputType, setInputType] = useState('password');
  const [showPasswordStep, setShowPasswordStep] = useState(false);

  const handleChangeInputType = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const validateEmail = (value: string) => {
    if (!value) {
      return t('SIGNUP_FORM_EMAIL_REQUIRED');
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return t('SIGNUP_FORM_EMAIL_INVALID');
    }
    if (isDisposableEmail(value)) {
      return t('SIGNUP_FORM_EMAIL_DISPOSABLE_NOT_ALLOWED');
    }
    return undefined;
  };

  const handleSubmit = async (
    values: SignupFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<SignupFormValues>
  ) => {
    try {
      sendGTMevent({
        event: 'sign-up-flow',
        category: 'not invited',
        action: 'start',
      });

      // Signup con Cognito
      await signup(values.email, values.password, '');

      sendGTMevent({
        event: 'sign-up-flow',
        category: 'not invited',
        action: 'signup success',
      });

      onSignupSuccess(values.email, values.password);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Signup error:', error);
      sendGTMevent({
        event: 'sign-up-flow',
        category: 'not invited',
        action: 'signup error',
        content: error.message,
      });
      setFieldError('email', error.message || t('SIGNUP_ERROR_GENERIC'));
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues: SignupFormValues = {
    email: '',
    password: '',
  };

  return (
    <>
      <div style={{ marginBottom: appTheme.space.lg, textAlign: 'center' }}>
        <XL
          isBold
          style={{
            marginBottom: appTheme.space.xs,
            color: appTheme.palette.blue[600],
          }}
        >
          <Trans
            i18nKey="SIGNUP_FORM_STEP_1_TITLE"
            components={{ br: <br /> }}
          />
        </XL>
        <Paragraph style={{ color: appTheme.palette.grey[700] }}>
          <Trans
            i18nKey="SIGNUP_FORM_STEP_1_DESCRIPTION"
            components={{ bold: <Span isBold />, br: <br /> }}
          />
        </Paragraph>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={getSignupValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setTouched, validateForm }) => (
          <Form>
            <FieldContainer>
              <GoogleSignInButton />
              <AuthOrDivider />
              <Field name="email" validate={validateEmail}>
                {({ field, meta }: FieldProps) => {
                  const hasError = meta.touched && Boolean(meta.error);
                  return (
                    <FormField>
                      <Label>
                        {t('SIGNUP_FORM_EMAIL_LABEL')}
                        <Span style={{ color: appTheme.palette.red[600] }}>
                          *
                        </Span>
                      </Label>
                      <Input
                        type="email"
                        {...field}
                        placeholder={t('SIGNUP_FORM_EMAIL_PLACEHOLDER')}
                        {...(hasError && { validation: 'error' })}
                      />
                      {hasError && (
                        <Message
                          data-qa="signup-email-error"
                          validation="error"
                        >
                          {meta.error}
                        </Message>
                      )}
                    </FormField>
                  );
                }}
              </Field>

              {showPasswordStep && (
                <Field name="password">
                  {({ field, meta }: FieldProps) => {
                    const hasError = meta.touched && Boolean(meta.error);
                    return (
                      <FormField>
                        <Label>
                          {t('SIGNUP_FORM_PASSWORD_LABEL')}
                          <Span style={{ color: appTheme.palette.red[600] }}>
                            *
                          </Span>
                        </Label>
                        <MediaInput
                          type={inputType}
                          role="textbox"
                          title="Password"
                          end={
                            inputType === 'password' ? (
                              <EyeHide
                                style={{ cursor: 'pointer' }}
                                onClick={handleChangeInputType}
                                title={t('HIDE_PASSWORD')}
                              />
                            ) : (
                              <Eye
                                style={{ cursor: 'pointer' }}
                                onClick={handleChangeInputType}
                                title={t('SHOW_PASSWORD')}
                              />
                            )
                          }
                          {...field}
                          placeholder={t('SIGNUP_FORM_PASSWORD_PLACEHOLDER')}
                          {...(hasError && { validation: 'error' })}
                        />
                        <PasswordRequirements password={values.password} />
                        {hasError && (
                          <Message
                            data-qa="signup-password-error"
                            validation="error"
                          >
                            {meta.error}
                          </Message>
                        )}
                      </FormField>
                    );
                  }}
                </Field>
              )}

              {showPasswordStep ? (
                <Button
                  type="submit"
                  isPrimary
                  isAccent
                  isStretched
                  disabled={isSubmitting}
                  style={{ marginTop: appTheme.space.sm }}
                >
                  {isSubmitting ? t('LOADING') : t('SIGNUP_FORM_SUBMIT')}
                </Button>
              ) : (
                <Button
                  type="button"
                  isPrimary
                  isAccent
                  isStretched
                  disabled={isSubmitting}
                  data-qa="signup-continue-with-password"
                  onClick={async () => {
                    const formErrors = await validateForm();
                    await setTouched({ email: true }, false);
                    if (!formErrors.email) {
                      setShowPasswordStep(true);
                    }
                  }}
                  style={{ marginTop: appTheme.space.sm }}
                >
                  {t('__CONTINUE')}
                </Button>
              )}

              <div>
                <SM>
                  {t('__JOIN_FORM_ALREADY_HAVE_ACCOUNT_LABEL')}{' '}
                  <Anchor
                    href="/login"
                    style={{
                      color: appTheme.palette.blue[600],
                    }}
                  >
                    {t('__JOIN_FORM_SIGNIN_CTA')}
                  </Anchor>
                </SM>
              </div>
            </FieldContainer>
          </Form>
        )}
      </Formik>
    </>
  );
};
