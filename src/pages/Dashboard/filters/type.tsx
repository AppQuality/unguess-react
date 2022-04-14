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
import { typeFilterChanged } from "src/features/campaignsFilter/campaignsFilterSlice";
import { selectTypes } from "src/features/campaigns/campaignSlice";

export const CampaignTypeDropdown = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const items: DropdownItem[] = [
    {
      label: t("__DASHABOARD_CAMPAIGN_TYPE_FILTER_ALL"),
      value: "all",
    },
    {
      label: t("__DASHABOARD_CAMPAIGN_TYPE_FILTER_FUNCTIONAL"),
      value: "functional",
    },
    {
      label: t("__DASHABOARD_CAMPAIGN_TYPE_FILTER_EXPERIENTIAL"),
      value: "experiential",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(items[0]);

  const onSelectItem = (item: DropdownItem) => {
    setSelectedItem(item);
    dispatch(typeFilterChanged(item.value));
  };

  const availableTypes = useAppSelector((state) => selectTypes(state)); 

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
          {getItemText(selectedItem, t("__DASHABOARD_CAMPAIGN_CAMPAIGN_TYPE_FILTER_LABEL Max:10"))}
        </Select>
      </Field>
      <Menu hasArrow>
        {items.map((item) => (
          <Item key={item.value} value={item} {...availableTypes.indexOf(item.value) === -1 && {disabled: true}}>
            {item.label}
          </Item>
        ))}
      </Menu>
    </Dropdown>
  );
};