import { GetCampaignsByCidCustomStatusesApiResponse } from 'src/features/api';
import { TableBugType } from '../../../types';
import { BugByStateType } from '../types';

export const sortByStates = (
  bugs: TableBugType[],
  states: GetCampaignsByCidCustomStatusesApiResponse
) => {
  const bugsByStates: BugByStateType[] = states?.map((state) => ({
    state,
    bugs: [],
  }));
  bugs.forEach((bug) => {
    const bugState = bugsByStates.find(
      // (item) => item.state.id === bug.custom_status.id // todo: sostituire con custom_status
      (item) => item.state.id === bug.status.id
    );
    bugState?.bugs.push(bug);
  });
  return bugsByStates;
};
