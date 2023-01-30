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

export const ReadFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const { t } = useTranslation();

  if (
    !data ||
    !data.read ||
    !data.read.available ||
    !data.read.available.length
  )
    return null;

  return (
    <div style={{ width: '150px' }}>
      <Dropdown
        selectedItem={data.read.selected ?? 'all'}
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
        <Field>
          <Select isCompact isPrimary={data.read.selected === 'unread'}>
            {data.read.selected === 'unread'
              ? t('__BUGS_READ_FILTER_ITEM_UNREAD')
              : t('__BUGS_READ_FILTER_ITEM_PLACEHOLDER')}
          </Select>
        </Field>
        <Menu>
          {data.read.available.map((item) => (
            <Item value={item}>
              {item === 'unread'
                ? t('__BUGS_READ_FILTER_ITEM_UNREAD')
                : t('__BUGS_READ_FILTER_ITEM_ALL')}
            </Item>
          ))}
        </Menu>
      </Dropdown>
    </div>
  );
};
