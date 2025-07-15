import {
  Anchor,
  Label,
  Span,
  MediaInput,
  Message,
  Button,
  TextLabel,
  MD,
} from '@appquality/unguess-design-system';
import { Field, FieldProps } from 'formik';
import { ReactComponent as Eye } from '@zendeskgarden/svg-icons/src/16/eye-fill.svg';
import { ReactComponent as EyeHide } from '@zendeskgarden/svg-icons/src/16/eye-hide-fill.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { isDev } from 'src/common/isDevEnvironment';
import { ProfileField } from '../common';

const CurrentPassword = () => {
  const { t } = useTranslation();

  const [inputType, setInputType] = useState('password');
  const handleChangeInputType = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <>
      <Field name="currentPassword">
        {({ field, meta }: FieldProps) => {
          const hasError = meta.touched && Boolean(meta.error);
          return (
            <ProfileField>
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
                      title={t('__PAGE_PROFILE_FORM_CURRENT_PASSWORD_SHOW')}
                    />
                  ) : (
                    <Eye
                      style={{ cursor: 'pointer' }}
                      onClick={handleChangeInputType}
                      title={t('__PAGE_PROFILE_FORM_CURRENT_PASSWORD_HIDE')}
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
            </ProfileField>
          );
        }}
      </Field>
      <Anchor
        href={`${window.location.origin}/wp-login.php?action=lostpassword`}
        isExternal
        externalIconLabel={t('__PAGE_PROFILE_FORGOT_PASSWORD')}
        style={{ color: appTheme.palette.grey[600] }}
      >
        {t('__PAGE_PROFILE_FORGOT_PASSWORD')}
      </Anchor>
    </>
  );
};
export default CurrentPassword;
