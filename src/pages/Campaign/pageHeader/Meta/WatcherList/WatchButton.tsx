import { Notification, useToast } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';

import { WatcherList } from 'src/common/components/WatcherList';
import {
  useGetUsersMeQuery,
  useGetWorkspacesByWidUsersQuery,
  usePostCampaignsByCidWatchersMutation,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useIsLastOne } from './hooks/useIsLastOne';
import { useIsWatching } from './hooks/useIsWatching';
import { useRemoveWatcher } from './hooks/useRemoveWatcher';

const useHasWorkspaceAccess = () => {
  const { activeWorkspace } = useActiveWorkspace();
  const { data: user } = useGetUsersMeQuery();

  const { data } = useGetWorkspacesByWidUsersQuery(
    {
      wid: (activeWorkspace?.id || '0').toString(),
    },
    {
      skip: !activeWorkspace?.id,
    }
  );

  return (
    (data?.items || []).find((u) => u.profile_id === user?.profile_id) !==
    undefined
  );
};

const WatchButton = ({ campaignId }: { campaignId: string }) => {
  const isWatching = useIsWatching({ campaignId });
  const isLastOne = useIsLastOne({ campaignId });
  const { addToast } = useToast();
  const { removeWatcher } = useRemoveWatcher();
  const [addUser] = usePostCampaignsByCidWatchersMutation();
  const hasWorkspaceAccess = useHasWorkspaceAccess();
  const { data: currentUser } = useGetUsersMeQuery();
  const { t } = useTranslation();

  const isLastWatcher = isWatching && isLastOne;

  const isDisabled = !hasWorkspaceAccess || isLastWatcher;

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
