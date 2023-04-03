import { GetCampaignsByCidStatesApiResponse } from 'src/features/api';
import { TableBugType } from '../../../types';
import { BugByStateType } from '../types';

export const sortByStates = (
  bugs: TableBugType[],
  states: GetCampaignsByCidStatesApiResponse
) => {
  const bugsByStates: BugByStateType[] = states?.map((state) => ({
    state,
    bugs: [],
  }));
  bugs.forEach((bug) => {
    const bugState = bugsByStates.find(
      (item) => item.state.id === bug.state.id
    );
    bugState?.bugs.push(bug);
  });
  return bugsByStates;
};
