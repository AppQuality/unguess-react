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
import { setPageView } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';
import { ReactComponent as Icon } from './assets/layers_icon.svg';

export const GroupBy = () => {
  const pageView = useAppSelector((state) => state.bugsPage.pageView);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const groupByOptions: Array<typeof pageView> = ['byUsecase', 'bySeverity'];
  const [label, setLabel] = useState<string>(groupByOptions[0]);

  const getTranslatedLabel = (view: string) => {
    switch (view) {
      case 'byUsecase':
        return t('__BUGS_GROUP_BY_USE_CASE', 'By use case');
      case 'bySeverity':
        return t('__BUGS_GROUP_BY_SEVERITY', 'By severity');
      case 'ungrouped':
        return t('__BUGS_GROUP_BY_UNGROUPED', 'Ungrouped');
      default:
        return t('__BUGS_GROUP_BY_OPEN_MENU', 'Group by');
    }
  };

  const SelectLabel = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space.xs};

    svg {
      flex-shrink: 0;
    }
  `;

  return (
    <div style={{ width: '180px' }}>
      <Dropdown
        selectedItem={pageView}
        onSelect={(item) => {
          setLabel(item);
          dispatch(setPageView(item));
        }}
      >
        <Field>
          <Select isCompact isPrimary>
            <SelectLabel>
              <Icon />
              <Span>{getTranslatedLabel(label)}</Span>
            </SelectLabel>
          </Select>
        </Field>
        <Menu>
          <Dropdown.HeaderItem>
            {t('__BUGS_GROUP_BY_OPEN_MENU')}:
          </Dropdown.HeaderItem>
          <Dropdown.Separator />
          {groupByOptions.map((item) => (
            <Item key={item} value={item}>
              {getTranslatedLabel(item)}
            </Item>
          ))}
          <Dropdown.Separator />
          <Item key="ungrouped" value="ungrouped">
            {getTranslatedLabel('ungrouped')}
          </Item>
        </Menu>
      </Dropdown>
    </div>
  );
};
