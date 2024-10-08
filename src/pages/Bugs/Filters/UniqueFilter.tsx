import {
  Dropdown,
  DropdownField as Field,
  Item,
  Menu,
  Select,
} from '@appquality/unguess-design-system';
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
      <Field className="dropdown-unique-bugs">
        <Select isCompact isPrimary={data.unique.selected === 'unique'}>
          {data.unique.selected === 'unique'
            ? t('__BUGS_UNIQUE_FILTER_ITEM_UNIQUE')
            : t('__BUGS_UNIQUE_FILTER_ITEM_PLACEHOLDER')}
        </Select>
      </Field>
      <Menu>
        {data.unique.available.map((item) => (
          <Item
            className={`dropdown-unique-bugs-item-${
              item === 'unique' ? 'unique' : 'all'
            }`}
            value={item}
            disabled={!counters[item as string]}
          >
            {item === 'unique'
              ? t('__BUGS_UNIQUE_FILTER_ITEM_UNIQUE')
              : t('__BUGS_UNIQUE_FILTER_ITEM_ALL')}
          </Item>
        ))}
      </Menu>
    </Dropdown>
  );
};
