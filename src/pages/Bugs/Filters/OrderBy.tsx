import { Select } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/app/hooks';
import { ReactComponent as SortIcon } from 'src/assets/icons/sort-2.svg';
import { setOrder, setOrderBy } from 'src/features/bugsPage/bugsPageSlice';

export const SortBy = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const orderBy = useAppSelector((state) => state.bugsPage.orderBy);
  const order = useAppSelector((state) => state.bugsPage.order);

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
    <Select
      style={{ minWidth: '220px' }}
      inputValue={`${orderBy}-${order}`}
      selectionValue={`${orderBy}-${order}`}
      renderValue={({ inputValue }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <SortIcon />
          {getTranslatedLabel(inputValue || '')}
        </div>
      )}
      onSelect={(item) => {
        const [orderByValue, orderValue] = item.split('-');
        dispatch(setOrderBy(orderByValue as typeof orderBy));
        dispatch(setOrder(orderValue as typeof order));
      }}
      isCompact
      isPrimary
    >
      <Select.OptionGroup label={`${t('__BUGS_ORDER_BY')}:`}>
        <Select.OptionTitle>
          {t('__BUGS_PAGE_BUG_DETAIL_DETAILS_BUG_SEVERITY_LABEL')}
        </Select.OptionTitle>
        <Select.Option
          value="severity_id-DESC"
          label={t('__BUGS_ORDER_HIGHEST_TO_LOWEST')}
        />
        <Select.Option
          value="severity_id-ASC"
          label={t('__BUGS_ORDER_LOWEST_TO_HIGHEST')}
        />

        <Select.OptionTitle>
          {t('__BUGS_PAGE_BUG_DETAIL_PRIORITY_LABEL')}
        </Select.OptionTitle>
        <Select.Option
          value="priority_id-DESC"
          label={t('__BUGS_ORDER_HIGHEST_TO_LOWEST')}
        />
        <Select.Option
          value="priority_id-ASC"
          label={t('__BUGS_ORDER_LOWEST_TO_HIGHEST')}
        />
      </Select.OptionGroup>
    </Select>
  );
};
