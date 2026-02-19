import {
  Button,
  FormField,
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
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { PasswordRequirements } from 'src/common/components/PasswordRequirements';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import styled from 'styled-components';
import { setPasswordValidationSchema } from './validationSchema';

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
  inviteData: any; // TODO: tipizzare con il tipo corretto dall'API
}

export const SetPasswordForm = ({ inviteData }: SetPasswordFormProps) => {
  const { t } = useTranslation();
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

      // TODO: Implementare cambio password con Cognito
      // await changePasswordWithCognito(inviteData.email, values.password);

      sendGTMevent({
        event: 'sign-up-flow',
        category: 'invited',
        action: 'set-password-success',
      });

      // Redirect all'onboarding
      navigate('/join/onboarding');
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
      <div style={{ marginBottom: appTheme.space.lg, textAlign: 'center' }}>
        <XL isBold style={{ marginBottom: appTheme.space.xs }}>
          {t('INVITED_USER_TITLE')}
        </XL>
        <Paragraph>
          <Trans
            i18nKey="INVITED_USER_DESCRIPTION"
            values={{ email: inviteData?.email }}
            components={{ bold: <Span isBold /> }}
          />
        </Paragraph>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={setPasswordValidationSchema}
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
