import {
  Dropdown,
  Select,
  Menu,
  Item,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import {
  getCurrentCampaignData,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
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
    <div style={{ width: '200px' }}>
      <Dropdown
        selectedItem={data.unique.selected ?? 'all'}
        onSelect={(item) => {
          dispatch(
            updateFilters({
              filters: {
                unique: item,
              },
            })
          );
        }}
      >
        <Field>
          <Select isCompact isPrimary={data.unique.selected === 'unique'}>
            {data.unique.selected === 'unique'
              ? t('__BUGS_UNIQUE_FILTER_ITEM_UNIQUE')
              : t('__BUGS_UNIQUE_FILTER_ITEM_PLACEHOLDER')}
          </Select>
        </Field>
        <Menu>
          {data.unique.available.map((item) => (
            <Item value={item} disabled={!counters[item as string]}>
              {item === 'unique'
                ? t('__BUGS_UNIQUE_FILTER_ITEM_UNIQUE')
                : t('__BUGS_UNIQUE_FILTER_ITEM_ALL')}
            </Item>
          ))}
        </Menu>
      </Dropdown>
    </div>
  );
};
