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

export const UniqueFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const { t } = useTranslation();

  if (
    !data ||
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
      <Field>
        <Select isPrimary={!!data.unique.selected}>
          {data.unique.selected === 'all'
            ? t('__BUGS_UNIQUE_FILTER_ITEM_ALL')
            : null}
          {data.unique.selected === 'unique'
            ? t('__BUGS_UNIQUE_FILTER_ITEM_UNIQUE')
            : null}
          {!data.unique.selected
            ? t('__BUGS_UNIQUE_FILTER_ITEM_PLACEHOLDER')
            : null}
        </Select>
      </Field>
      <Menu>
        {data.unique.available.map((item) => (
          <Item value={item}>
            {item === 'unique'
              ? t('__BUGS_UNIQUE_FILTER_ITEM_UNIQUE')
              : t('__BUGS_UNIQUE_FILTER_ITEM_ALL')}
          </Item>
        ))}
      </Menu>
    </Dropdown>
  );
};
