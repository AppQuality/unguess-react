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
  const bugsPageSlice = useAppSelector((state) => state.bugsPage);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { pageView } = bugsPageSlice;
  const groupByOptions: Array<typeof pageView> = [
    'byUsecase',
    'bySeverity',
    'ungrouped',
  ];
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
    <div style={{ width: '160px' }}>
      <Dropdown
        selectedItem={pageView}
        onStateChange={(state) => {
          if (state.isOpen) {
            setLabel('groupBy');
          }
          if (state.isOpen === false && !state.selectedItem) {
            setLabel(pageView);
          }
          if (state.isOpen === false && state.selectedItem) {
            setLabel(state.selectedItem);
            dispatch(setPageView(state.selectedItem));
          }
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
          {groupByOptions.map((item) => (
            <Item key={item} value={item}>
              {getTranslatedLabel(item)}
            </Item>
          ))}
        </Menu>
      </Dropdown>
    </div>
  );
};
