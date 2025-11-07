import { useToast } from '@appquality/unguess-design-system';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useGetUsersMePreferencesQuery } from 'src/features/api';
import { NotificationSettingsFormValues } from './valuesType';
import { NotificationSettingsCard } from './parts/NotificationSettingsCard';
import { Loader } from './parts/cardLoader';

export const FormNotificationSettings = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { data, isLoading } = useGetUsersMePreferencesQuery();
  const activitySetup =
    data?.items?.find((pref) => pref.name === 'plan_notifications_enabled')
      ?.value ?? '1';

  const activityProgress =
    data?.items?.find((pref) => pref.name === 'notifications_enabled')?.value ??
    '1';

  const initialValues: NotificationSettingsFormValues = {
    activitySetupUpdates: activitySetup === '1',
    activityProgress: activityProgress === '1',
  };

  if (isLoading) return <Loader />;

  const schema = Yup.object().shape({
    activitySetupUpdates: Yup.boolean(),
    activityProgress: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      validateOnChange
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);

        /*  updateProfile({
          body: {
            name: values.name,
            surname: values.surname,
            roleId: values.roleId,
            companySizeId: values.companySizeId,
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
          })
          .finally(() => {
            actions.setSubmitting(false);
          }); */
      }}
    >
      <NotificationSettingsCard />
    </Formik>
  );
};
