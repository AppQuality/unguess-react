import { Notification, useToast } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useDeletePlansByPidWatchersAndProfileIdMutation } from 'src/features/api';

const useRemoveWatcher = () => {
  const [removeUser] = useDeletePlansByPidWatchersAndProfileIdMutation();
  const { addToast } = useToast();
  const { t } = useTranslation();

  const removeWatcher = async ({
    planId,
    profileId,
  }: {
    planId: string;
    profileId: string;
  }) =>
    removeUser({ pid: planId, profileId })
      .unwrap()
      .catch((error) => {
        if (error.status === 406) {
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="error"
                message={t(
                  '__PLAN_PAGE_WATCHER_LIST_REMOVE_LAST_USER_ERROR_TOAST_MESSAGE'
                )}
                closeText={t('__TOAST_CLOSE_TEXT')}
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
                message={t(
                  '__PLAN_PAGE_WATCHER_LIST_REMOVE_USER_ERROR_TOAST_MESSAGE'
                )}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
        }
      });
  return { removeWatcher };
};

export { useRemoveWatcher };
