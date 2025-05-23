import {
  Button,
  FormField,
  Input,
  MediaInput,
  Label,
  Message,
  Span,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as Eye } from '@zendeskgarden/svg-icons/src/16/eye-fill.svg';
import { ReactComponent as EyeHide } from '@zendeskgarden/svg-icons/src/16/eye-hide-fill.svg';
import { useState } from 'react';
import { JoinFormValues } from '../valuesType';
import { PasswordRequirements } from './PasswordRequirements';
import { ButtonContainer } from './ButtonContainer';

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
      console.log(errors);
      return;
    }
    setFieldValue('step', 2);
  };

  const validateEmail = async (value: string) => {
    let error;
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
      <ButtonContainer>
        <Button
          role="tab"
          onClick={goToNextStep}
          isAccent
          isPrimary
          isStretched
        >
          {t('SIGNUP_FORM_GO_TO_STEP_2')}
        </Button>
      </ButtonContainer>
    </>
  );
};
