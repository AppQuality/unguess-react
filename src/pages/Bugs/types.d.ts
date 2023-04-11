import { GetCampaignsByCidBugsApiResponse } from 'src/features/api';

type ApiBug = GetCampaignsByCidBugsApiResponse['items'];

export type TableBugType = ItemOfArray<ApiBug>;
export interface CounterItems {
  [key: string | number]: number;
}
export type BugItem = Bug & {
  tags?: { tag_id: number; tag_name: string }[] | undefined;
  siblings: number;
};
