import { CounterMultiselect } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import {
  getCurrentCampaignData,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';

export const SeverityFilter = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <div style={{ maxWidth: '170px' }} className="dropdown-severities">
      <CounterMultiselect
        isCompact
        i18n={{
          counterText: (count) => t(`Severity ({{count}})`, { count }),
          noItems: t('__BUGS_SEVERITY_FILTER_ITEM_NO_ITEMS'),
        }}
        onChange={(selected) => {
          dispatch(
            updateFilters({
              filters: {
                severities: selected.map((item) => ({
                  id: item.itemId,
                  name: item.label,
                })),
              },
            })
          );
        }}
        options={data.severities.available.map((item) => ({
          itemId: item.id,
          className: `dropdown-severities-item-${item.name.toLowerCase()}`,
          label: getSeverityInfo(item.name as Severities, t).text,
          style: { color: getSeverityInfo(item.name as Severities, t).color },
          disabled: !counters[item.id],
          selected: data.severities.selected.map((i) => i.id).includes(item.id),
        }))}
      />
    </div>
  );
};
