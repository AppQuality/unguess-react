import { CounterMultiselect } from '@appquality/unguess-design-system';
import {
  getCurrentCampaignData,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';

export const OsFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const { t } = useTranslation();

  if (!data || !data.os || !data.os.available || !data.os.available.length)
    return null;

  const options = data.os.available.map((item) => ({
    id: item.os,
    label: item.os,
    selected: data.os.selected.map((i) => i.os).includes(item.os),
  }));

  return (
    <div style={{ maxWidth: '165px' }}>
      <CounterMultiselect
        i18n={{
          counterText: (count) => t(`OS ({{count}})`, { count }),
          noItems: t('__BUGS_OS_FILTER_ITEM_NO_ITEMS'),
        }}
        onChange={(selected) => {
          dispatch(
            updateFilters({
              filters: {
                os: selected.map((item) => ({
                  id: item.id,
                  os: item.label,
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
