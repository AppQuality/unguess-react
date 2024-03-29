import { CounterMultiselect } from '@appquality/unguess-design-system';
import {
  getCurrentCampaignData,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';

export const UseCaseFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const { t } = useTranslation();

  if (
    !data ||
    !data.useCases ||
    !data.useCases.available ||
    !data.useCases.available.length
  )
    return null;

  const options = data.useCases.available.map((item) => ({
    itemId: item.id,
    label: item.title.full,
    selected: data.useCases.selected.map((i) => i.id).includes(item.id),
  }));

  return (
    <div>
      <CounterMultiselect
        isCompact
        i18n={{
          counterText: (count) => t(`Use Cases ({{count}})`, { count }),
          noItems: t('__BUGS_USECASES_FILTER_ITEM_NO_ITEMS'),
        }}
        onChange={(selected) => {
          dispatch(
            updateFilters({
              filters: {
                useCases: selected.map((item) => ({
                  id: item.itemId,
                  title: {
                    full: item.label,
                  },
                })),
              },
            })
          );
        }}
        options={options}
      />
    </div>
  );
};
