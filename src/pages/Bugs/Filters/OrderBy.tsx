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
import { setOrder, setOrderBy } from 'src/features/bugsPage/bugsPageSlice';
import { useAppSelector } from 'src/app/hooks';
import { DropdownLabel } from './DropdownLabel';
import ItemGroup from './ItemGroup';

export const SortBy = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const orderBy = useAppSelector((state) => state.bugsPage.orderBy);
  const order = useAppSelector((state) => state.bugsPage.order);

  const [selected, setSelected] = useState<string>(`${orderBy}-${order}`);

  const getTranslatedLabel = (key: string) => {
    switch (key) {
      case 'severity_id-DESC':
        return t('__BUGS_PAGE_BUG_DETAIL_SEVERITY_TITLE_H_TO_L');
      case 'severity_id-ASC':
        return t('__BUGS_PAGE_BUG_DETAIL_SEVERITY_TITLE_L_TO_H');
      case 'priority_id-DESC':
        return t('__BUGS_PAGE_BUG_DETAIL_PRIORITY_TITLE_H_TO_L');
      case 'priority_id-ASC':
        return t('__BUGS_PAGE_BUG_DETAIL_PRIORITY_TITLE_L_TO_H');
      default:
        return t('__BUGS_ORDER_BY_OPEN_MENU');
    }
  };

  return (
    <Dropdown
      selectedItem={selected}
      onSelect={(item: string) => {
        const [orderByValue, orderValue] = item.split('-');
        dispatch(setOrderBy(orderByValue as typeof orderBy));
        dispatch(setOrder(orderValue as typeof order));
        setSelected(item);
      }}
    >
      <Field className="dropdown-sort-by">
        <Select isCompact isPrimary>
          <DropdownLabel>
            <SortIcon />
            <Span>{getTranslatedLabel(selected)}</Span>
          </DropdownLabel>
        </Select>
      </Field>
      <Menu>
        <Dropdown.HeaderItem>{t('__BUGS_ORDER_BY')}:</Dropdown.HeaderItem>
        <Dropdown.Separator />

        <ItemGroup
          title={t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_SEVERITY_LABEL')}
        >
          <Item
            key="severity_id-DESC"
            value="severity_id-DESC"
            className="dropdown-sort-by-severity-hight-to-low"
          >
            {t('__BUGS_ORDER_HIGHEST_TO_LOWEST')}
          </Item>
          <Item
            key="severity_id-ASC"
            value="severity_id-ASC"
            className="dropdown-sort-by-severity-low-to-hight"
          >
            {t('__BUGS_ORDER_LOWEST_TO_HIGHEST')}
          </Item>
        </ItemGroup>
        <ItemGroup title={t('__BUGS_PAGE_BUG_DETAIL_PRIORITY_LABEL')}>
          <Item
            key="priority_id-DESC"
            value="priority_id-DESC"
            className="dropdown-sort-by-priority-hight-to-low"
          >
            {t('__BUGS_ORDER_HIGHEST_TO_LOWEST')}
          </Item>

          <Item
            key="priority_id-ASC"
            value="priority_id-ASC"
            className="dropdown-sort-by-priority-low-to-hight"
          >
            {t('__BUGS_ORDER_LOWEST_TO_HIGHEST')}
          </Item>
        </ItemGroup>
      </Menu>
    </Dropdown>
  );
};
