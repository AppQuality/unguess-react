import {
  FormField,
  Label,
  Span,
  Message,
  MediaInput,
} from '@appquality/unguess-design-system';
import { Field, FieldProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';

import { ReactComponent as Eye } from '@zendeskgarden/svg-icons/src/16/eye-fill.svg';
import { ReactComponent as EyeHide } from '@zendeskgarden/svg-icons/src/16/eye-hide-fill.svg';
import { useState } from 'react';

const NewPassword = () => {
  const { t } = useTranslation();

  const [inputType, setInputType] = useState('password');
  const handleChangeInputType = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <Field name="newPassword">
      {({ field, meta }: FieldProps) => {
        const hasError = meta.touched && Boolean(meta.error);
        return (
          <FormField style={{ marginBottom: appTheme.space.sm }}>
            <Label>
              {t('__PAGE_PROFILE_NEW_PASSWORD_LABEL')}
              <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
            </Label>

            <MediaInput
              type={inputType}
              role="textbox"
              title="New Password"
              placeholder={t('__PAGE_PROFILE_NEW_PASSWORD_PLACEHOLDER')}
              end={
                inputType === 'password' ? (
                  <EyeHide
                    style={{ cursor: 'pointer' }}
                    onClick={handleChangeInputType}
                    title={t('__PAGE_PROFILE_FORM_NEW_PASSWORD_SHOW')}
                  />
                ) : (
                  <Eye
                    style={{ cursor: 'pointer' }}
                    onClick={handleChangeInputType}
                    title={t('__PAGE_PROFILE_FORM_NEW_PASSWORD_HIDE')}
                  />
                )
              }
              {...field}
              {...(hasError && { validation: 'error' })}
            />
            {hasError && (
              <Message data-qa="profile-new-pass-error" validation="error">
                {meta.error}
              </Message>
            )}
          </FormField>
        );
      }}
    </Field>
  );
};
export default NewPassword;
