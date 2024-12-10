import { Tag, getColor } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { Order, OrderBy } from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';

interface OrderbyTagProps {
  orderBy: OrderBy;
  order: Order;
}

export const OrderbyTag = ({ orderBy, order }: OrderbyTagProps) => {
  const { t } = useTranslation();

  const mapOrderBy: { [key: string]: string } = {
    'severity_id DESC': t('__BUG_PAGE_HEADER_HIGHEST_SEVERITY'),
    'severity_id ASC': t('__BUG_PAGE_HEADER_LOWEST_SEVERITY'),
    'priority_id DESC': t('__BUG_PAGE_HEADER_HIGHEST_PRIORITY'),
    'priority_id ASC': t('__BUG_PAGE_HEADER_LOWEST_PRIORITY'),
  };

  return (
    <Tag color={getColor(appTheme.colors.infoHue, 600)} hue="transparent">
      {t('__BUG_PAGE_HEADER_ORDERBY')}:{' '}
      <Tag.SecondaryText color={appTheme.palette.grey[700]} isBold>
        {mapOrderBy[`${orderBy} ${order}`]}
      </Tag.SecondaryText>
    </Tag>
  );
};
