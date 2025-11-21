import { Notification, useToast } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { WatcherList } from 'src/common/components/WatcherList';

import {
  useGetPlansByPidWatchersQuery,
  useGetUsersMeQuery,
  useGetWorkspacesByWidUsersQuery,
  usePostPlansByPidWatchersMutation,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';

const MemberAddAutocomplete = ({ planId }: { planId: string }) => {
  const { activeWorkspace, isLoading } = useActiveWorkspace();

  const [addUser] = usePostPlansByPidWatchersMutation();
  const { data } = useGetWorkspacesByWidUsersQuery(
    {
      wid: (activeWorkspace?.id || '0').toString(),
    },
    {
      skip: !activeWorkspace?.id,
    }
  );
  const { addToast } = useToast();
  const { t } = useTranslation();
  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useGetUsersMeQuery();
  const { data: watchers, isLoading: isLoadingWatchers } =
    useGetPlansByPidWatchersQuery({ pid: planId });

  if (!data || isLoading || isLoadingWatchers || isLoadingCurrentUser)
    return null;

  const users = data.items
    .filter((user) => !user.invitationPending)
    .map((user) => ({
      name: user.name,
      email: user.email,
      id: user.profile_id,
    }))

    .filter(
      (user) =>
        !watchers?.items.find((watcher) => watcher.id === user.id) &&
        user.id !== currentUser?.profile_id
    );

  return (
    <WatcherList.MemberAddAutocompleteComponent
      onSelect={(selectionValue: number) => {
        addUser({
          pid: planId,
          body: { users: [{ id: selectionValue }] },
        })
          .unwrap()
          .catch(() => {
            addToast(
              ({ close }) => (
                <Notification
                  onClose={close}
                  type="error"
                  message={t(
                    '__PLAN_PAGE_WATCHER_LIST_ADD_USER_ERROR_TOAST_MESSAGE'
                  )}
                  closeText={t('__TOAST_CLOSE_TEXT')}
                  isPrimary
                />
              ),
              { placement: 'top' }
            );
          });
      }}
      users={users}
      isLoading={isLoading || isLoadingWatchers || isLoadingCurrentUser}
    />
  );
};

export { MemberAddAutocomplete };
