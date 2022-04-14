import {
  Dropdown,
  Select,
  Menu,
  Item,
  Label,
  Span,
  MediaItem,
  MediaFigure,
  MediaBody,
  theme,
} from "@appquality/unguess-design-system";

import { ReactComponent as CircleFill } from "src/assets/icons/circle-full-fill.svg";
import { Field } from "@zendeskgarden/react-dropdowns";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Circle = styled(CircleFill)`
    width: auto;
    height: 100%;
    max-height: 10px;
`;

export const StatusDropdown = () => {
  const { t } = useTranslation();

  const items = [
    {
      label: t("__DASHABOARD_CAMPAIGN_STATUS_FILTER_ALL"),
      value: "all",
    },
    {
      icon: <Circle color={theme.palette.azure[600]}/>,
      label: t("__DASHABOARD_CAMPAIGN_STATUS_FILTER_INCOMING"),
      value: "incoming",
    },
    { icon: <Circle color={theme.palette.yellow[600]}/>, label: t("__DASHABOARD_CAMPAIGN_STATUS_FILTER_PROGRESS"), value: "progress" },
    { icon: <Circle color={theme.palette.green[600]}/>, label: t("__DASHABOARD_CAMPAIGN_STATUS_FILTER_COMPLETED"), value: "completed" },
  ];

  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <Dropdown
      selectedItem={selectedItem}
      onSelect={setSelectedItem}
      downshiftProps={{
        itemToString: (item: {
          label: string;
          icon: React.ReactChild;
          value: string;
        }) => item && item.value,
      }}
    >
      <Field>
        <Label>Status</Label>
        <Select>{selectedItem.icon ?? ""}{" " + selectedItem.label}</Select>
      </Field>
      <Menu hasArrow>
        {items.map((item) => (
          <Item key={item.value} value={item}>
            {item.icon ?? ""}{" " + item.label}
          </Item>
        ))}
      </Menu>
    </Dropdown>
  );
};
