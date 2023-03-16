import {
  Dropdown,
  Item,
  Menu,
  Select,
  Span,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { setGroupBy } from 'src/features/bugsPage/bugsPageSlice';
import { ReactComponent as Icon } from './assets/layers_icon.svg';
import { DropdownLabel } from './DropdownLabel';

export const GroupBy = () => {
  const groupBy = useAppSelector((state) => state.bugsPage.groupBy);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const groupByOptions: Array<typeof groupBy> = ['usecase'];
  const [label, setLabel] = useState<string>(groupByOptions[0]);

  const getTranslatedLabel = (view: string) => {
    switch (view) {
      case 'usecase':
        return t('__BUGS_GROUP_BY_USE_CASE');
      case 'ungrouped':
        return t('__BUGS_GROUP_BY_UNGROUPED');
      default:
        return t('__BUGS_GROUP_BY_OPEN_MENU');
    }
  };

  return (
    <div style={{ maxWidth: 'fit-content' }}>
      <Dropdown
        selectedItem={groupBy}
        onSelect={(item) => {
          setLabel(item);
          dispatch(setGroupBy(item));
        }}
      >
        <Field>
          <Select isCompact isPrimary>
            <DropdownLabel>
              <Icon />
              <Span>{getTranslatedLabel(label)}</Span>
            </DropdownLabel>
          </Select>
        </Field>
        <Menu>
          <Dropdown.HeaderItem>
            {t('__BUGS_GROUP_BY_OPEN_MENU')}:
          </Dropdown.HeaderItem>

          <Dropdown.Separator />

          <Item key="usecase" value="usecase">
            {t('__BUGS_GROUP_BY_USE_CASE_ITEM')}
          </Item>

          <Item key="ungrouped" value="ungrouped">
            {getTranslatedLabel('ungrouped')}
          </Item>
        </Menu>
      </Dropdown>
    </div>
  );
};
