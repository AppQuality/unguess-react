import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { usePatchUsersMeMutation } from 'src/features/api';
import * as Yup from 'yup';
import { ProfileCard } from './parts/ProfileCard';
import { useProfileData } from './useProfileData';
import { ProfileFormValues } from './valuesType';

export const FormProfile = () => {
  const { t } = useTranslation();
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
            .then((res) => {
              alert('ok');
            })
            .catch((error) => {
              alert('ko');
            });

          actions.setSubmitting(false);
        }
      }}
    >
      <ProfileCard />
    </Formik>
  );
};
