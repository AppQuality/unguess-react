import { useState } from 'react';
import {
  Dropdown,
  Item,
  Menu,
  Select,
  Span,
} from '@appquality/unguess-design-system';
import { ReactComponent as SortIcon } from 'src/assets/icons/sort-2.svg';
import { Field } from '@zendeskgarden/react-dropdowns';
import {
  ORDER__HIGH__TO__LOW,
  ORDER__LOW__TO__HIGH
} from 'src/constants';
import { DropdownLabel } from './DropdownLabel';
import ItemGroup from './ItemGroup';



export const SortBy = () => {
  const [title, setTitle] = useState('')
  return (
    <Dropdown
      selectedItem="severity"
      onSelect={(sorting) => {
        // eslint-disable-next-line no-alert
        alert(`selected sorting: ${sorting}`);
        setTitle(sorting);
      }}
    >
      <Field>
        <Select isCompact isPrimary>
          <DropdownLabel>
            <SortIcon />
            <Span>{title}</Span>
          </DropdownLabel>
        </Select>
      </Field>
      <Menu>
        <Dropdown.HeaderItem>Sort By:</Dropdown.HeaderItem>
        <Dropdown.Separator />
  
        <ItemGroup title='Severity'>
          <Item
            key={`severity.${ORDER__HIGH__TO__LOW.key}`}
            value={ORDER__HIGH__TO__LOW.key}
          >
            {ORDER__HIGH__TO__LOW.displayName}
          </Item>
          <Item
            key={`severity.${ORDER__LOW__TO__HIGH.key}`}
            value={ORDER__LOW__TO__HIGH.key}
          >
            {ORDER__LOW__TO__HIGH.displayName}
          </Item>
        </ItemGroup>
        <ItemGroup title='Priority'>
          <Item
            key={`priority.${ORDER__HIGH__TO__LOW.key}`}
            value={ORDER__HIGH__TO__LOW.key}
          >
            {ORDER__HIGH__TO__LOW.displayName}
          </Item>
  
          <Item
            key={`priority.${ORDER__LOW__TO__HIGH.key}`}
            value={ORDER__LOW__TO__HIGH.key}
          >
            {ORDER__LOW__TO__HIGH.displayName}
          </Item>
        </ItemGroup>
      </Menu>
    </Dropdown>
  )
};
