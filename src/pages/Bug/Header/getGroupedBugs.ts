import { GetCampaignsByCidBugsApiResponse } from 'src/features/api';
import { GroupBy } from 'src/features/bugsPage/bugsPageSlice';
import {
  BugByUsecaseType,
  BugByStateType,
} from 'src/pages/Bugs/Content/BugsTable/types';

export const getGroupedBugs = (
  groupBy: GroupBy | undefined,
  bugsByUseCases: BugByUsecaseType[],
  bugsByStates: BugByStateType[],
  ungroupedBugs: GetCampaignsByCidBugsApiResponse['items'],
  currentState?: number,
  currentUsecase?: number
) => {
  switch (groupBy) {
    case 'usecase':
      return bugsByUseCases.find(
        (useCaseBugs) => useCaseBugs.useCase.id === currentUsecase
      )?.bugs;
    case 'bugState': {
      return bugsByStates.find(
        (stateBugs) => stateBugs.state.id === currentState
      )?.bugs;
    }
    case 'ungrouped':
      return ungroupedBugs;
    default:
      return [];
  }
};
