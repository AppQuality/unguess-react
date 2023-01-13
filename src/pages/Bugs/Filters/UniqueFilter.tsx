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
          {data.unique.selected === 'all' ? t('All') : null}
          {data.unique.selected === 'unique' ? t('Unique') : null}
          {!data.unique.selected ? t('Placeholder') : null}
        </Select>
      </Field>
      <Menu>
        {data.unique.available.map((item) => (
          <Item value={item}>{item === 'unique' ? t('Unique') : t('All')}</Item>
        ))}
      </Menu>
    </Dropdown>
  );
};
