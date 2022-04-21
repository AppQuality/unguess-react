import {
  Dropdown,
  Select,
  Menu,
  Item,
} from "@appquality/unguess-design-system";

import { Field } from "@zendeskgarden/react-dropdowns";
import { useTranslation } from "react-i18next";
import { DropdownItem, DropdownItems, getItemText } from "./utils";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { testTypeFilterChanged } from "src/features/campaignsFilter/campaignsFilterSlice";
import { selectTestNames } from "src/features/campaigns/campaignSlice";

export const TestTypeDropdown = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { testNameId } = useAppSelector((state) => state.filters);

  const items: DropdownItems = {
    0: {
      label: t("__DASHABOARD_CAMPAIGN_TEST_NAME_FILTER_ALL"),
      value: "all",
    },
  };

  const onSelectItem = (item: DropdownItem) => {
    dispatch(testTypeFilterChanged(Number(item.value)));
  };

  const availableTests = useAppSelector((state) => selectTestNames(state));

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
      selectedItem={items[testNameId]}
      onSelect={onSelectItem}
      downshiftProps={{
        itemToString: (item: DropdownItem) => item && item.value,
      }}
    >
      <Field>
        <Select {...(items[testNameId].value !== "all" && { isPrimary: true })}>
          {getItemText(
            items[testNameId],
            t("__DASHABOARD_CAMPAIGN_TEST_NAME_LABEL Max:10")
          )}
        </Select>
      </Field>
      <Menu hasArrow>
        {Object.keys(items).map((key) => (
          <Item key={items[key].value} value={items[key]}>
            {items[key].icon ?? ""}
            {" " + items[key].label}
          </Item>
        ))}
      </Menu>
    </Dropdown>
  );
};
