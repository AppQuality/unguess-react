import {
  Button,
  FormField,
  Input,
  Label,
  Message,
  Span,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';

export const Step1 = () => {
  const { setFieldValue, validateForm, setTouched } = useFormikContext();
  const { t } = useTranslation();
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
    <div role="tabpanel" title="Step 1">
      <h2>Step 1</h2>
      <p>This is the first step of the join process.</p>
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
              <Input
                type="password"
                role="textbox"
                title="Password"
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
      <div data-qa="password-requirements">
        You password must:
        <ul>
          <li>• Constain 6 characters minimum</li>
          <li>• One numeric digit</li>
          <li>• One upper case character</li>
          <li>• One lower case character</li>
        </ul>
      </div>
      <Button role="tab" onClick={goToNextStep}>
        {t('SIGNUP_FORM_GO_TO_STEP_2')}
      </Button>
    </div>
  );
};
