import { ColumnDefinitionType } from 'src/common/components/Table';
import { useTranslation } from 'react-i18next';
import { TableDatum } from '../types';

export const useTableColumns = () => {
  const { t } = useTranslation();
  const columns: ColumnDefinitionType<TableDatum, keyof TableDatum>[] = [
    {
      key: 'title',
      header: t('__BUGS_TABLE_TITLE_HEADER_COLUMN'),
      width: 'auto',
      textAlign: 'left',
    },
    {
      key: 'siblings',
      header: t('__BUGS_TABLE_DUPLICATE_HEADER_COLUMN'),
      width: '90px',
      textAlign: 'center',
    },
    {
      key: 'severity',
      header: t('__BUGS_TABLE_SEVERITY_HEADER_COLUMN'),
      width: '90px',
      textAlign: 'center'
    },
    {
      key: 'priority',
      header: t('__BUGS_TABLE_PRIORITY_HEADER_COLUMN'),
      width: '90px',
      textAlign: 'center'
    },
    {
      key: 'bugId',
      header: t('__BUGS_TABLE_BUG_ID_HEADER_COLUMN'),
      width: '80px',
      textAlign: 'right'
    },
  ];

  return {
    columns,
  };
};
