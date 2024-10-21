import { Select } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { ReactComponent as Icon } from 'src/assets/icons/layers_icon.svg';
import { setGroupBy } from 'src/features/bugsPage/bugsPageSlice';

export const GroupBy = () => {
  const groupBy = useAppSelector((state) => state.bugsPage.groupBy);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const getTranslatedLabel = (view: string) => {
    switch (view) {
      case 'usecase':
        return t('__BUGS_GROUP_BY_USE_CASE');
      case 'bugState':
        return t('__BUGS_GROUP_BY_STATE');
      case 'ungrouped':
        return t('__BUGS_GROUP_BY_UNGROUPED');
      default:
        return t('__BUGS_GROUP_BY_OPEN_MENU');
    }
  };

  return (
    <Select
      style={{ minWidth: '140px' }}
      inputValue={groupBy}
      selectionValue={groupBy}
      renderValue={({ inputValue }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon />
          {getTranslatedLabel(inputValue || '')}
        </div>
      )}
      onSelect={(item) => {
        function isAGroupByOption(s: string): s is typeof groupBy {
          return ['usecase', 'bugState', 'ungrouped'].includes(s);
        }

        if (isAGroupByOption(item)) {
          dispatch(setGroupBy(item));
        }
      }}
      isCompact
      isPrimary
    >
      <Select.OptionGroup label={`${t('__BUGS_GROUP_BY_OPEN_MENU')}:`}>
        <Select.Option
          value="bugState"
          label={t('__BUGS_GROUP_BY_STATE_ITEM')}
        />
        <Select.Option
          value="usecase"
          label={t('__BUGS_GROUP_BY_USE_CASE_ITEM')}
        />
      </Select.OptionGroup>
      <Select.OptionGroup>
        <Select.Option
          value="ungrouped"
          label={getTranslatedLabel('ungrouped')}
        />
      </Select.OptionGroup>
    </Select>
  );
};
