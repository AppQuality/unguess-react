import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';
import { List } from '../List';
import { ListItem } from '../List/ListItem';
import { ListItemProps } from '../List/type';

export const ListUniqueBugs4UseCase = () => {
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
  }, [currentPage, items]);

  return (
    <List
      header={t('__CAMPAIGN_WIDGET_UNIQUE_BUGS_BY_USECASE_HEADER_LABEL')}
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
