import {
  FormField,
  Label,
  Span,
  MediaInput,
  Message,
  Button,
} from '@appquality/unguess-design-system';
import { Field, FieldProps } from 'formik';
import { ReactComponent as Eye } from '@zendeskgarden/svg-icons/src/16/eye-fill.svg';
import { ReactComponent as EyeHide } from '@zendeskgarden/svg-icons/src/16/eye-hide-fill.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { isDev } from 'src/common/isDevEnvironment';

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
            </FormField>
          );
        }}
      </Field>
      <div>
        <Button
          style={{
            marginTop: appTheme.space.sm,
            marginRight: 0,
            color: appTheme.palette.grey[600],
          }}
          isLink
          className="header-integration-center"
          onClick={() => {
            window.location.href = `https://${
              isDev() ? 'dev' : 'app'
            }.unguess.io/wp-login.php?action=lostpassword`;
          }}
        >
          <div>Forgot password?</div>
        </Button>
      </div>
    </>
  );
};
export default CurrentPassword;
