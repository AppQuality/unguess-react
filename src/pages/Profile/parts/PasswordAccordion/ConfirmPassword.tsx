import {
  FormField,
  Label,
  Span,
  Input,
  Message,
} from '@appquality/unguess-design-system';
import { Field, FieldProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';

const ConfirmPassword = () => {
  const { t } = useTranslation();

  return (
    <Field name="confirmPassword">
      {({ field, meta }: FieldProps) => {
        const hasError = meta.touched && Boolean(meta.error);
        return (
          <FormField>
            <Label>
              {t('__PAGE_PROFILE_CONFIRM_PASSWORD_LABEL')}
              <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
            </Label>
            <Input
              type="text"
              {...field}
              placeholder={t('__PAGE_PROFILE_CONFIRM_PASSWORD_PLACEHOLDER')}
              {...(hasError && { validation: 'error' })}
            />
            {hasError && (
              <Message data-qa="profile-confirm-pass-error" validation="error">
                {meta.error}
              </Message>
            )}
          </FormField>
        );
      }}
    </Field>
  );
};
export default ConfirmPassword;
