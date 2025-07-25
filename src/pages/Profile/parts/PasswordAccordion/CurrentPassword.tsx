import {
  Anchor,
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
import { FieldExtraContent } from '../common';

const CurrentPassword = () => {
  const { t } = useTranslation();

  const [inputType, setInputType] = useState('password');
  const handleChangeInputType = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div>
      <Field name="currentPassword">
        {({ field, meta }: FieldProps) => {
          const hasError = meta.touched && Boolean(meta.error);
          return (
            <FormField>
              <Label>
                {t('__PAGE_PROFILE_CURRENT_PASSWORD_LABEL')}
                <Span style={{ color: appTheme.palette.red[600] }}> *</Span>
              </Label>

              <MediaInput
                type={inputType}
                role="textbox"
                title="Current Password"
                end={
                  inputType === 'password' ? (
                    <EyeHide
                      style={{ cursor: 'pointer' }}
                      onClick={handleChangeInputType}
                      title="hide-current-password"
                    />
                  ) : (
                    <Eye
                      style={{ cursor: 'pointer' }}
                      onClick={handleChangeInputType}
                      title="show-current-password"
                    />
                  )
                }
                {...field}
                placeholder={t('__PAGE_PROFILE_CURRENT_PASSWORD_PLACEHOLDER')}
                {...(hasError && { validation: 'error' })}
              />

              {hasError && (
                <Message
                  data-qa="message-error-current-password"
                  validation="error"
                >
                  {meta.error}
                </Message>
              )}
            </FormField>
          );
        }}
      </Field>
      <FieldExtraContent>
        <Anchor
          href={`${window.location.origin}/wp-login.php?action=lostpassword`}
          isExternal
          externalIconLabel={t('__PAGE_PROFILE_FORGOT_PASSWORD')}
          style={{ color: appTheme.palette.grey[600] }}
        >
          {t('__PAGE_PROFILE_FORGOT_PASSWORD')}
        </Anchor>
      </FieldExtraContent>
    </div>
  );
};
export default CurrentPassword;
