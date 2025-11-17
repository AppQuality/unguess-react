import { Notification, useToast } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { WatcherList } from 'src/common/components/WatcherList';

import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidUsersQuery,
  useGetCampaignsByCidWatchersQuery,
  useGetProjectsByPidUsersQuery,
  useGetUsersMeQuery,
  useGetWorkspacesByWidUsersQuery,
  usePostCampaignsByCidWatchersMutation,
} from 'src/features/api';

const useAvailableUsers = ({ campaignId }: { campaignId: string }) => {
  const { data, isLoading } = useGetCampaignsByCidQuery({ cid: campaignId });

  if (isLoading || !data) return { data: [], isLoading };

  const { project, workspace } = data;
  const { id: workspaceId } = workspace;
  const { id: projectId } = project;

  const { data: campaignUsers, isLoading: isLoadingCampaignUsers } =
    useGetCampaignsByCidUsersQuery(
      {
        cid: campaignId,
      },
      {
        skip: !campaignId,
      }
    );

  const { data: workspaceUsers, isLoading: isLoadingWorkspaceUsers } =
    useGetWorkspacesByWidUsersQuery(
      {
        wid: workspaceId.toString(),
      },
      {
        skip: !workspaceId,
      }
    );

  const { data: projectUsers, isLoading: isLoadingProjectUsers } =
    useGetProjectsByPidUsersQuery(
      {
        pid: projectId.toString(),
      },
      {
        skip: !projectId,
      }
    );

  if (
    isLoadingCampaignUsers ||
    isLoadingWorkspaceUsers ||
    isLoadingProjectUsers
  ) {
    return { data: [], isLoading: true };
  }

  const combinedUsers = [
    ...(campaignUsers?.items || []),
    ...(workspaceUsers?.items || []),
    ...(projectUsers?.items || []),
  ].filter((user) => !user.invitationPending);

  // Remove duplicates
  const uniqueUsers = Array.from(
    new Map(combinedUsers.map((user) => [user.profile_id, user])).values()
  );

  return { data: uniqueUsers, isLoading: false };
};

const MemberAddAutocomplete = ({ campaignId }: { campaignId: string }) => {
  const { data, isLoading } = useAvailableUsers({ campaignId });

  const [addUser] = usePostCampaignsByCidWatchersMutation();
  const { addToast } = useToast();
  const { t } = useTranslation();
  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useGetUsersMeQuery();
  const { data: watchers, isLoading: isLoadingWatchers } =
    useGetCampaignsByCidWatchersQuery({ cid: campaignId });

  if (!data || isLoading || isLoadingWatchers || isLoadingCurrentUser)
    return null;

  const users = data
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
          cid: campaignId,
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
