import { useTranslation } from 'react-i18next';
import { WidgetItem } from './types';

interface Datum {
  id: string;
  value: number;
  [key: string]: string | number | undefined;
}

export const useMaxItems = (items: WidgetItem[], maxItems = 6): Datum[] => {
  const { t } = useTranslation();
  const sortedItems = [...items].sort((x, y) => {
    if (x.value < y.value) {
      return 1;
    }
    if (x.value > y.value) {
      return -1;
    }
    return 0;
  });
  const exceding = items.slice(maxItems - 1, items.length);
  if (exceding.length === 0) {
    return items;
  }
  const excedingValue = exceding.reduce((acc, curr) => acc + curr.value, 0);
  const excedingLabel = t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE', 'others');
  const excedingData = {
    id: excedingLabel,
    label: excedingLabel,
    value: excedingValue,
  };
  const newItems: Datum[] = items.slice(0, maxItems - 1);
  newItems.push(excedingData);
  return newItems;
};
