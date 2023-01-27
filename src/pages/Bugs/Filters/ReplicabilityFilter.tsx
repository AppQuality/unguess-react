import { CounterMultiselect } from '@appquality/unguess-design-system';
import {
  getCurrentCampaignData,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';

export const ReplicabilityFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const { t } = useTranslation();

  if (
    !data ||
    !data.replicabilities ||
    !data.replicabilities.available ||
    !data.replicabilities.available.length
  )
    return null;

  return (
    <div style={{ maxWidth: '165px' }}>
      <CounterMultiselect
        isCompact
        i18n={{
          counterText: (count) => t(`Replicability ({{count}})`, { count }),
          noItems: t('__BUGS_REPLICABILITY_FILTER_ITEM_NO_ITEMS'),
        }}
        onChange={(selected) => {
          dispatch(
            updateFilters({
              filters: {
                replicabilities: selected.map((item) => ({
                  id: item.id,
                  name: item.label,
                })),
              },
            })
          );
        }}
        options={data.replicabilities.available.map((item) => ({
          id: item.id,
          label: item.name,
          selected: data.replicabilities.selected
            .map((i) => i.id)
            .includes(item.id),
        }))}
      />
    </div>
  );
};
