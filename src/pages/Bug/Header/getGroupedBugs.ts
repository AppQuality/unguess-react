import { GetCampaignsByCidBugsApiResponse } from 'src/features/api';
import { GroupBy } from 'src/features/bugsPage/bugsPageSlice';
import {
  BugByUsecaseType,
  BugByStateType,
} from 'src/pages/Bugs/Content/BugsTable/types';
import { Props } from '.';

export const getGroupedBugs = (
  groupBy: GroupBy | undefined,
  bugsByUseCases: BugByUsecaseType[],
  bugsByStates: BugByStateType[],
  ungroupedBugs: GetCampaignsByCidBugsApiResponse['items'],
  bug: Props['bug'],
  searchParams: URLSearchParams
) => {
  switch (groupBy) {
    case 'usecase':
      return bugsByUseCases.find(
        (useCaseBugs) => useCaseBugs.useCase.id === bug.application_section.id
      )?.bugs;
    case 'bugState': {
      const currentState =
        searchParams.get('currentState') || bug.custom_status.id;
      return bugsByStates.find(
        (stateBugs) => stateBugs.state.id === Number(currentState)
      )?.bugs;
    }
    case 'ungrouped':
      return ungroupedBugs;
    default:
      return [];
  }
};
