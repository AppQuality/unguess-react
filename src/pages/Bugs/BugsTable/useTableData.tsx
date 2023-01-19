import { ColumnDefinitionType } from 'src/common/components/Table';
import { useTranslation } from 'react-i18next';
import { getSelectedFiltersIds } from 'src/features/bugsPage/bugsPageSlice';
import { useGetCampaignsByCidBugsQuery } from 'src/features/api';
import { TableDatum } from './types';
import { mapBugsToTableData } from './mapBugsToTableData';

export const useTableData = (campaignId: number) => {
  const { t } = useTranslation();
  const filterBy = getSelectedFiltersIds();
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

  const {
    isLoading,
    isFetching,
    data: bugs,
  } = useGetCampaignsByCidBugsQuery({
    cid: campaignId.toString() ?? '0',
    filterBy: {
      ...(filterBy?.types ? { types: filterBy.types.join(',') } : {}),
      ...(filterBy?.severities
        ? { severities: filterBy.severities.join(',') }
        : {}),
      ...(filterBy?.read && filterBy.read === 'unread'
        ? { read: 'false' }
        : {}),
      ...(filterBy?.unique && filterBy.unique === 'unique'
        ? { is_duplicated: '0' }
        : {}),
    },
    ...(filterBy?.search ? { search: filterBy.search } : {}),

    orderBy: 'severity_id',
    order: 'DESC',
  });

  if (isLoading || isFetching || !bugs || !bugs.items) {
    return {
      columns,
      data: {
        useCases: [],
        allBugs: [],
        bugsByUseCases: [],
      },
      isLoading: true,
    };
  }

  /* got the data */
  return {
    columns,
    data: {
      useCases: [],
      allBugs: [],
      bugsByUseCases: [
        {
          useCase: { id: '1', name: 'useCase1' },
          bugs: mapBugsToTableData(bugs, t),
        },
        {
          useCase: { id: '2', name: 'useCase2' },
          bugs: mapBugsToTableData(bugs, t),
        },
      ],
    },
    isLoading: false,
    filterBy,
  };
};
