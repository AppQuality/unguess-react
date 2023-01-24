import {
  Button,
  Dropdown,
  Item,
  Menu,
  Select,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-dropdowns';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { setPageView } from 'src/features/bugsPage/bugsPageSlice';

export const GroupBy = () => {
  const bugsPageSlice = useAppSelector((state) => state.bugsPage);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { pageView } = bugsPageSlice;

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
            {pageView}
          </Select>
        </Field>
        <Menu>
          <Item value="byUsecase">{t('By use case')}</Item>
          <Item value="bySeverity">{t('By severity')}</Item>
          <Item value="ungrouped">{t('Ungrouped')}</Item>
        </Menu>
      </Dropdown>
    </div>
  );
};
