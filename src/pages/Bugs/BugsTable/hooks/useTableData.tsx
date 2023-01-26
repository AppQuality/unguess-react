import { useCampaignBugs } from './useCampaignBugs';
import { useCampaignSeverities } from './useCampaignSeverities';
import { useCampaignUseCases } from './useCampaignUseCases';
import { sortBySeverity } from '../utils/sortBySeverity';
import { sortByUseCase } from '../utils/sortByUseCase';
import { sortById } from '../utils/sortById';

export const useTableData = (campaignId: number) => {
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
