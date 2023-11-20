import { CounterMultiselect } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { getCurrentUxData, updateFilters } from 'src/features/uxFilters';
import { appTheme } from 'src/app/theme';
import { useFilterData } from './useFilterData';

export const SeverityFilter = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const data = getCurrentUxData();
  const { counters } = useFilterData('severities');

  if (
    !data ||
    !data.severities ||
    !data.severities.available ||
    !data.severities.available.length ||
    !counters
  )
    return null;

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
          label: `${item.name} (${counters[item.id]})`,
          style: {
            color:
              appTheme.colors.bySeverity[
                item.name.toLocaleLowerCase() as Severities
              ],
          },
          disabled:
            !counters[item.id] &&
            !data.severities.selected.map((i) => i.id).includes(item.id),
          selected: data.severities.selected.map((i) => i.id).includes(item.id),
        }))}
      />
    </div>
  );
};
