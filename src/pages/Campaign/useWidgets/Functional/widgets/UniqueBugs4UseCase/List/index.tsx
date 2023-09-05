import { XL } from '@appquality/unguess-design-system';
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { List } from 'src/pages/Campaign/List';
import { ListItem } from 'src/pages/Campaign/List/ListItem';
import { WidgetLoader } from '../../widgetLoader';
import { BugsByUseCaseVisualizationProps } from '../types';
import { useBugsByUsecase } from '../useBugsByUsecase';

export const ListUniqueBugs4UseCase = ({
  campaignId,
}: BugsByUseCaseVisualizationProps) => {
  const { t } = useTranslation();
  const { items, total, isLoading, isError } = useBugsByUsecase(campaignId);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState(items);
  const pageSize = 6;
  const maxPages = useMemo(
    () => Math.ceil(items.length / pageSize),
    [items, pageSize]
  );

  useEffect(() => {
    setPaginatedItems(
      items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    );
  }, [currentPage, items]);

  if (isLoading || isError) {
    return <WidgetLoader />;
  }

  return (
    <List
      header={t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_LIST_HEADER')}
      title={
        <>
          {total}{' '}
          <XL tag="span" isBold>
            {t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_LIST_CONTENT')}
          </XL>
        </>
      }
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
