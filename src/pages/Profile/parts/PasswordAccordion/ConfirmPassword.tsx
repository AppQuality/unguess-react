import {
  FormField,
  Label,
  MediaInput,
  Message,
  Span,
} from '@appquality/unguess-design-system';

import { ReactComponent as Eye } from '@zendeskgarden/svg-icons/src/16/eye-fill.svg';
import { ReactComponent as EyeHide } from '@zendeskgarden/svg-icons/src/16/eye-hide-fill.svg';
import { Field, FieldProps } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';

const ConfirmPassword = () => {
  const { t } = useTranslation();

  const [inputType, setInputType] = useState('password');
  const handleChangeInputType = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };
  return (
    <Field name="confirmPassword">
      {({ field, meta }: FieldProps) => {
        const hasError = meta.touched && Boolean(meta.error);
        return (
          <FormField>
            <Label>
              {t('__PAGE_PROFILE_CONFIRM_PASSWORD_LABEL')}
              <Span style={{ color: appTheme.palette.red[600] }}> *</Span>
            </Label>

            <MediaInput
              type={inputType}
              role="textbox"
              placeholder={t('__PAGE_PROFILE_CONFIRM_PASSWORD_PLACEHOLDER')}
              end={
                inputType === 'password' ? (
                  <EyeHide
                    style={{ cursor: 'pointer' }}
                    onClick={handleChangeInputType}
                    title="show-confirm-password"
                  />
                ) : (
                  <Eye
                    style={{ cursor: 'pointer' }}
                    onClick={handleChangeInputType}
                    title="hide-confirm-password"
                  />
                )
              }
              {...field}
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
