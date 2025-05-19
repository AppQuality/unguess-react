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
import { JoinFormValues } from '../FormProvider';

export const Step2 = () => {
  const { setFieldValue, values, status } = useFormikContext<JoinFormValues>();
  const { t } = useTranslation();
  const goToNextStep = () => {
    setFieldValue('step', 3);
  };
  const goToPreviousStep = () => {
    setFieldValue('step', 1);
  };
  return (
    <div>
      <Field name="name">
        {({ field, form, meta }: FieldProps) => {
          const hasError = meta.touched && Boolean(meta.error);
          return (
            <FormField>
              <Label>
                {t('SIGNUP_FORM_NAME_LABEL')}
                <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              </Label>
              <Input
                type="text"
                disabled={status?.isInvited && values.name !== ''}
                {...field}
                placeholder={t('SIGNUP_FORM_NAME_PLACEHOLDER')}
                {...(hasError && { validation: 'error' })}
              />
              {hasError && <Message validation="error">{meta.error}</Message>}
            </FormField>
          );
        }}
      </Field>
      <Button onClick={goToPreviousStep}>
        {t('SIGNUP_FORM_RETURN_TO_STEP_1')}
      </Button>
      <Button onClick={goToNextStep}>{t('SIGNUP_FORM_GO_TO_STEP_3')}</Button>
    </div>
  );
};
