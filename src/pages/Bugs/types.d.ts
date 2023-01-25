import { GetCampaignsByCidBugsApiResponse } from 'src/features/api';

type ApiBug = GetCampaignsByCidBugsApiResponse['items'];

export type TableBugType = ItemOfArray<ApiBug>;
