import { ColumnDefinitionType } from 'src/common/components/Table';
import { useTranslation } from 'react-i18next';
import { TableDatum } from '../types';
import { useCampaignBugs } from './useCampaignBugs';
import { useCampaignSeverities } from './useCampaignSeverities';
import { useCampaignUseCases } from './useCampaignUseCases';
import { sortBySeverity } from '../utils/sortBySeverity';
import { sortByUseCase } from '../utils/sortByUseCase';
import { sortById } from '../utils/sortById';

export const useTableData = (campaignId: number) => {
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

  // get  bugs accepted severities and usecases
  const { bugs, bugsError, bugsLoading } = useCampaignBugs(campaignId);
  const { severities, severitiesError, severitiesLoading } =
    useCampaignSeverities(campaignId);
  const { useCases, useCasesError, useCasesLoading } =
    useCampaignUseCases(campaignId);

  // if there is no data, return empty array
  if (
    bugsLoading ||
    severitiesLoading ||
    useCasesLoading ||
    !bugs ||
    !bugs.items
  ) {
    return {
      columns,
      campaignSeverities: severities,
      campaignUsecases: useCases,
      data: {
        allBugs: [],
        bugsByUseCases: [],
        bugsBySeverity: [],
      },
      isLoading: true,
      error: bugsError || severitiesError || useCasesError,
    };
  }

  const bugsBySeverity = sortBySeverity(bugs.items, severities);
  const bugsByUsecase = sortByUseCase(bugs.items, useCases);

  /* got the data */
  return {
    columns,
    data: {
      allBugs: bugs.items,
      bugsByUseCases: bugsByUsecase.sort((a, b) =>
        sortById(a.useCase.id, b.useCase.id)
      ),
      bugsBySeverity: bugsBySeverity.sort((a, b) =>
        sortById(a.severity.id, b.severity.id, 'DESC')
      ),
    },
    isLoading: false,
    error: bugsError || severitiesError || useCasesError,
  };
};
