import { Span } from "@appquality/unguess-design-system";

export interface DropdownItems {
  [key: string]: DropdownItem;
}
export interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactElement;
}

export const getItemText = (selectedItem: DropdownItem, label: string) => {
  if (selectedItem.value === "all") return selectedItem.label;

  let icon = selectedItem.icon ? selectedItem.icon : "";

  return (
    <>
      {label}: {icon} <Span isBold>{selectedItem.label}</Span>
    </>
  );
};
