import { GetCampaignsByCidCustomStatusesApiResponse } from 'src/features/api';
import { TableBugType } from '../../../types';
import { BugByStateType } from '../types';

export const sortByStates = (
  bugs: TableBugType[],
  states: GetCampaignsByCidCustomStatusesApiResponse
) => {
  const sortedStates = states.slice().sort((a, b) => a.id - b.id);
  const bugsByStates: BugByStateType[] = sortedStates.map((state) => ({
    state,
    bugs: [],
  }));
  bugs.forEach((bug) => {
    const bugState = bugsByStates.find(
      (item) => item.state.id === bug.custom_status.id
    );
    bugState?.bugs.push(bug);
  });
  return bugsByStates;
};
