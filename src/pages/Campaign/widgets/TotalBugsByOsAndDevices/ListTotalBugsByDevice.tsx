import { SunburstChart } from '@appquality/unguess-design-system';
import { List } from '../List';
import { ListItem } from '../List/ListItem';

export const ListTotalBugsByDevice = () => {
  const chartData = [
    {
      name: 'desktop',
      children: [
        {
          name: 'Windows',
          children: [
            { name: 'Notebook1', value: 34 },
            { name: 'Gaming PC', value: 9 },
          ],
        },
        {
          name: 'MacOS',
          children: [{ name: 'Notebook', value: 6 }],
        },
      ],
    },
    {
      name: 'smartphone',
      children: [
        {
          name: 'Android',
          children: [
            {
              name: 'Huawei P30 Lite',
              value: 9,
            },
            {
              name: 'Samsung Galaxy A52s',
              value: 14,
            },
            {
              name: 'Xiaomi Poco X3 Pro',
              value: 22,
            },
            {
              name: 'Samsung Galaxy A80',
              value: 16,
            },
          ],
        },
        {
          name: 'smartphone iOS',
          children: [
            {
              name: 'Apple iPhone XS Max',
              value: 10,
            },
          ],
        },
      ],
    },
    {
      name: 'tablet',
      children: [
        {
          name: 'tablet iOS',
          children: [{ name: 'Apple iPad Air 2', value: 17 }],
        },
      ],
    },
  ];

  return (
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
};
