import {
  Anchor,
  Button,
  FormField,
  Input,
  Label,
  MediaInput,
  Message,
  Paragraph,
  Span,
} from '@appquality/unguess-design-system';
import { ReactComponent as LinkIcon } from '@zendeskgarden/svg-icons/src/16/chevron-left-stroke.svg';
import { ReactComponent as Eye } from '@zendeskgarden/svg-icons/src/16/eye-fill.svg';
import { ReactComponent as EyeHide } from '@zendeskgarden/svg-icons/src/16/eye-hide-fill.svg';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { JoinFormValues } from '../valuesType';
import { ButtonContainer } from './ButtonContainer';
import { PasswordRequirements } from './PasswordRequirements';

export const Step1 = () => {
  const { setFieldValue, validateForm, setTouched, status, values } =
    useFormikContext<JoinFormValues>();
  const { t } = useTranslation();
  const [inputType, setInputType] = useState('password');
  const handleChangeInputType = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };
  const goToNextStep = async () => {
    await setTouched({
      email: true,
      password: true,
    });
    const errors = await validateForm();
    if (Object.keys(errors).length > 0) {
      return;
    }
    setFieldValue('step', 2);
  };

  const validateEmail = async (value: string) => {
    let error;
    if (status?.isInvited) return error;
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/users/by-email/${value}`,
      {
        method: 'HEAD',
      }
    );

    if (res.status === 200) error = t('SIGNUP_FORM_EMAIL_ALREADY_TAKEN');
    // If the request fails (404), the email is not taken
    else if (res.status === 404) error = undefined;
    else error = t('SIGNUP_FORM_EMAIL_ERROR_SERVER_MAIL_CHECK');

    return error;
  };

  return (
    <>
      <Field name="email" validate={validateEmail}>
        {({ field, meta }: FieldProps) => {
          const hasError = meta.touched && Boolean(meta.error);
          return (
            <FormField>
              <Label>
                {t('SIGNUP_FORM_EMAIL_LABEL')}
                <Span style={{ color: appTheme.palette.red[600] }}> *</Span>
              </Label>
              <Input
                disabled={status?.isInvited && values.email !== ''}
                type="email"
                role="textbox"
                title="Email"
                {...field}
                placeholder={t('SIGNUP_FORM_EMAIL_PLACEHOLDER')}
                {...(hasError && { validation: 'error' })}
              />
              {hasError && (
                <Message data-qa="message-error-email" validation="error">
                  {meta.error}
                </Message>
              )}
            </FormField>
          );
        }}
      </Field>

      <Field name="password">
        {({ field, meta }: FieldProps) => {
          const hasError = meta.touched && Boolean(meta.error);
          return (
            <FormField>
              <Label>
                {t('SIGNUP_FORM_PASSWORD_LABEL')}
                <Span style={{ color: appTheme.palette.red[600] }}> *</Span>
              </Label>
              <MediaInput
                type={inputType}
                role="textbox"
                title="Password"
                end={
                  inputType === 'password' ? (
                    <Eye
                      style={{ cursor: 'pointer' }}
                      onClick={handleChangeInputType}
                      title={t('SIGNUP_FORM_PASSWORD_SHOW')}
                    />
                  ) : (
                    <EyeHide
                      style={{ cursor: 'pointer' }}
                      onClick={handleChangeInputType}
                      title={t('SIGNUP_FORM_PASSWORD_HIDE')}
                    />
                  )
                }
                {...field}
                placeholder={t('SIGNUP_FORM_PASSWORD_PLACEHOLDER')}
                {...(hasError && { validation: 'error' })}
              />
              {hasError && (
                <Message data-qa="message-error-password" validation="error">
                  {meta.error}
                </Message>
              )}
            </FormField>
          );
        }}
      </Field>
      <PasswordRequirements />
      <ButtonContainer style={{ marginBottom: appTheme.space.xl }}>
        <Button onClick={goToNextStep} isAccent isPrimary isStretched>
          {t('SIGNUP_FORM_GO_TO_STEP_2')}
        </Button>
      </ButtonContainer>
      <Paragraph>
        <Trans
          i18nKey="SIGNUP_FORM_TERMS_AND_CONDITIONS"
          components={{
            'terms-link': (
              <Anchor
                style={{
                  fontStyle: 'italic',
                  color: appTheme.palette.azure[600],
                }}
                href="https://unguess.io/terms-and-conditions/"
                target="_blank"
                title="Terms and Conditions"
              />
            ),
          }}
        />
      </Paragraph>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: appTheme.space.xs,
        }}
      >
        <LinkIcon color={appTheme.palette.grey[600]} />
        <Anchor
          style={{ color: appTheme.palette.blue[600] }}
          target="_blank"
          title="UNGUESS Home Page"
          href="https://www.unguess.io"
        >
          {t('SIGNUP_FORM_CTA_RETURN_TO_UNGUESS_LANDING')}
        </Anchor>
      </div>
    </>
  );
};
