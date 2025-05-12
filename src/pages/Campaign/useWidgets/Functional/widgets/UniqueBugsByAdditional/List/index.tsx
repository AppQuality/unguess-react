import { XL } from '@appquality/unguess-design-system';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { List as CampaignList } from 'src/pages/Campaign/List';
import { ListItem } from 'src/pages/Campaign/List/ListItem';
import { WidgetLoader } from '../../widgetLoader';
import { useBugsByAdditional } from '../useBugsByAdditional';

export const List = ({
  slug,
  name,
  campaignId,
}: {
  slug: string;
  name: string;
  campaignId: string;
}) => {
  const { t } = useTranslation();
  const { items, total, isLoading, isError } = useBugsByAdditional({
    slug,
    campaignId,
  });
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
    <CampaignList
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
      <CampaignList.Columns>
        <CampaignList.Columns.Label isBold>{name}</CampaignList.Columns.Label>
        <CampaignList.Columns.Label isBold>
          {t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_COLUMN_RIGHT')}
        </CampaignList.Columns.Label>
      </CampaignList.Columns>
      {paginatedItems.map((item) => (
        <ListItem
          key={item.key}
          numerator={item.numerator}
          denominator={item.denominator}
        >
          {item.children}
        </ListItem>
      ))}
      <CampaignList.Pagination
        setPage={setCurrentPage}
        page={currentPage}
        totalPages={maxPages}
      />
    </CampaignList>
  );
};
