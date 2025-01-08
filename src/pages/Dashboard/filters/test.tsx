import { Select } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { TestName } from 'src/features/campaigns';
import { testTypeFilterChanged } from 'src/features/campaignsFilter/campaignsFilterSlice';
import { DropdownItems, getItemText } from './utils';

export const TestTypeDropdown = ({
  availableTests,
}: {
  availableTests: TestName[];
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { testType } = useAppSelector((state) => state.filters);

  const items: DropdownItems = {
    0: {
      label: t('__DASHABOARD_CAMPAIGN_TEST_NAME_FILTER_ALL'),
      value: 'all',
    },
  };

  if (availableTests.length) {
    availableTests.forEach((test) => {
      items[test.value] = {
        label: test.label,
        value: test.value,
      };
    });
  }

  const selectedItem = items[testType.value] || testType;

  return (
    <Select
      isPrimary={selectedItem.value !== 'all'}
      renderValue={() =>
        getItemText(
          selectedItem,
          t('__DASHABOARD_CAMPAIGN_TEST_NAME_LABEL Max:10')
        )
      }
      inputValue={selectedItem.value}
      selectionValue={selectedItem.value}
      onSelect={async (item) => {
        if (items[Number.parseInt(item, 10)]) {
          dispatch(testTypeFilterChanged(items[Number.parseInt(item, 10)]));
        }
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
