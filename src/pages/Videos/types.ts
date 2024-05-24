import { GetCampaignsByCidVideosApiResponse } from 'src/features/api';

export type CampaignVideoResponseItem = ItemOfArray<
  GetCampaignsByCidVideosApiResponse['items']
>;

export type IUseCase = Pick<CampaignVideoResponseItem, 'usecase'>;
export type IVideo = ItemOfArray<CampaignVideoResponseItem['videos']>;
