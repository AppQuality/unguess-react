import { List } from '../List';
import { ListItem } from '../List/ListItem';

export const ListTotalBugsByDevice = () => (
  <List header="header" title="title">
    <List.Columns>
      <List.Columns.Label isBold>label left</List.Columns.Label>
      <List.Columns.Label isBold>label right</List.Columns.Label>
    </List.Columns>
    <ListItem key={1} numerator={1} denominator={2}>
      list item
    </ListItem>
    <List.Pagination setPage={() => {}} page={1} totalPages={1} />
  </List>
);
