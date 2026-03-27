import { Notification, useToast } from '@appquality/unguess-design-system';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import WPAPI from 'src/common/wpapi';
import { useGetUsersMeQuery, usePatchUsersMeMutation } from 'src/features/api';
import { updatePassword } from 'aws-amplify/auth';
import * as Yup from 'yup';
import { Loader } from './parts/cardLoader';
import { PasswordAccordion } from './parts/PasswordAccordion';
import { useProfileData } from './useProfileData';
import { PasswordFormValues } from './valuesType';

export const FormPassword = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { isLoading } = useProfileData();
  const { data: userData } = useGetUsersMeQuery();
  const [updateProfile] = usePatchUsersMeMutation();

  const initialValues: PasswordFormValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  if (isLoading) return <Loader />;

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .min(12, t('SIGNUP_FORM_PASSWORD_MUST_BE_AT_LEAST_12_CHARACTER_LONG'))
      .matches(
        /[0-9]/,
        t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_NUMBER')
      )
      .matches(
        /[A-Z]/,
        t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_AN_UPPERCASE_LETTER')
      )
      .matches(
        /[a-z]/,
        t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_LOWERCASE_LETTER')
      )
      .required(t('__PROFILE_PAGE_NEW_PASSWORD_REQUIRED_ERROR')),
    currentPassword: Yup.string().required(
      t('__PROFILE_PAGE_NEW_PASSWORD_REQUIRED_ERROR')
    ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      t('__PROFILE_PAGE_CONFIRM_PASSWORD_MUST_MATCH_NEW_PASSWORD')
    ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      validateOnChange
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        try {
          const isCognitoUser = userData?.authType === 'cognito';

          if (isCognitoUser) {
            await updatePassword({
              oldPassword: values.currentPassword,
              newPassword: values.newPassword,
            });
          } else {
            // Utente legacy: verifica password con WP e poi cambia su Cognito
            await updateProfile({
              body: {
                password: {
                  current: values.currentPassword,
                  new: values.newPassword,
                },
              },
            }).unwrap();
            await WPAPI.destroyOtherSessions();
          }

          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="success"
                message={t('__PROFILE_PAGE_TOAST_SUCCESS_PASSWORD_UPDATED')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
        } catch (e: any) {
          // eslint-disable-next-line no-console
          console.error('Password update error:', e);

          // Gestione errori specifici
          let isInvalidPasswordError = false;

          // Errore API backend
          if (e?.status === 417) {
            isInvalidPasswordError = true;
          }

          // Errore Cognito password errata
          if (e?.name === 'NotAuthorizedException') {
            isInvalidPasswordError = true;
          }

          // WP login failed - l'errore è un JSON stringificato
          if (e?.message && typeof e.message === 'string') {
            try {
              const errorData = JSON.parse(e.message);
              if (errorData.type === 'invalid') {
                isInvalidPasswordError = true;
              }
            } catch {
              // Se non è un JSON valido, controlla se contiene 'invalid'
              if (e.message.includes('invalid')) {
                isInvalidPasswordError = true;
              }
            }
          }

          if (isInvalidPasswordError) {
            addToast(
              ({ close }) => (
                <Notification
                  onClose={close}
                  type="error"
                  message={t(
                    '__PROFILE_PAGE_TOAST_ERROR_INVALID_CURRENT_PASSWORD'
                  )}
                  isPrimary
                />
              ),
              { placement: 'top' }
            );
          } else {
            addToast(
              ({ close }) => (
                <Notification
                  onClose={close}
                  type="error"
                  message={t('__PROFILE_PAGE_TOAST_ERROR_UPDATING_PASSWORD')}
                  isPrimary
                />
              ),
              { placement: 'top' }
            );
          }
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      <PasswordAccordion />
    </Formik>
  );
};
