import { PieChart } from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';
import { List } from '../List';
import { ListItem } from '../List/ListItem';
import FlipCard from '../widgetCards/FlipCard';
import { ListItemProps } from '../List/type';

const pieChartProps = {
  width: '100%',
  height: '270px',
  data: [
    {
      id: 'sass',
      label: 'sass',
      value: 309,
      color: 'hsl(162, 70%, 50%)',
    },
    {
      id: 'make',
      label: 'make',
      value: 420,
      color: 'hsl(175, 70%, 50%)',
    },
    {
      id: 'erlang',
      label: 'erlang',
      value: 300,
      color: 'hsl(159, 70%, 50%)',
    },
    {
      id: 'lisp',
      label: 'lisp',
      value: 491,
      color: 'hsl(243, 70%, 50%)',
    },
    {
      id: 'go',
      label: 'go',
      value: 108,
      color: 'hsl(163, 70%, 50%)',
    },
  ],
  centerItem: {
    label: 'Tot. bugs',
    value: '27',
  },
};
const ChartUniqueBugs4UseCase = () => (
  <div>
    <PieChart {...pieChartProps} />
  </div>
);

const ListUniqueBugs4UseCase = () => {
  const { t } = useTranslation();
  const { data } = useGetCampaignsByCidWidgetsQuery({
    cid: 3044,
    s: 'bugs-by-usecase',
  });

  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<ListItemProps[]>([]);

  useEffect(() => {
    if (data && 'kind' in data && data.kind === 'bugsByUseCase') {
      const newTotal = data.data.reduce(
        (acc, current) => acc + current.bugs,
        0
      );
      const currentItems = data.data.map((item) => ({
        key: item.usecase_id,
        children: item.title,
        numerator: item.bugs,
        denominator: newTotal,
      }));
      setItems(currentItems);
      setTotal(newTotal);
    }
  }, [data]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedItems, setPaginatedItems] = useState(items);

  const pageSize = 6;

  const maxPages = Math.ceil(items.length / pageSize);

  useEffect(() => {
    setPaginatedItems(
      items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    );
  }, [currentPage]);

  return (
    <List
      header="header"
      title={`${total} ${t(
        '__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_LIST_HEADER'
      )}`}
    >
      <List.Columns>
        <List.Columns.Label isBold>
          {' '}
          {t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_COLUMN_LEFT')}
        </List.Columns.Label>
        <List.Columns.Label isBold>
          {t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_COLUMN_RIGHT')}
        </List.Columns.Label>
      </List.Columns>
      {paginatedItems.map((item) => (
        <ListItem
          key={item.key}
          numerator={item.numerator}
          denominator={item.denominator}
        >
          {item.children}
        </ListItem>
      ))}
      <List.Pagination
        setPage={setCurrentPage}
        page={currentPage}
        totalPages={maxPages}
      />
    </List>
  );
};

const headerHeight = 67;
const cardHeight = 537;
const UniqueBugs4UseCase = () => {
  const { t } = useTranslation();
  return (
    <FlipCard>
      <FlipCard.Header>
        {t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_CARD_TITLE')}
      </FlipCard.Header>
      <FlipCard.Body
        height={`${cardHeight - headerHeight}px`}
        front={<ChartUniqueBugs4UseCase />}
        back={<ListUniqueBugs4UseCase />}
      />
    </FlipCard>
  );
};

export default UniqueBugs4UseCase;
