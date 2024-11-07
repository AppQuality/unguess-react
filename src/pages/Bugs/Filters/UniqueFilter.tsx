import { Select } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import {
  getCurrentCampaignData,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { useFilterData } from '../Drawer/useFilterData';

export const UniqueFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const { counters } = useFilterData('unique');
  const { t } = useTranslation();

  if (
    !data ||
    !counters ||
    !data.unique ||
    !data.unique.available ||
    !data.unique.available.length
  )
    return null;

  return (
    <Select
      isCompact
      isPrimary={data.unique.selected === 'unique'}
      inputValue={data.unique.selected ? data.unique.selected : 'all'}
      selectionValue={data.unique.selected ? data.unique.selected : 'all'}
      renderValue={() =>
        data.unique.selected === 'unique'
          ? t('__BUGS_UNIQUE_FILTER_ITEM_UNIQUE')
          : t('__BUGS_UNIQUE_FILTER_ITEM_PLACEHOLDER')
      }
      onSelect={async (item) => {
        dispatch(
          updateFilters({
            filters: {
              unique: item,
            },
          })
        );
      }}
    >
      {data.unique.available.map((item) => (
        <Select.Option
          value={item}
          label={
            item === 'unique'
              ? t('__BUGS_UNIQUE_FILTER_ITEM_UNIQUE')
              : t('__BUGS_UNIQUE_FILTER_ITEM_ALL')
          }
        />
      ))}
    </Select>
  );
};
