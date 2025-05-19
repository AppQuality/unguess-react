import {
  Button,
  FormField,
  Input,
  Label,
  MD,
  Message,
  Span,
  theme,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';

export const Step1 = () => {
  const { setFieldValue } = useFormikContext();
  const { t } = useTranslation();
  const goToNextStep = () => {
    setFieldValue('step', 2);
  };
  return (
    <div role="tabpanel" title="Step 1" data-qa="step-1">
      <h2>Step 1</h2>
      <p>This is the first step of the join process.</p>
      <Field name="email">
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
              {hasError && <Message validation="error">{meta.error}</Message>}
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
              {hasError && <Message validation="error">{meta.error}</Message>}
            </FormField>
          );
        }}
      </Field>
      <Button role="tab" onClick={goToNextStep}>
        {t('SIGNUP_FORM_GO_TO_STEP_2')}
      </Button>
    </div>
  );
};
