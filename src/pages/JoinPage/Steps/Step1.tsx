import {
  Anchor,
  Button,
  FormField,
  Input,
  Label,
  MediaInput,
  Message,
  Paragraph,
  Span,
} from '@appquality/unguess-design-system';
import { ReactComponent as LinkIcon } from '@zendeskgarden/svg-icons/src/16/chevron-left-stroke.svg';
import { ReactComponent as Eye } from '@zendeskgarden/svg-icons/src/16/eye-fill.svg';
import { ReactComponent as EyeHide } from '@zendeskgarden/svg-icons/src/16/eye-hide-fill.svg';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { PasswordRequirements } from 'src/common/components/PasswordRequirements';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { JoinFormValues } from '../valuesType';
import { ButtonContainer } from './ButtonContainer';

export const Step1 = () => {
  const { setFieldValue, validateForm, setTouched, status, values } =
    useFormikContext<JoinFormValues>();
  const sendGTMevent = useSendGTMevent({ loggedUser: false });
  const { t } = useTranslation();
  const [inputType, setInputType] = useState('password');
  const handleChangeInputType = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  useEffect(() => {
    sendGTMevent({
      event: 'sign-up-flow',
      category: `is invited: ${status?.isInvited}`,
      content: 'step 1 rendered',
    });
    sendGTMevent({
      event: 'sign-up-flow',
      category: `is invited: ${status?.isInvited}`,
      action: 'start',
    });
  }, []);

  const goToNextStep = async () => {
    await setTouched({
      email: true,
      password: true,
    });
    const errors = await validateForm();
    if (Object.keys(errors).length > 0) {
      sendGTMevent({
        event: 'sign-up-flow',
        category: `is invited: ${status?.isInvited}`,
        action: 'step 1 validation error',
        content: `error count: ${Object.keys(errors).length}`,
      });
      return;
    }
    setFieldValue('step', 2);
  };

  const validateEmail = async (value: string) => {
    let error;
    let error_event;
    if (status?.isInvited) return error;
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/users/by-email/${value}`,
      {
        method: 'HEAD',
      }
    );

    if (res.status === 200) {
      error = t('SIGNUP_FORM_EMAIL_ALREADY_TAKEN');
      error_event = 'SIGNUP_FORM_EMAIL_ALREADY_TAKEN';
    } else if (res.status === 404) {
      error = undefined;
      error_event = 'no error';
    } else {
      error = t('SIGNUP_FORM_EMAIL_ERROR_SERVER_MAIL_CHECK');
      error_event = 'SIGNUP_FORM_EMAIL_ERROR_SERVER_MAIL_CHECK';
    }
    sendGTMevent({
      event: 'sign-up-flow',
      category: 'not set',
      action: 'validate email',
      content: `error: ${error_event}`,
      target: `is invited: ${status?.isInvited}`,
    });
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
                    <EyeHide
                      style={{ cursor: 'pointer' }}
                      onClick={handleChangeInputType}
                      title={t('SIGNUP_FORM_PASSWORD_SHOW')}
                    />
                  ) : (
                    <Eye
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
      <PasswordRequirements password={values.password} />
      <ButtonContainer style={{ marginBottom: appTheme.space.sm }}>
        <Button onClick={goToNextStep} isAccent isPrimary isStretched>
          {t('SIGNUP_FORM_GO_TO_STEP_2')}
        </Button>
      </ButtonContainer>
      <Paragraph>
        <Trans
          i18nKey="SIGNUP_FORM_TERMS_AND_CONDITIONS"
          components={{
            'terms-link': (
              <Anchor
                style={{
                  fontStyle: 'italic',
                  color: appTheme.palette.azure[600],
                }}
                href="https://unguess.io/terms-and-conditions/"
                target="_blank"
                title="Terms and Conditions"
              />
            ),
            'privacy-link': (
              <Anchor
                style={{
                  fontStyle: 'italic',
                  color: appTheme.palette.azure[600],
                }}
                href="https://unguess.io/privacy-policy/"
                target="_blank"
                title="Privacy Policy"
              />
            ),
          }}
        />
      </Paragraph>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: appTheme.space.xs,
        }}
      >
        <LinkIcon color={appTheme.palette.grey[600]} />
        <Anchor
          style={{ color: appTheme.palette.blue[600] }}
          target="_blank"
          title="UNGUESS Home Page"
          href="https://www.unguess.io"
        >
          {t('SIGNUP_FORM_CTA_RETURN_TO_UNGUESS_LANDING')}
        </Anchor>
      </div>
    </>
  );
};
