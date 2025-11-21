import {
  Autocomplete,
  DropdownFieldNew,
  MD,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MemberAddAutocomplete = ({
  onSelect,
  users,
  isLoading,
}: {
  onSelect: (selectionValue: number) => void;
  isLoading: boolean;
  users: Array<{ id: number; name: string; email: string }>;
}) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');

  if (!users || isLoading) return null;

  return (
    <DropdownFieldNew>
      <Autocomplete
        onInputChange={(value) => setInputValue(value)}
        inputValue={inputValue}
        selectionValue={null}
        placeholder={t(
          '__PLAN_PAGE_WATCHER_LIST_SELECT_ADD_MEMBERS_PLACEHOLDER'
        )}
        options={users.map((user) => ({
          children: <MD isBold>{user.name}</MD>,
          meta: user.email,
          id: `user-${user.id}`,
          label: `${user.name} - ${user.email}`,
          value: `${user.id}`,
        }))}
        onOptionClick={({ selectionValue }) => {
          setInputValue('');
          onSelect(Number(selectionValue));
        }}
      />
    </DropdownFieldNew>
  );
};

export { MemberAddAutocomplete };
