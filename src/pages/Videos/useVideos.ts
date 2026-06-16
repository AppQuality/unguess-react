import { useEffect, useState } from 'react';
import {
  GetCampaignsByCidUsecasesApiResponse,
  Observation,
  Video,
  useGetCampaignsByCidObservationsQuery,
  useGetCampaignsByCidUsecasesQuery,
  useGetCampaignsByCidVideosQuery,
} from 'src/features/api';
import {
  isVideoFormFactor,
  type VideoFormFactor,
} from 'src/common/video/getVideoDeviceLabel';

export type VideoWithObservations = Video & {
  observations: Observation[] | [];
} & {
  usecaseId: number;
  processingStatus?: 'processing' | 'ready' | 'error';
};
type ObservationWithMediaId = Observation & { mediaId: number };
type OrderedVideo = Record<VideoFormFactor, VideoWithObservations[]>;
type VideosWithTotal = OrderedVideo & { total: number };
const PROCESSING_POLLING_INTERVAL_MS = 120000;

export type CampaignVideos = Array<{
  usecase: GetCampaignsByCidUsecasesApiResponse[number];
  videos: VideosWithTotal;
}>;

export const useVideos = (cid: string) => {
  const [sorted, setSorted] = useState<CampaignVideos>();

  const {
    data,
    isFetching,
    isLoading,
    isError,
    refetch: refetchVideos,
  } = useGetCampaignsByCidVideosQuery({
    cid,
  });

  const {
    data: observations,
    isLoading: isLoadingObservations,
    isFetching: isFetchingObservations,
    isError: isErrorObservations,
    refetch: refetchObservations,
  } = useGetCampaignsByCidObservationsQuery({ cid });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      refetchVideos();
      refetchObservations();
    }, PROCESSING_POLLING_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [refetchVideos, refetchObservations]);

  const {
    data: usecases,
    isLoading: isLoadingUsecases,
    isFetching: isFetchingUsecases,
    isError: isErrorUsecases,
    refetch: refetchUsecases,
  } = useGetCampaignsByCidUsecasesQuery({ cid, filterBy: 'videos' });

  const totalVideos = data?.items.length ?? 0;

  useEffect(() => {
    if (totalVideos > 0 && usecases && usecases.length === 0) {
      refetchUsecases();
    }
  }, [totalVideos, usecases, refetchUsecases]);

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
            unknown: [],
            total: videos.length,
          },
        };

        videos.forEach((video) => {
          const rawDeviceType = video.device?.formFactor;
          const deviceType: VideoFormFactor = isVideoFormFactor(rawDeviceType)
            ? rawDeviceType
            : 'unknown';
          const videoWithObservations: VideoWithObservations = {
            ...video,
            observations: observationsByMediaId[video.id] || [],
          };
          ordered.videos[`${deviceType}`].push(videoWithObservations);
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
    totalVideos,
  };
};
