import {
  Dropdown,
  DropdownField as Field,
  Item,
  Select,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { typeFilterChanged } from 'src/features/campaignsFilter/campaignsFilterSlice';
import { UgMenu } from './styledMenu';
import { DropdownItem, DropdownItems, getItemText } from './utils';

export const CampaignTypeDropdown = ({
  availableTypes,
}: {
  availableTypes: string[];
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { type } = useAppSelector((state) => state.filters);

  const items: DropdownItems = {
    all: {
      label: t('__DASHABOARD_CAMPAIGN_TYPE_FILTER_ALL'),
      value: 'all',
    },
    functional: {
      label: t('__DASHABOARD_CAMPAIGN_TYPE_FILTER_FUNCTIONAL'),
      value: 'functional',
    },
    experiential: {
      label: t('__DASHABOARD_CAMPAIGN_TYPE_FILTER_EXPERIENTIAL'),
      value: 'experiential',
    },
  };

  const onSelectItem = (item: DropdownItem) => {
    dispatch(typeFilterChanged(item.value));
  };

  return (
    <Dropdown
      selectedItem={items[`${type}`]}
      onSelect={onSelectItem}
      downshiftProps={{
        itemToString: (item: DropdownItem) => item && item.value,
      }}
    >
      <Field>
        <Select {...(items[`${type}`].value !== 'all' && { isPrimary: true })}>
          {getItemText(
            items[`${type}`],
            t('__DASHABOARD_CAMPAIGN_CAMPAIGN_TYPE_FILTER_LABEL Max:10')
          )}
        </Select>
      </Field>
      <UgMenu hasArrow>
        {Object.keys(items).map((key) => (
          <Item
            key={items[`${key}`].value}
            value={items[`${key}`]}
            {...(availableTypes.indexOf(items[`${key}`].value) === -1 && {
              disabled: true,
            })}
          >
            {items[`${key}`].label}
          </Item>
        ))}
      </UgMenu>
    </Dropdown>
  );
};
