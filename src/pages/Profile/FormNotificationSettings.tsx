import { useToast, Notification } from '@appquality/unguess-design-system';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import {
  useGetUsersMePreferencesQuery,
  usePutUsersMePreferencesBySlugMutation,
} from 'src/features/api';
import { NotificationSettingsFormValues } from './valuesType';
import { NotificationSettingsCard } from './parts/NotificationSettingsCard';
import { Loader } from './parts/cardLoader';

export const FormNotificationSettings = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { data, isLoading } = useGetUsersMePreferencesQuery();
  const [updatePreferences] = usePutUsersMePreferencesBySlugMutation();
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

  const handleUpdatePreferences = async (
    values: NotificationSettingsFormValues
  ) => {
    try {
      if (values.activitySetupUpdates !== initialValues.activitySetupUpdates) {
        await updatePreferences({
          slug: 'plan_notifications_enabled',
          body: {
            value: values.activitySetupUpdates ? '1' : '0',
          },
        }).unwrap();
      }
      if (values.activityProgress !== initialValues.activityProgress) {
        await updatePreferences({
          slug: 'notifications_enabled',
          body: {
            value: values.activityProgress ? '1' : '0',
          },
        }).unwrap();
      }
      addToast(({ close }) => (
        <Notification
          onClose={close}
          type="success"
          title={t('__PROFILE_PAGE_NOTIFICATIONS_UPDATE_SUCCESS_MESSAGE')}
        />
      ));
    } catch (error) {
      addToast(({ close }) => (
        <Notification
          onClose={close}
          type="error"
          title={t('__PROFILE_PAGE_NOTIFICATIONS_UPDATE_ERROR_MESSAGE')}
        />
      ));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      validateOnChange
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        await handleUpdatePreferences(values);
        actions.setSubmitting(false);
      }}
    >
      <NotificationSettingsCard />
    </Formik>
  );
};
