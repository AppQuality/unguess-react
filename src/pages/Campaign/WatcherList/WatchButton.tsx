import { Notification, useToast } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';

import { WatcherList } from 'src/common/components/WatcherList';
import {
  useGetUsersMeQuery,
  usePostCampaignsByCidWatchersMutation,
} from 'src/features/api';
import { useAvailableUsers } from './hooks/useAvailableUsers';
import { useIsLastOne } from './hooks/useIsLastOne';
import { useIsWatching } from './hooks/useIsWatching';
import { useRemoveWatcher } from './hooks/useRemoveWatcher';

const WatchButton = ({ campaignId }: { campaignId: string }) => {
  const isWatching = useIsWatching({ campaignId });
  const isLastOne = useIsLastOne({ campaignId });
  const { addToast } = useToast();
  const { removeWatcher } = useRemoveWatcher();
  const [addUser] = usePostCampaignsByCidWatchersMutation();
  const { data: availableUsers } = useAvailableUsers({ campaignId });
  const { data: currentUser } = useGetUsersMeQuery();
  const hasAccess =
    availableUsers.length > 0 &&
    availableUsers.some((user) => user.profile_id === currentUser?.profile_id);
  const { t } = useTranslation();

  const isLastWatcher = isWatching && isLastOne;

  const isDisabled = !hasAccess || isLastWatcher;

  if (!currentUser) return null;

  return (
    <WatcherList.WatchButtonComponent
      isWatching={isWatching}
      isLastOne={isLastOne}
      isDisabled={isDisabled}
      onClick={() => {
        if (isWatching) {
          removeWatcher({
            campaignId,
            profileId: currentUser.profile_id.toString(),
          });
        } else {
          addUser({
            cid: campaignId,
            body: { users: [{ id: currentUser.profile_id }] },
          })
            .unwrap()
            .then(() => {
              addToast(
                ({ close }) => (
                  <Notification
                    onClose={close}
                    type="success"
                    message={t(
                      '__PLAN_PAGE_WATCHER_LIST_ADD_SELF_TOAST_MESSAGE'
                    )}
                    closeText={t('__TOAST_CLOSE_TEXT')}
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
                    message={t(
                      '__PLAN_PAGE_WATCHER_LIST_ADD_SELF_TOAST_ERROR_MESSAGE'
                    )}
                    closeText={t('__TOAST_CLOSE_TEXT')}
                    isPrimary
                  />
                ),
                { placement: 'top' }
              );
            });
        }
      }}
    />
  );
};

export { WatchButton };
