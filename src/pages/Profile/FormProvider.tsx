import { Formik, FormikHelpers } from 'formik';
import { useGetUsersMeQuery, usePatchUsersMeMutation } from 'src/features/api';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { ProfileFormValues } from './valuesType';
import { useProfileData } from './useProfileData';

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
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

  const onSubmit = async (
    values: ProfileFormValues,
    actions: FormikHelpers<ProfileFormValues>
  ) => {
    const { setSubmitting } = actions;

    if (values) {
      setSubmitting(true);

      try {
        await updateProfile({
          body: {
            name: values.name,
            surname: values.surname,
            roleId: values.roleId,
          },
        }).unwrap();
        console.log('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile:', error);
      }

      console.log(`Submitted values: ${JSON.stringify(values, null, 2)}`);

      setSubmitting(false);
    }
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
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      validateOnChange
    >
      {children}
    </Formik>
  );
};
