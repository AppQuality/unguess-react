import { Select } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { typeFilterChanged } from 'src/features/campaignsFilter/campaignsFilterSlice';
import { DropdownItems, getItemText } from './utils';

export const CampaignTypeDropdown = () => {
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

  return (
    <Select
      isPrimary={items[`${type}`].value !== 'all'}
      renderValue={() =>
        getItemText(
          items[`${type}`],
          t('__DASHABOARD_CAMPAIGN_CAMPAIGN_TYPE_FILTER_LABEL Max:10')
        )
      }
      inputValue={items[`${type}`].value}
      selectionValue={items[`${type}`].value}
      onSelect={async (item) => {
        dispatch(typeFilterChanged(item));
      }}
    >
      {Object.keys(items).map((key) => (
        <Select.Option
          key={items[`${key}`].value}
          value={items[`${key}`].value}
          label={items[`${key}`].label}
        />
      ))}
    </Select>
  );
};
