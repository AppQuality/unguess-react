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

  // TODO: remove this, API bug - Filter only unique ids useCases
  const availableUseCases = data.useCases.available.filter(
    (useCase, index, self) =>
      index === self.findIndex((u) => u.id === useCase.id)
  );

  const options = availableUseCases.map((item) => ({
    id: item.id,
    label: item.title.full,
    selected: data.useCases.selected.map((i) => i.id).includes(item.id),
  }));

  // Add not a specific use case option
  options.push({
    id: 0,
    label: t('__BUGS_USECASES_FILTER_ITEM_NO_USECASE'),
    selected: data.useCases.selected.map((i) => i.id).includes(0),
  });

  return (
    <div style={{ maxWidth: '165px' }}>
      <CounterMultiselect
        i18n={{
          counterText: (count) => t(`Use Cases ({{count}})`, { count }),
          noItems: t('__BUGS_USECASES_FILTER_ITEM_NO_ITEMS'),
        }}
        onChange={(selected) => {
          // Check if no use cases is included in selected
          if (selected.map((item) => item.id).includes(0)) {
            dispatch(
              updateFilters({
                filters: {
                  useCases: [],
                },
              })
            );
          } else {
            dispatch(
              updateFilters({
                filters: {
                  useCases: selected.map((item) => ({
                    id: item.id,
                    title: {
                      full: item.label,
                    },
                  })),
                },
              })
            );
          }
        }}
        options={options}
      />
    </div>
  );
};
