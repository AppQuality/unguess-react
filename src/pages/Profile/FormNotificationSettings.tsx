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
    data?.items?.find((pref) => pref.name === 'campaign_notifications_enabled')
      ?.value ?? '1';
  const commentsActivity =
    data?.items?.find((pref) => pref.name === 'comment_notifications_enabled')
      ?.value ?? '1';
  const commentsWatchers =
    data?.items?.find(
      (pref) => pref.name === 'comment_notifications_watcher_enabled'
    )?.value ?? '1';

  const initialValues: NotificationSettingsFormValues = {
    commentsWatchers: commentsWatchers === '1',
    commentsActivity: commentsActivity === '1',
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
      if (values.commentsActivity !== initialValues.commentsActivity) {
        await updatePreferences({
          slug: 'comment_notifications_enabled',
          body: {
            value: values.commentsActivity ? '1' : '0',
          },
        }).unwrap();
      }
      if (values.activityProgress !== initialValues.activityProgress) {
        await updatePreferences({
          slug: 'campaign_notifications_enabled',
          body: {
            value: values.activityProgress ? '1' : '0',
          },
        }).unwrap();
      }
      if (values.commentsWatchers !== initialValues.commentsWatchers) {
        await updatePreferences({
          slug: 'comment_notifications_watcher_enabled',
          body: {
            value: values.commentsWatchers ? '1' : '0',
          },
        }).unwrap();
      }
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="success"
            message={t('__PROFILE_PAGE_UPDATE_SETTINGS_SUCCESS')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
    } catch (error) {
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="error"
            message={t('__PROFILE_PAGE_TOAST_ERROR_UPDATING_SETTINGS')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
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
