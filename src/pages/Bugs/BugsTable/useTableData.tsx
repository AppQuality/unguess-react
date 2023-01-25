import { ColumnDefinitionType } from 'src/common/components/Table';
import { useTranslation } from 'react-i18next';
import { getSelectedFiltersIds } from 'src/features/bugsPage/bugsPageSlice';
import { useGetCampaignsByCidBugsQuery } from 'src/features/api';
import { TableBugType } from 'src/pages/Bugs/types';
import { BugBySeverityType, BugByUsecaseType, TableDatum } from './types';

export const useTableData = (campaignId: number) => {
  const { t } = useTranslation();
  const filterBy = getSelectedFiltersIds();
  const severities = [
    { id: 4, name: 'CRITICAL' },
    { id: 3, name: 'HIGH' },
    { id: 2, name: 'MEDIUM' },
    { id: 1, name: 'LOW' },
  ];
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

  const bugsByUsecase: BugByUsecaseType[] = [];
  const bugsBySeverity: BugBySeverityType[] = severities.map((severity) => ({
    severity,
    bugs: [],
  }));

  if (isLoading || isFetching || !bugs || !bugs.items) {
    return {
      columns,
      data: {
        allBugs: [],
        bugsByUseCases: [],
        bugsBySeverity: [],
      },
      isLoading: true,
    };
  }
  const sortByUsecase = (bug: TableBugType) => {
    if (typeof bug.application_section.title === 'undefined') return;
    const useCase = bugsByUsecase.find(
      (item) => item.useCase.title === bug.application_section.title
    );

    if (useCase) {
      useCase.bugs.push(bug);
    } else {
      bugsByUsecase.push({
        useCase: bug.application_section,
        bugs: [bug],
      });
    }
  };

  const sortBySeverity = (bug: TableBugType) => {
    const severity = bugsBySeverity.find(
      (item) =>
        item.severity.id === bug.severity.id ||
        item.severity.name.toLowerCase() === bug.severity.name.toLowerCase()
    );
    severity?.bugs.push(bug);
  };

  // sort bugs
  bugs.items.forEach((bug) => {
    sortBySeverity(bug);
    sortByUsecase(bug);
  });
  /* got the data */
  return {
    columns,
    data: {
      allBugs: bugs.items,
      bugsByUseCases: bugsByUsecase.sort((a, b) => {
        if (a.useCase.id && b.useCase.id) {
          if (a.useCase.id > b.useCase.id) {
            return 1;
          }
          if (a.useCase.id < b.useCase.id) {
            return -1;
          }
        }
        return 0;
      }),
      bugsBySeverity: bugsBySeverity.sort((a, b) => {
        if (a.severity.id && b.severity.id) {
          if (a.severity.id > b.severity.id) {
            return -1;
          }
          if (a.severity.id < b.severity.id) {
            return 1;
          }
        }
        return 0;
      }),
    },
    isLoading: false,
    filterBy,
  };
};
