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
    },
    {
      key: 'severity',
      header: t('__BUGS_TABLE_SEVERITY_HEADER_COLUMN'),
      width: '90px',
    },
    {
      key: 'bugId',
      header: t('__BUGS_TABLE_BUG_ID_HEADER_COLUMN'),
      width: '90px',
    },
  ];

  return {
    columns,
  };
};
