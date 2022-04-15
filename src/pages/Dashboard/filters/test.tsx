import {
  Dropdown,
  Select,
  Menu,
  Item,
} from "@appquality/unguess-design-system";

import { Field } from "@zendeskgarden/react-dropdowns";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DropdownItem, getItemText } from "./utils";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { testTypeFilterChanged } from "src/features/campaignsFilter/campaignsFilterSlice";
import { selectTestNames } from "src/features/campaigns/campaignSlice";


export const TestTypeDropdown = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const items: DropdownItem[] = [
    {
      label: t("__DASHABOARD_CAMPAIGN_TEST_NAME_FILTER_ALL"),
      value: "all",
    }
  ];

  const [selectedItem, setSelectedItem] = useState(items[0]);

  const onSelectItem = (item: DropdownItem) => {
    setSelectedItem(item);
    dispatch(testTypeFilterChanged(Number(item.value)));
  };

  const availableTests = useAppSelector((state) => selectTestNames(state)); 

  if(availableTests.length) {
    availableTests.forEach(test => {
      items.push({
        label: test.label,
        value: test.value
      })
    })
  }

  return (
    <Dropdown
      selectedItem={selectedItem}
      onSelect={onSelectItem}
      downshiftProps={{
        itemToString: (item: DropdownItem) => item && item.value,
      }}
    >
      <Field>
        <Select {...selectedItem.value !== "all" && {isPrimary: true}}>
          {getItemText(selectedItem, t("__DASHABOARD_CAMPAIGN_TEST_NAME_LABEL Max:10"))}
        </Select>
      </Field>
      <Menu hasArrow>
        {items.map((item) => (
          <Item key={item.value} value={item}>
            {item.icon ?? ""}
            {" " + item.label}
          </Item>
        ))}
      </Menu>
    </Dropdown>
  );
};