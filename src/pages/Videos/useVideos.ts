import { useEffect, useState } from 'react';
import {
  GetCampaignsByCidUsecasesApiResponse,
  Observation,
  Video,
  useGetCampaignsByCidObservationsQuery,
  useGetCampaignsByCidUsecasesQuery,
  useGetCampaignsByCidVideosQuery,
} from 'src/features/api';

// eslint-disable-next-line
enum DeviceTypeEnum {
  smartphone = 'smartphone',
  tablet = 'tablet',
  desktop = 'desktop',
  other = 'other',
}
export type VideoWithObservations = Video & {
  observations: Observation[] | [];
} & {
  usecaseId: number;
};
type ObservationWithMediaId = Observation & { mediaId: number };
type OrderedVideo = Record<DeviceTypeEnum, VideoWithObservations[]>;
type VideosWithTotal = OrderedVideo & { total: number };

export type CampaignVideos = Array<{
  usecase: GetCampaignsByCidUsecasesApiResponse[number];
  videos: VideosWithTotal;
}>;

export const useVideos = (cid: string) => {
  const [sorted, setSorted] = useState<CampaignVideos>();

  const { data, isFetching, isLoading, isError } =
    useGetCampaignsByCidVideosQuery({
      cid,
    });

  const {
    data: observations,
    isLoading: isLoadingObservations,
    isFetching: isFetchingObservations,
    isError: isErrorObservations,
  } = useGetCampaignsByCidObservationsQuery({ cid });

  const {
    data: usecases,
    isLoading: isLoadingUsecases,
    isFetching: isFetchingUsecases,
    isError: isErrorUsecases,
  } = useGetCampaignsByCidUsecasesQuery({ cid, filterBy: 'videos' });

  useEffect(() => {
    if (data && data.items && observations && usecases) {
      if (observations.kind !== 'ungrouped') return;
      const observationsByMediaId = observations.results.reduce(
        (acc, observation) => {
          if (!acc[observation.mediaId]) {
            acc[observation.mediaId] = [];
          }
          acc[observation.mediaId].push(observation);
          return acc;
        },
        {} as { [key: number]: ObservationWithMediaId[] }
      );

      const videosByUsecase = usecases.map((usecase) => {
        const videos = data.items.filter(
          (item) => item.usecaseId === usecase.id
        );

        const ordered: {
          usecase: GetCampaignsByCidUsecasesApiResponse[number];
          videos: VideosWithTotal;
        } = {
          usecase,
          videos: {
            smartphone: [],
            tablet: [],
            desktop: [],
            other: [],
            total: videos.length,
          },
        };

        videos.forEach((video) => {
          const deviceType = video.tester.device.type as DeviceTypeEnum;
          const videoWithObservations: VideoWithObservations = {
            ...video,
            observations: observationsByMediaId[video.id] || [],
          };
          // eslint-disable-next-line
          ordered.videos[deviceType].push(videoWithObservations);
        });

        return ordered;
      });

      setSorted(videosByUsecase);
    }
  }, [data, observations, usecases]);

  return {
    isFetching: isFetching || isFetchingObservations || isFetchingUsecases,
    isLoading: isLoading || isLoadingObservations || isLoadingUsecases,
    isError: isError || isErrorObservations || isErrorUsecases,
    sorted,
  };
};
