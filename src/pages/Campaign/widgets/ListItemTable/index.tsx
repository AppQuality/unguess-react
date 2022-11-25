import { ListItem, ListItemProps } from './ListItem';

export const ListItemTable = ({ items }: { items: ListItemProps[] }) => (
  <div
    style={{
      display: 'flex',
      alignContent: 'space-between',
      flexDirection: 'column',
      pointerEvents: 'none',
    }}
  >
    {items.map((item) => (
      <ListItem item={item} />
    ))}
  </div>
);
