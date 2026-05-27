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
  processingStatus?: 'processing' | 'ready' | 'error';
};
type ObservationWithMediaId = Observation & { mediaId: number };
type OrderedVideo = Record<DeviceTypeEnum, VideoWithObservations[]>;
type VideosWithTotal = OrderedVideo & { total: number };
const PROCESSING_POLLING_INTERVAL_MS = 120000;

export type CampaignVideos = Array<{
  usecase: GetCampaignsByCidUsecasesApiResponse[number];
  videos: VideosWithTotal;
}>;

export const useVideos = (cid: string) => {
  const [sorted, setSorted] = useState<CampaignVideos>();

  const { data, isFetching, isLoading, isError, refetch } =
    useGetCampaignsByCidVideosQuery({
      cid,
    });

  const processingVideosCount =
    data?.items.reduce(
      (count, video) =>
        video.processingStatus === 'processing' ? count + 1 : count,
      0
    ) ?? 0;

  useEffect(() => {
    if (processingVideosCount <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      refetch();
    }, PROCESSING_POLLING_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [processingVideosCount, refetch]);

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
          const rawDeviceType = video.tester?.device?.type;
          const deviceType: DeviceTypeEnum =
            rawDeviceType === DeviceTypeEnum.smartphone ||
            rawDeviceType === DeviceTypeEnum.tablet ||
            rawDeviceType === DeviceTypeEnum.desktop
              ? (rawDeviceType as DeviceTypeEnum)
              : DeviceTypeEnum.other;
          const videoWithObservations: VideoWithObservations = {
            ...video,
            observations: observationsByMediaId[video.id] || [],
          };
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
