import { useToast, Notification } from '@appquality/unguess-design-system';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { usePatchUsersMeMutation } from 'src/features/api';
import * as Yup from 'yup';
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

  if (isLoading) return <>Loading...</>;

  const schema = Yup.object().shape({
    newPassword: Yup.string().required(
      t('__PROFILE_PAGE_NEW_PASSWORD_REQUIRED_ERROR')
    ),
    currentPassword: Yup.string().required(
      t('__PROFILE_PAGE_CURRENT_PASSWORD_REQUIRED_ERROR')
    ),
    confirmPassword: Yup.string().required(
      t('__PROFILE_PAGE_CONFIRM_PASSWORD_REQUIRED_ERROR')
    ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      validateOnChange
      onSubmit={async (values, actions) => {
        if (values) {
          actions.setSubmitting(true);

          await updateProfile({
            body: {
              password: {
                current: values.currentPassword,
                new: values.newPassword,
              },
            },
          })
            .unwrap()
            .then((res) => {
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
            })
            .catch((error) => {
              if (error.status === 417) {
                alert('Invalid current password');
              } else alert('An error occurred while updating the password');
            });

          actions.setSubmitting(false);
        }
      }}
    >
      <PasswordAccordion />
    </Formik>
  );
};
