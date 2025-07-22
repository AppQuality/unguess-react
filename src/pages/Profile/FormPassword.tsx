import { Notification, useToast } from '@appquality/unguess-design-system';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import WPAPI from 'src/common/wpapi';
import { usePatchUsersMeMutation } from 'src/features/api';
import * as Yup from 'yup';
import { Loader } from './parts/cardLoader';
import { PasswordAccordion } from './parts/PasswordAccordion';
import { useProfileData } from './useProfileData';
import { PasswordFormValues } from './valuesType';

export const FormPassword = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { data, isLoading } = useProfileData();
  const [updateProfile] = usePatchUsersMeMutation();

  const initialValues: PasswordFormValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  if (isLoading) return <Loader />;

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, t('SIGNUP_FORM_PASSWORD_MUST_BE_AT_LEAST_6_CHARACTER_LONG'))
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
          await updateProfile({
            body: {
              password: {
                current: values.currentPassword,
                new: values.newPassword,
              },
            },
          })
            .unwrap()
            .then(() => {
              WPAPI.destroyOtherSessions();
            });

          const nonce = await WPAPI.getNonce();
          await WPAPI.login({
            username: data?.email || '',
            password: values.newPassword,
            security: nonce,
          });

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
        } catch (e) {
          const error = e as { status: number; data: { message: string } };
          if (error.status === 417) {
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
