import { CounterMultiselect } from '@appquality/unguess-design-system';
import {
  getCurrentCampaignData,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { getCustomStatusInfo } from 'src/common/components/utils/getCustomStatusInfo';
import { useFilterData } from '../Drawer/useFilterData';

export const CustomStatusFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const { counters } = useFilterData('customStatuses');
  const { t } = useTranslation();

  if (
    !data ||
    !counters ||
    !data.customStatuses ||
    !data.customStatuses.available ||
    !data.customStatuses.available.length
  )
    return null;

  return (
    <div style={{ maxWidth: '170px' }}>
      <CounterMultiselect
        isCompact
        i18n={{
          counterText: (count) => t(`Status ({{count}})`, { count }),
          noItems: t('__BUGS_CUSTOM_STATUS_FILTER_ITEM_NO_ITEMS'),
        }}
        onChange={(selected) => {
          dispatch(
            updateFilters({
              filters: {
                customStatuses: selected.map((item) => ({
                  id: item.itemId,
                  name: item.label,
                })),
              },
            })
          );
        }}
        options={data.customStatuses.available
          .slice(0)
          .reverse()
          .map((item) => ({
            itemId: item.id,
            label: getCustomStatusInfo(item.name as CustomStatus, t).text,
            disabled: !counters[item.id],
            selected: data.customStatuses.selected
              .map((i) => i.id)
              .includes(item.id),
          }))}
      />
    </div>
  );
};
