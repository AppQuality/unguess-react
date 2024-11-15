import {
  useGetCampaignsByCidUsecasesQuery,
  useGetCampaignsByCidVideosQuery,
} from 'src/features/api';

const useUsecaseWithCounter = (campaignId: string) => {
  const {
    data: videosCampaigns,
    isLoading: isLoadingVideos,
    isFetching: isFetchingVideos,
  } = useGetCampaignsByCidVideosQuery({
    cid: campaignId || '',
  });

  const {
    data: usecases,
    isFetching: isFetchingUsecases,
    isLoading: isLoadingUsecases,
  } = useGetCampaignsByCidUsecasesQuery({
    cid: campaignId || '',
    filterBy: 'videos',
  });

  const usecasesWithVideoCounter = usecases
    ?.map((usecase) => {
      const videos = videosCampaigns?.items.filter(
        (item) => item.usecaseId === usecase.id
      );
      return {
        ...usecase,
        videos: videos || [],
        videoCount: videos?.length || 0,
      };
    })
    .map((usecase) => {
      const sortedVideos = usecase.videos.sort((a, b) => {
        const aDeviceType = a.tester.device.type;
        const bDeviceType = b.tester.device.type;
        const order = ['desktop', 'tablet', 'smartphone', 'other'];
        const indexA = order.indexOf(aDeviceType);
        const indexB = order.indexOf(bDeviceType);

        if (indexA < indexB) {
          return -1;
        }
        if (indexA > indexB) {
          return 1;
        }
        return 0;
      });
      return {
        ...usecase,
        videos: sortedVideos,
      };
    });

  // add

  return {
    usecasesWithVideoCounter,
    isLoading: isLoadingVideos || isLoadingUsecases,
    isFetching: isFetchingVideos || isFetchingUsecases,
  };
};

export default useUsecaseWithCounter;
