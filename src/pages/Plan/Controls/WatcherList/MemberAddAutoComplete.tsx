import {
  Autocomplete,
  DropdownFieldNew,
  MD,
  Notification,
  useToast,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useGetPlansByPidWatchersQuery,
  useGetUsersMeQuery,
  useGetWorkspacesByWidUsersQuery,
  usePostPlansByPidWatchersMutation,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useTheme } from 'styled-components';

const ItemContent = ({ name, email }: { name: string; email: string }) => {
  const appTheme = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: appTheme.space.md,
      }}
    >
      <div>
        <MD isBold>{name}</MD>
        <MD style={{ color: appTheme.palette.grey[600] }}>{email}</MD>
      </div>
    </div>
  );
};

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
  const [inputValue, setInputValue] = useState('');

  if (!data || isLoading || isLoadingWatchers || isLoadingCurrentUser)
    return null;

  const users = data.items
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
    <DropdownFieldNew>
      <Autocomplete
        data-qa="global_header_navItem_workspace_dropdown"
        onInputChange={(value) => setInputValue(value)}
        inputValue={inputValue}
        selectionValue={null}
        options={users.map((user) => ({
          children: <ItemContent email={user.email} name={user.name} />,
          id: `user-${user.id}`,
          label: `${user.name} - ${user.email}`,
          value: `${user.id}`,
        }))}
        onOptionClick={({ selectionValue }) => {
          addUser({
            pid: planId,
            body: { users: [{ id: Number(selectionValue) }] },
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
          setInputValue('');
        }}
      />
    </DropdownFieldNew>
  );
};

export { MemberAddAutocomplete };
