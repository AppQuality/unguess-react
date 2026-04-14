import {
  Button,
  FormField,
  Input,
  Label,
  MediaInput,
  Message,
  Paragraph,
  Span,
  XL,
} from '@appquality/unguess-design-system';
import { ReactComponent as Eye } from '@zendeskgarden/svg-icons/src/16/eye-fill.svg';
import { ReactComponent as EyeHide } from '@zendeskgarden/svg-icons/src/16/eye-hide-fill.svg';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { PasswordRequirements } from 'src/common/components/PasswordRequirements';
import { useAuth } from 'src/features/auth/context';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import styled from 'styled-components';
import { GetInvitesByProfileAndTokenApiResponse } from 'src/features/api';
import { getSetPasswordValidationSchema } from './validationSchema';

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`;

interface SetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

interface SetPasswordFormProps {
  inviteData: GetInvitesByProfileAndTokenApiResponse; // TODO: tipizzare con il tipo corretto dall'API
  profileId: number;
  token: string;
}

export const SetPasswordForm = ({
  inviteData,
  profileId,
  token,
}: SetPasswordFormProps) => {
  const { t } = useTranslation();
  const { signup, login, setNewPassword } = useAuth();
  const navigate = useNavigate();
  const sendGTMevent = useSendGTMevent({ loggedUser: false });
  const [passwordInputType, setPasswordInputType] = useState('password');
  const [confirmPasswordInputType, setConfirmPasswordInputType] =
    useState('password');

  const handleChangePasswordInputType = () => {
    setPasswordInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const handleChangeConfirmPasswordInputType = () => {
    setConfirmPasswordInputType((prev) =>
      prev === 'password' ? 'text' : 'password'
    );
  };

  const handleSubmit = async (
    values: SetPasswordFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<SetPasswordFormValues>
  ) => {
    try {
      sendGTMevent({
        event: 'sign-up-flow',
        category: 'invited',
        action: 'set-password-start',
      });

      const email = inviteData?.email;
      if (!email) {
        throw new Error('Email not found in invite data');
      }

      // Uso la temp password per autenticare l'utente
      if (inviteData?.code) {
        // 1. Login con password temporanea
        const loginResult = await login(email, inviteData.code);

        // 2. Se richiede cambio password, imposta la nuova
        if (loginResult.requiresNewPassword) {
          await setNewPassword(values.password);

          sendGTMevent({
            event: 'sign-up-flow',
            category: 'invited',
            action: 'password-changed-completed',
          });
        }

        // 3. L'utente è ora loggato, salva i dati dell'invito e vai all'onboarding
        sessionStorage.setItem('inviteProfileId', profileId.toString());
        sessionStorage.setItem('inviteToken', token);
        navigate('/join/onboarding');

        return;
      }

      // VECCHIO FLUSSO (backward compatibility): Signup tradizionale
      await signup(email, values.password, inviteData?.name || email);

      sendGTMevent({
        event: 'sign-up-flow',
        category: 'invited',
        action: 'signup-completed',
      });

      // Login immediato dopo signup
      try {
        await login(email, values.password);
        sendGTMevent({
          event: 'sign-up-flow',
          category: 'invited',
          action: 'auto-login-completed',
        });

        // Salva profileId e token in sessionStorage per l'onboarding
        sessionStorage.setItem('inviteProfileId', profileId.toString());
        sessionStorage.setItem('inviteToken', token);

        // Redirect all'onboarding già loggato
        navigate('/join/onboarding');
      } catch (loginError: any) {
        // Se il login fallisce perché serve conferma email
        if (loginError.message?.includes('User is not confirmed')) {
          // Redirect a una pagina di conferma email per invitati
          // TODO: implementare ConfirmEmailForm per invitati
          setFieldError(
            'password',
            t('INVITED_USER_EMAIL_CONFIRMATION_REQUIRED')
          );
        } else {
          throw loginError;
        }
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Set password error:', error);
      sendGTMevent({
        event: 'sign-up-flow',
        category: 'invited',
        action: 'set-password-error',
        content: error.message,
      });
      setFieldError(
        'password',
        error.message || t('SET_PASSWORD_ERROR_GENERIC')
      );
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues: SetPasswordFormValues = {
    password: '',
    confirmPassword: '',
  };

  return (
    <>
      <div style={{ marginBottom: appTheme.space.md }}>
        <XL
          isBold
          style={{ textAlign: 'center', marginBottom: appTheme.space.md }}
        >
          {t('INVITED_USER_TITLE')}
        </XL>

        <Paragraph>
          <FormField>
            <Label>
              {t('SIGNUP_FORM_EMAIL_LABEL')}
              <Span style={{ color: appTheme.palette.red[600] }}> *</Span>
            </Label>
            <Input
              disabled
              type="email"
              role="textbox"
              title="Email"
              value={inviteData?.email || ''}
            />
          </FormField>
        </Paragraph>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={getSetPasswordValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <FieldContainer>
              <Field name="password">
                {({ field, meta }: FieldProps) => {
                  const hasError = meta.touched && Boolean(meta.error);
                  return (
                    <FormField>
                      <Label>
                        {t('SET_PASSWORD_LABEL')}
                        <Span style={{ color: appTheme.palette.red[600] }}>
                          *
                        </Span>
                      </Label>
                      <MediaInput
                        type={passwordInputType}
                        role="textbox"
                        title="Password"
                        end={
                          passwordInputType === 'password' ? (
                            <EyeHide
                              style={{ cursor: 'pointer' }}
                              onClick={handleChangePasswordInputType}
                              title={t('HIDE_PASSWORD')}
                            />
                          ) : (
                            <Eye
                              style={{ cursor: 'pointer' }}
                              onClick={handleChangePasswordInputType}
                              title={t('SHOW_PASSWORD')}
                            />
                          )
                        }
                        {...field}
                        placeholder={t('SET_PASSWORD_PLACEHOLDER')}
                        {...(hasError && { validation: 'error' })}
                      />
                      <PasswordRequirements password={values.password} />
                      {hasError && (
                        <Message
                          data-qa="set-password-error"
                          validation="error"
                        >
                          {t(meta.error as string)}
                        </Message>
                      )}
                    </FormField>
                  );
                }}
              </Field>

              <Field name="confirmPassword">
                {({ field, meta }: FieldProps) => {
                  const hasError = meta.touched && Boolean(meta.error);
                  return (
                    <FormField>
                      <Label>
                        {t('CONFIRM_PASSWORD_LABEL')}
                        <Span style={{ color: appTheme.palette.red[600] }}>
                          *
                        </Span>
                      </Label>
                      <MediaInput
                        type={confirmPasswordInputType}
                        role="textbox"
                        title="Confirm Password"
                        end={
                          confirmPasswordInputType === 'password' ? (
                            <EyeHide
                              style={{ cursor: 'pointer' }}
                              onClick={handleChangeConfirmPasswordInputType}
                              title={t('HIDE_PASSWORD')}
                            />
                          ) : (
                            <Eye
                              style={{ cursor: 'pointer' }}
                              onClick={handleChangeConfirmPasswordInputType}
                              title={t('SHOW_PASSWORD')}
                            />
                          )
                        }
                        {...field}
                        placeholder={t('CONFIRM_PASSWORD_PLACEHOLDER')}
                        {...(hasError && { validation: 'error' })}
                      />
                      {hasError && (
                        <Message
                          data-qa="confirm-password-error"
                          validation="error"
                        >
                          {t(meta.error as string)}
                        </Message>
                      )}
                    </FormField>
                  );
                }}
              </Field>

              <Button type="submit" isPrimary isAccent disabled={isSubmitting}>
                {isSubmitting ? t('LOADING') : t('SET_PASSWORD_BUTTON')}
              </Button>
            </FieldContainer>
          </Form>
        )}
      </Formik>
    </>
  );
};
