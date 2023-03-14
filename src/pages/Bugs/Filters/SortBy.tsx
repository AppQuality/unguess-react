import {
  Dropdown,
  Item,
  Menu,
  Select,
  Span,
} from '@appquality/unguess-design-system';
import { ReactComponent as SortIcon } from 'src/assets/icons/sort-2.svg';
import { Field } from '@zendeskgarden/react-dropdowns';
import styled from 'styled-components';

const DropdownLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  max-width: 180px;
  overflow: hidden;
`;
export const SortBy = () => (
  <div style={{ maxWidth: 'fit-content' }}>
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
  </div>
);
