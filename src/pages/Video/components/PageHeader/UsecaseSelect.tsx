import { Select, Skeleton } from '@appquality/unguess-design-system';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GetCampaignsByCidUsecasesApiResponse,
  useGetCampaignsByCidUsecasesQuery,
  useGetCampaignsByCidVideosQuery,
} from 'src/features/api';

const UsecaseSelect = ({
  currentUsecaseId,
  campaignId,
}: {
  currentUsecaseId: number;
  campaignId: string | undefined;
}) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] =
    useState<GetCampaignsByCidUsecasesApiResponse[0]>();

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

  /**
   * Navigate to the video page with the selected usecase
   */
  const handleNavigate = useCallback(
    (useCaseId: string) => {
      const filteredVideos = videosCampaigns?.items.filter(
        (item) => item.usecaseId === Number.parseInt(useCaseId, 10)
      );
      if (filteredVideos?.length) {
        const videoId = filteredVideos[0].id;
        navigate(
          `/campaigns/${campaignId}/videos/${videoId}/?usecase=${useCaseId}`
        );
      }
    },
    [videosCampaigns, selectedItem]
  );

  useEffect(() => {
    const selectedUsecase = usecases?.find(
      (usecase) => usecase.id === currentUsecaseId
    );
    if (selectedUsecase) {
      setSelectedItem(selectedUsecase);
    }
  }, [currentUsecaseId, usecases]);

  return videosCampaigns &&
    !isLoadingVideos &&
    !isFetchingVideos &&
    usecases &&
    !isLoadingUsecases &&
    !isFetchingUsecases ? (
    <Select
      isCompact
      onSelect={(item) => {
        setSelectedItem(
          usecases.find((usecase) => usecase.id === parseInt(item, 10))
        );
        handleNavigate(item);
      }}
      inputValue={selectedItem?.title?.full}
      selectionValue={selectedItem}
      renderValue={() => selectedItem?.title?.full}
    >
      {usecases?.map((usecase) => (
        <Select.Option
          key={usecase.id}
          value={usecase.id.toString()}
          label={usecase.title.full}
        />
      ))}
    </Select>
  ) : (
    <Skeleton width="200px" height="20px" />
  );
};

export default UsecaseSelect;
