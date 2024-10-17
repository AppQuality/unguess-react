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
  const { testNameId } = useAppSelector((state) => state.filters);

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

  return (
    <Select
      isPrimary={items[testNameId as number].value !== 'all'}
      renderValue={() =>
        getItemText(
          items[testNameId as number],
          t('__DASHABOARD_CAMPAIGN_TEST_NAME_LABEL Max:10')
        )
      }
      inputValue={items[testNameId as number].value}
      selectionValue={items[testNameId as number].value}
      onSelect={async (item) => {
        dispatch(testTypeFilterChanged(item === 'all' ? 0 : Number(item)));
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
