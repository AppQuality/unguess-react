import { getColor } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Meta } from 'src/common/components/Meta';
import { Order, OrderBy } from 'src/features/bugsPage/bugsPageSlice';
import { useTheme } from 'styled-components';

interface OrderbyTagProps {
  orderBy: OrderBy;
  order: Order;
}

export const OrderbyTag = ({ orderBy, order }: OrderbyTagProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const mapOrderBy: { [key: string]: string } = {
    'severity_id DESC': t('__BUG_PAGE_HEADER_HIGHEST_SEVERITY'),
    'severity_id ASC': t('__BUG_PAGE_HEADER_LOWEST_SEVERITY'),
    'priority_id DESC': t('__BUG_PAGE_HEADER_HIGHEST_PRIORITY'),
    'priority_id ASC': t('__BUG_PAGE_HEADER_LOWEST_PRIORITY'),
  };

  return (
    <Meta
      size="large"
      color={getColor(theme.colors.infoHue, 600)}
      secondaryText={mapOrderBy[`${orderBy} ${order}`]}
    >
      {t('__BUG_PAGE_HEADER_ORDERBY')}:
    </Meta>
  );
};
