import { GetCampaignsByCidVideoApiResponse } from 'src/features/api';

export type CampaignVideoResponseItem = ItemOfArray<
  GetCampaignsByCidVideoApiResponse['items']
>;

export type IUseCase = Pick<CampaignVideoResponseItem, 'usecase'>;
export type IVideo = ItemOfArray<CampaignVideoResponseItem['videos']>;
