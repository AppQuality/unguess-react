import {
  Anchor,
  Button,
  Checkbox,
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { PasswordRequirements } from 'src/common/components/PasswordRequirements';
import { useAuth } from 'src/features/auth/context';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import styled from 'styled-components';
import {
  GetInvitesByProfileAndTokenApiResponse,
  unguessApi,
} from 'src/features/api';
import { useAppDispatch } from 'src/app/hooks';
import { getSetPasswordValidationSchema } from './validationSchema';

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`;

interface SetPasswordFormValues {
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
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
  const { signup, login, setNewPassword, changePassword } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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

      // Uso la password permanente per autenticare l'utente
      if (inviteData?.code) {
        // 1. Login con password permanente
        const loginResult = await login(email, inviteData.code);

        // Se il login è riuscito direttamente (utente già confermato)
        if (loginResult.isSignedIn) {
          // 2. Cambia la password dalla password permanente a quella scelta dall'utente
          await changePassword(inviteData.code, values.password);

          sendGTMevent({
            event: 'sign-up-flow',
            category: 'invited',
            action: 'password-changed-completed',
          });

          sessionStorage.setItem('inviteProfileId', profileId.toString());
          sessionStorage.setItem('inviteToken', token);
          await dispatch(unguessApi.util.invalidateTags(['Users']));
          const queryString = searchParams.toString();
          navigate(`/join/onboarding${queryString ? `?${queryString}` : ''}`);

          return;
        }

        if (loginResult.requiresNewPassword) {
          await setNewPassword(values.password);

          sendGTMevent({
            event: 'sign-up-flow',
            category: 'invited',
            action: 'password-changed-completed',
          });

          sessionStorage.setItem('inviteProfileId', profileId.toString());
          sessionStorage.setItem('inviteToken', token);
          await dispatch(unguessApi.util.invalidateTags(['Users']));
          const queryString = searchParams.toString();
          navigate(`/join/onboarding${queryString ? `?${queryString}` : ''}`);

          return;
        }

        throw new Error(
          `Unexpected sign-in result: ${JSON.stringify(loginResult)}`
        );
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

        await dispatch(unguessApi.util.invalidateTags(['Users']));
        const queryString = searchParams.toString();
        navigate(`/join/onboarding${queryString ? `?${queryString}` : ''}`);
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
    termsAccepted: false,
    privacyAccepted: false,
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

              <Field name="termsAccepted">
                {({ field, form, meta }: FieldProps) => {
                  const hasError = meta.touched && Boolean(meta.error);
                  return (
                    <FormField data-qa="terms-and-conditions">
                      <Checkbox
                        checked={field.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          form.setFieldValue('termsAccepted', e.target.checked)
                        }
                        onBlur={field.onBlur}
                        name={field.name}
                      >
                        <Label>
                          <SM style={{ fontStyle: 'italic' }}>
                            <Trans
                              i18nKey="SIGNUP_FORM_TERMS_CHECKBOX"
                              components={{
                                'terms-link': (
                                  <Anchor
                                    isExternal
                                    href="https://unguess.io/terms-and-conditions/"
                                    target="_blank"
                                    title="Terms and Conditions of Service"
                                    style={{ fontWeight: 600 }}
                                  />
                                ),
                              }}
                            />
                          </SM>
                        </Label>
                      </Checkbox>
                      {hasError && (
                        <Message validation="error">
                          {t(meta.error as string)}
                        </Message>
                      )}
                    </FormField>
                  );
                }}
              </Field>

              <Field name="privacyAccepted">
                {({ field, form, meta }: FieldProps) => {
                  const hasError = meta.touched && Boolean(meta.error);
                  return (
                    <FormField data-qa="privacy-policy">
                      <Checkbox
                        checked={field.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          form.setFieldValue(
                            'privacyAccepted',
                            e.target.checked
                          )
                        }
                        onBlur={field.onBlur}
                        name={field.name}
                      >
                        <Label>
                          <SM style={{ fontStyle: 'italic' }}>
                            <Trans
                              i18nKey="SIGNUP_FORM_PRIVACY_CHECKBOX"
                              components={{
                                'privacy-link': (
                                  <Anchor
                                    isExternal
                                    href="https://unguess.io/privacy-policy/"
                                    target="_blank"
                                    title="Privacy Policy"
                                    style={{ fontWeight: 600 }}
                                  />
                                ),
                              }}
                            />
                          </SM>
                        </Label>
                      </Checkbox>
                      {hasError && (
                        <Message validation="error">
                          {t(meta.error as string)}
                        </Message>
                      )}
                    </FormField>
                  );
                }}
              </Field>

              <Button
                type="submit"
                isPrimary
                isAccent
                disabled={
                  isSubmitting ||
                  !values.termsAccepted ||
                  !values.privacyAccepted
                }
              >
                {isSubmitting ? t('LOADING') : t('SET_PASSWORD_BUTTON')}
              </Button>
            </FieldContainer>
          </Form>
        )}
      </Formik>
    </>
  );
};
