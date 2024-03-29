import { Dropdown, Select, Item } from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { testTypeFilterChanged } from 'src/features/campaignsFilter/campaignsFilterSlice';
import { TestName } from 'src/features/campaigns';
import { DropdownItem, DropdownItems, getItemText } from './utils';
import { UgMenu } from './styledMenu';

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

  const onSelectItem = (item: DropdownItem) => {
    dispatch(
      testTypeFilterChanged(item.value === 'all' ? 0 : Number(item.value))
    );
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
    <Dropdown
      selectedItem={items[testNameId as number]}
      onSelect={onSelectItem}
      downshiftProps={{
        itemToString: (item: DropdownItem) => item && item.value,
      }}
    >
      <Field>
        <Select
          {...(items[testNameId as number].value !== 'all' && {
            isPrimary: true,
          })}
        >
          {getItemText(
            items[testNameId as number],
            t('__DASHABOARD_CAMPAIGN_TEST_NAME_LABEL Max:10')
          )}
        </Select>
      </Field>
      <UgMenu hasArrow>
        {Object.keys(items).map((key) => (
          <Item key={items[`${key}`].value} value={items[`${key}`]}>
            {items[`${key}`].icon ?? ''}
            {` ${items[`${key}`].label}`}
          </Item>
        ))}
      </UgMenu>
    </Dropdown>
  );
};
