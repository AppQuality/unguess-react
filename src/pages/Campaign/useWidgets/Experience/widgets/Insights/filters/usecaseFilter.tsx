import { CounterMultiselect } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { getCurrentUxData, updateFilters } from 'src/features/uxFilters';
import { useFilterData } from './useFilterData';

export const UseCaseFilter = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const data = getCurrentUxData();
  const { counters } = useFilterData('clusters');

  if (
    !data ||
    !data.clusters ||
    !data.clusters.available ||
    !data.clusters.available.length ||
    !counters
  )
    return null;

  return (
    <div style={{ maxWidth: '170px' }} className="dropdown-clusters">
      <CounterMultiselect
        isCompact
        i18n={{
          counterText: (count) => t(`UseCase ({{count}})`, { count }),
          noItems: t('__BUGS_USECASES_FILTER_ITEM_NO_ITEMS'),
        }}
        onChange={(selected) => {
          dispatch(
            updateFilters({
              filters: {
                clusters: selected.map((item) => ({
                  id: item.itemId,
                  name: item.label,
                })),
              },
            })
          );
        }}
        options={data.clusters.available.map((item) => ({
          itemId: item.id,
          className: `dropdown-clusters-item-${item.name.toLowerCase()}`,
          label: `${item.name} (${counters[item.id]})`,
          disabled:
            !counters[item.id] &&
            !data.clusters.selected.map((i) => i.id).includes(item.id),
          selected: data.clusters.selected.map((i) => i.id).includes(item.id),
        }))}
      />
    </div>
  );
};
