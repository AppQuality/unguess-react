import {
  Dropdown,
  Item,
  Menu,
  Select,
  Span,
} from '@appquality/unguess-design-system';
import { ReactComponent as SortIcon } from 'src/assets/icons/sort-2.svg';
import { Field } from '@zendeskgarden/react-dropdowns';
import { DropdownLabel } from './DropdownLabel';

export const SortBy = () => (
  <Dropdown
    selectedItem="severity"
    onSelect={(sorting) => {
      // eslint-disable-next-line no-alert
      alert(`selected sorting: ${sorting}`);
    }}
  >
    <Field>
      <Select isCompact isPrimary>
        <DropdownLabel>
          <SortIcon />
          <Span>By Highest Severity</Span>
        </DropdownLabel>
      </Select>
    </Field>
    <Menu>
      <Dropdown.HeaderItem>Sort By</Dropdown.HeaderItem>
      <Dropdown.Separator />
      <Item key="severity" value="severity">
        Severity
      </Item>
      <Item key="priority" value="priority">
        Priority
      </Item>
    </Menu>
  </Dropdown>
);
