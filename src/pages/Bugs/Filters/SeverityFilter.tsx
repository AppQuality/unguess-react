import { CounterMultiselect } from '@appquality/unguess-design-system';
import {
  getCurrentCampaignData,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';

export const SeverityFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const { t } = useTranslation();

  if (
    !data ||
    !data.severities ||
    !data.severities.available ||
    !data.severities.available.length
  )
    return null;

  return (
    <CounterMultiselect
      i18n={{
        counterText: (count) => t(`Severity ({{count}})`, { count }),
      }}
      onChange={(selected) => {
        dispatch(
          updateFilters({
            filters: {
              severities: selected.map((item) => ({
                id: item.id,
                name: item.label,
              })),
            },
          })
        );
      }}
      options={data.severities.available.map((item) => ({
        id: item.id,
        label: item.name,
      }))}
    />
  );
};
