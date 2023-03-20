import { CounterMultiselect } from '@appquality/unguess-design-system';
import {
  getCurrentCampaignData,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { getPriorityInfo } from 'src/common/components/utils/getPriorityInfo';
import { useFilterData } from '../Drawer/useFilterData';

export const PriorityFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const { counters } = useFilterData('priorities');
  const { t } = useTranslation();

  if (
    !data ||
    !counters ||
    !data.priorities ||
    !data.priorities.available ||
    !data.priorities.available.length
  )
    return null;

  return (
    <div style={{ maxWidth: '170px' }}>
      <CounterMultiselect
        isCompact
        i18n={{
          counterText: (count) => t(`Priority ({{count}})`, { count }),
          noItems: t('__BUGS_PRIORITY_FILTER_ITEM_NO_ITEMS'),
        }}
        onChange={(selected) => {
          dispatch(
            updateFilters({
              filters: {
                priorities: selected.map((item) => ({
                  id: item.itemId,
                  name: item.label,
                })),
              },
            })
          );
        }}
        options={data.priorities.available.map((item) => ({
          itemId: item.id,
          label: getPriorityInfo(item.name as Priority, t).text,
          disabled: !counters[item.id],
          selected: data.priorities.selected.map((i) => i.id).includes(item.id),
        }))}
      />
    </div>
  );
};
