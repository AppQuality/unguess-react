import { Span } from '@appquality/unguess-design-system';

export interface DropdownItems {
  [key: string]: DropdownItem;
}
interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactElement;
}

export const getItemText = (selectedItem: DropdownItem, label: string) => {
  if (selectedItem.value === 'all' || selectedItem.value === '0')
    return selectedItem.label;

  const icon = selectedItem.icon ? selectedItem.icon : '';

  return (
    <>
      {label}: {icon} <Span isBold>{selectedItem.label}</Span>
    </>
  );
};
