import {
  Dropdown,
  Select,
  Menu,
  Item,
  theme,
} from "@appquality/unguess-design-system";

import { ReactComponent as CircleFill } from "src/assets/icons/circle-full-fill.svg";
import { Field } from "@zendeskgarden/react-dropdowns";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { DropdownItem, getItemText } from "./utils";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { statusFilterChanged } from "src/features/campaignsFilter/campaignsFilterSlice";
import {
  CampaignStatus,
  selectStatuses,
} from "src/features/campaigns/campaignSlice";

const Circle = styled(CircleFill)`
  width: auto;
  height: 100%;
  max-height: 10px;
  margin: 0 2px;
`;

export const StatusDropdown = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const items: DropdownItem[] = [
    {
      label: t("__DASHABOARD_CAMPAIGN_STATUS_FILTER_ALL"),
      value: "all",
    },
    {
      icon: <Circle color={theme.palette.azure[600]} />,
      label: t("__DASHABOARD_CAMPAIGN_STATUS_FILTER_INCOMING"),
      value: CampaignStatus.Incoming,
    },
    {
      icon: <Circle color={theme.palette.yellow[600]} />,
      label: t("__DASHABOARD_CAMPAIGN_STATUS_FILTER_PROGRESS"),
      value: CampaignStatus.Running,
    },
    {
      icon: <Circle color={theme.palette.green[600]} />,
      label: t("__DASHABOARD_CAMPAIGN_STATUS_FILTER_COMPLETED"),
      value: CampaignStatus.Completed,
    },
  ];

  const [selectedItem, setSelectedItem] = useState(items[0]);

  const onSelectItem = (item: DropdownItem) => {
    setSelectedItem(item);
    dispatch(statusFilterChanged(item.value));
  };

  const availableStatuses = useAppSelector((state) => selectStatuses(state));

  return (
    <Dropdown
      selectedItem={selectedItem}
      onSelect={onSelectItem}
      downshiftProps={{
        itemToString: (item: DropdownItem) => item && item.value,
      }}
    >
      <Field>
        <Select {...(selectedItem.value !== "all" && { isPrimary: true })}>
          {getItemText(
            selectedItem,
            t("__DASHABOARD_CAMPAIGN_STATUS_FILTER_LABEL Max:10")
          )}
        </Select>
      </Field>
      <Menu hasArrow>
        {items.map((item) => (
          <Item
            key={item.value}
            value={item}
            {...(availableStatuses.indexOf(item.value) === -1 && {
              disabled: true,
            })}
          >
            {item.icon ?? ""}
            {" " + item.label}
          </Item>
        ))}
      </Menu>
    </Dropdown>
  );
};
