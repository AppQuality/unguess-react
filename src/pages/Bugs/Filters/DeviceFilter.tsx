import { CounterMultiselect } from '@appquality/unguess-design-system';
import {
  getCurrentCampaignData,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';

export const DeviceFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const { t } = useTranslation();

  if (
    !data ||
    !data.devices ||
    !data.devices.available ||
    !data.devices.available.length
  )
    return null;

  const options = data.devices.available.map((item) => ({
    id: item.device,
    label: item.device,
    selected: data.devices.selected.map((i) => i.device).includes(item.device),
  }));

  return (
    <div>
      <CounterMultiselect
        isCompact
        i18n={{
          counterText: (count) => t(`Devices ({{count}})`, { count }),
          noItems: t('__BUGS_DEVICES_FILTER_ITEM_NO_ITEMS'),
        }}
        onChange={(selected) => {
          dispatch(
            updateFilters({
              filters: {
                devices: selected.map((item) => ({
                  id: item.id,
                  device: item.label,
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
