import {
  Autocomplete,
  DropdownFieldNew,
  MD,
} from '@appquality/unguess-design-system';
import { useState } from 'react';

import {
  useGetPlansByPidWatchersQuery,
  useGetUsersMeQuery,
  useGetWorkspacesByWidUsersQuery,
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
  const { data } = useGetWorkspacesByWidUsersQuery(
    {
      wid: (activeWorkspace?.id || '0').toString(),
    },
    {
      skip: !activeWorkspace?.id,
    }
  );
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
          console.log('Selected user to add as watcher:', selectionValue);
          setInputValue('');
        }}
      />
    </DropdownFieldNew>
  );
};

export { MemberAddAutocomplete };
