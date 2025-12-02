import { Notification, useToast } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { WatcherList } from 'src/common/components/WatcherList';

import {
  useGetCampaignsByCidWatchersQuery,
  useGetUsersMeQuery,
  usePostCampaignsByCidWatchersMutation,
} from 'src/features/api';
import { useAvailableUsers } from './hooks/useAvailableUsers';

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
          body: { users: [{ id: selectionValue, notify: true }] },
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
