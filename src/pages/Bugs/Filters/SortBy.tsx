import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Dropdown,
  Item,
  Menu,
  Select,
  Span,
} from '@appquality/unguess-design-system';
import { ReactComponent as SortIcon } from 'src/assets/icons/sort-2.svg';
import { Field } from '@zendeskgarden/react-dropdowns';
import {
  DEFAULT_ORDER_BY,
  SEVERITY_ORDER__HIGH__TO__LOW,
  SEVERITY_ORDER__LOW__TO__HIGH,
  PRIORITY_ORDER__HIGH__TO__LOW,
  PRIORITY_ORDER__LOW__TO__HIGH,
} from 'src/constants';
import { setOrder, setOrderBy } from 'src/features/bugsPage/bugsPageSlice';
import { DropdownLabel } from './DropdownLabel';
import ItemGroup from './ItemGroup';

export const availableSelections = [
  SEVERITY_ORDER__HIGH__TO__LOW,
  SEVERITY_ORDER__LOW__TO__HIGH,
  PRIORITY_ORDER__HIGH__TO__LOW,
  PRIORITY_ORDER__LOW__TO__HIGH,
];

export const SortBy = () => {
  const { t } = useTranslation();
  const makeTitle = (fieldName: string): string => {
    const t_fieldName = t(fieldName);
    return `${t('__BUGS_ORDER_BY')} ${
      t_fieldName.charAt(0).toUpperCase() + t_fieldName.slice(1)
    }`;
  };
  const [selected, setSelected] = useState(DEFAULT_ORDER_BY);
  const dispatch = useDispatch();

  return (
    <Dropdown
      selectedItem={selected.key}
      onSelect={(selectedKey: string) => {
        availableSelections.map(
          (availableSelection) =>
            availableSelection.key === selectedKey &&
            (() => {
              dispatch(setOrderBy(availableSelection.orderBy));
              dispatch(setOrder(availableSelection.order));
              return setSelected(availableSelection);
            })()
        );
      }}
    >
      <Field>
        <Select isCompact isPrimary>
          <DropdownLabel>
            <SortIcon />
            <Span>{makeTitle(selected.displayName)}</Span>
          </DropdownLabel>
        </Select>
      </Field>
      <Menu>
        <Dropdown.HeaderItem>{t('__BUGS_ORDER_BY')}:</Dropdown.HeaderItem>
        <Dropdown.Separator />

        <ItemGroup title={t(SEVERITY_ORDER__HIGH__TO__LOW.displayName)}>
          <Item
            key={SEVERITY_ORDER__HIGH__TO__LOW.key}
            value={SEVERITY_ORDER__HIGH__TO__LOW.key}
          >
            {t(SEVERITY_ORDER__HIGH__TO__LOW.orderName)}
          </Item>
          <Item
            key={SEVERITY_ORDER__LOW__TO__HIGH.key}
            value={SEVERITY_ORDER__LOW__TO__HIGH.key}
          >
            {t(SEVERITY_ORDER__LOW__TO__HIGH.orderName)}
          </Item>
        </ItemGroup>
        <ItemGroup title={t(PRIORITY_ORDER__HIGH__TO__LOW.displayName)}>
          <Item
            key={PRIORITY_ORDER__HIGH__TO__LOW.key}
            value={PRIORITY_ORDER__HIGH__TO__LOW.key}
          >
            {t(PRIORITY_ORDER__HIGH__TO__LOW.orderName)}
          </Item>

          <Item
            key={PRIORITY_ORDER__LOW__TO__HIGH.key}
            value={PRIORITY_ORDER__LOW__TO__HIGH.key}
          >
            {t(PRIORITY_ORDER__LOW__TO__HIGH.orderName)}
          </Item>
        </ItemGroup>
      </Menu>
    </Dropdown>
  );
};
