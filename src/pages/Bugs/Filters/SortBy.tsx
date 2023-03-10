import {
  Dropdown,
  Item,
  Menu,
  Select,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';

export const SortBy = () => (
  <div style={{ maxWidth: '180px' }}>
    <Dropdown
      onSelect={() => {
        alert('selected sorting');
      }}
    >
      <Field>
        <Select isCompact isPrimary />
      </Field>
      <Menu>
        <Dropdown.HeaderItem>Sort By</Dropdown.HeaderItem>
        <Dropdown.Separator />
        <Item key="item1" value="item1">
          item 1
        </Item>
        <Item key="item2" value="item2">
          item 2
        </Item>
        <Dropdown.Separator />
        <Item key="item3" value="item3">
          item 3
        </Item>
      </Menu>
    </Dropdown>
  </div>
);
