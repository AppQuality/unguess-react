import { Select } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import {
  getCurrentCampaignData,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { useFilterData } from '../Drawer/useFilterData';

export const ReadFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const { counters } = useFilterData('read');
  const { t } = useTranslation();

  if (
    !data ||
    !counters ||
    !data.read ||
    !data.read.available ||
    !data.read.available.length
  )
    return null;

  return (
    <div style={{ minWidth: '130px' }}>
      <Select
        isCompact
        inputValue={data.read.selected ? data.read.selected : 'all'}
        selectionValue={data.read.selected ? data.read.selected : 'all'}
        isPrimary={data.read.selected === 'unread'}
        renderValue={({ inputValue }) => {
          switch (inputValue) {
            case 'unread':
              return t('__BUGS_READ_FILTER_ITEM_UNREAD');
            case 'all':
              return t('__BUGS_READ_FILTER_ITEM_PLACEHOLDER');
            default:
              return t('__BUGS_READ_FILTER_ITEM_PLACEHOLDER');
          }
        }}
        onSelect={(item) => {
          dispatch(
            updateFilters({
              filters: {
                read: item,
              },
            })
          );
        }}
      >
        <Select.Option value="all" label={t('__BUGS_READ_FILTER_ITEM_ALL')} />
        <Select.Option
          value="unread"
          label={t('__BUGS_READ_FILTER_ITEM_UNREAD')}
        />
      </Select>
    </div>
  );
};
