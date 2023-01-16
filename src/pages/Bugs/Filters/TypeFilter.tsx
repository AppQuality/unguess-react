import { CounterMultiselect } from '@appquality/unguess-design-system';
import {
  getCurrentCampaignData,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';

export const TypeFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const { t } = useTranslation();

  if (
    !data ||
    !data.types ||
    !data.types.available ||
    !data.types.available.length
  )
    return null;

  return (
    <div style={{ maxWidth: '165px' }}>
      <CounterMultiselect
        i18n={{
          counterText: (count) => t(`Typology ({{count}})`, { count }),
        }}
        onChange={(selected) => {
          dispatch(
            updateFilters({
              filters: {
                types: selected.map((item) => ({
                  id: item.id,
                  name: item.label,
                })),
              },
            })
          );
        }}
        options={data.types.available.map((item) => ({
          id: item.id,
          label: item.name,
          selected: data.types.selected.map((i) => i.id).includes(item.id),
        }))}
      />
    </div>
  );
};
