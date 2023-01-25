import {
  Dropdown,
  Item,
  Menu,
  Select,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
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
  const broupByOptions: Array<typeof pageView> = [
    'byUsecase',
    'bySeverity',
    'ungrouped',
  ];

  const label = (view: typeof pageView) => {
    switch (view) {
      case 'byUsecase':
        return t('__BUGS_GROUP_BY_USE_CASE', 'By use case');
      case 'bySeverity':
        return t('__BUGS_GROUP_BY_SEVERITY', 'By severity');
      case 'ungrouped':
        return t('__BUGS_GROUP_BY_UNGROUPED', 'Ungrouped');
      default:
        return null;
    }
  };

  const SelectLabel = styled.span`
    display: flex;
    align-items: center;
    svg {
      margin-right: 8px;
    }
  `;
  return (
    <div>
      <Dropdown
        selectedItem={pageView}
        onSelect={(view) => {
          dispatch(setPageView(view));
        }}
      >
        <Field>
          <Select isCompact isPrimary>
            <SelectLabel>
              <Icon /> {label(pageView)}
            </SelectLabel>
          </Select>
        </Field>
        <Menu>
          {broupByOptions.map((item) => (
            <Item key={item} value={item}>
              {label(item)}
            </Item>
          ))}
        </Menu>
      </Dropdown>
    </div>
  );
};
