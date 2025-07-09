import { Formik, useFormikContext } from 'formik';
import { usePatchUsersMeMutation } from 'src/features/api';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { PasswordFormValues } from './valuesType';
import { useProfileData } from './useProfileData';
import { PasswordAccordion } from './parts/PasswordAccordion';

export const FormPassword = () => {
  const { t } = useTranslation();
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
              alert('ok');
            })
            .catch((error) => {
              alert('ko');
            });

          actions.setSubmitting(false);
        }
      }}
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      validateOnChange
    >
      <PasswordAccordion />
    </Formik>
  );
};
