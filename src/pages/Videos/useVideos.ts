import { useEffect, useState } from 'react';
import {
  GetCampaignsByCidVideoApiResponse,
  Video,
  useGetCampaignsByCidVideoQuery,
} from 'src/features/api';

// eslint-disable-next-line
enum DeviceTypeEnum {
  smartphone = 'smartphone',
  tablet = 'tablet',
  desktop = 'desktop',
}

type OrderedVideo = Record<DeviceTypeEnum, Video[]>;
type VideosWithTotal = OrderedVideo & { total: number };

type CampaignVideos = Array<{
  usecase: GetCampaignsByCidVideoApiResponse['items'][0]['usecase'];
  videos: VideosWithTotal;
}>;

export const useVideo = (cid: string) => {
  const [sorted, setSorted] = useState<CampaignVideos>();

  const { data, isFetching, isLoading, isError } =
    useGetCampaignsByCidVideoQuery({
      cid,
    });

  useEffect(() => {
    if (data && data.items) {
      const orderedVideos: CampaignVideos = [];

      data.items.forEach((item) => {
        const ordered = {
          usecase: item.usecase,
          videos: {
            smartphone: [],
            tablet: [],
            desktop: [],
            total: item.videos.length,
          } as VideosWithTotal,
        };

        item.videos.forEach((video) => {
          const deviceType = video.tester.device.type as DeviceTypeEnum;
          // eslint-disable-next-line security/detect-object-injection
          ordered.videos[deviceType].push(video);
        });

        orderedVideos.push(ordered);
      });

      setSorted(orderedVideos);
    }
  }, [data]);

  return {
    isFetching,
    isLoading,
    isError,
    sorted,
  };
};
