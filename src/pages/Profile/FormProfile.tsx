import { useToast, Notification } from '@appquality/unguess-design-system';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { usePatchUsersMeMutation } from 'src/features/api';
import * as Yup from 'yup';
import { ProfileCard } from './parts/ProfileCard';
import { useProfileData } from './useProfileData';
import { ProfileFormValues } from './valuesType';

export const FormProfile = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { data, isLoading } = useProfileData();
  const [updateProfile] = usePatchUsersMeMutation();

  const initialValues: ProfileFormValues = {
    role: data?.role || '',
    roleId: data?.roleId || 0,
    name: data?.name || '',
    surname: data?.surname || '',
    email: data?.email || '',
  };

  if (isLoading) return <>Loading...</>;

  const schema = Yup.object().shape({
    name: Yup.string().required(t('__PROFILE_PAGE_NAME_REQUIRED_ERROR')),
    surname: Yup.string().required(t('__PROFILE_PAGE_SURNAME_REQUIRED_ERROR')),
    roleId: Yup.number()
      .min(1, t('__PROFILE_PAGE_ROLE_REQUIRED_ERROR'))
      .required(t('__PROFILE_PAGE_ROLE_REQUIRED_ERROR')),
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
              name: values.name,
              surname: values.surname,
              roleId: values.roleId,
            },
          })
            .unwrap()
            .then(() => {
              addToast(
                ({ close }) => (
                  <Notification
                    onClose={close}
                    type="success"
                    message={t('__PROFILE_PAGE_UPDATE_SUCCESS')}
                    isPrimary
                  />
                ),
                { placement: 'top' }
              );
            })
            .catch(() => {
              addToast(
                ({ close }) => (
                  <Notification
                    onClose={close}
                    type="error"
                    message={t('__PROFILE_PAGE_TOAST_ERROR_UPDATING_PROFILE')}
                    isPrimary
                  />
                ),
                { placement: 'top' }
              );
            });

          actions.setSubmitting(false);
        }
      }}
    >
      <ProfileCard />
    </Formik>
  );
};
