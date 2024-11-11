import { Select } from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GetCampaignsByCidUsecasesApiResponse,
  useGetCampaignsByCidVideosQuery,
} from 'src/features/api';

const UsecaseSelect = ({
  usecases,
  currentUsecaseId,
  campaignId,
}: {
  usecases: GetCampaignsByCidUsecasesApiResponse;
  currentUsecaseId: number;
  campaignId: string | undefined;
}) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] =
    useState<GetCampaignsByCidUsecasesApiResponse[0]>();

  const videos = useGetCampaignsByCidVideosQuery({
    cid: campaignId || '',
    filterBy: {
      usecase: selectedItem?.id,
    },
  });

  useEffect(() => {
    if (currentUsecaseId !== selectedItem?.id) {
      if (videos && videos.data && videos.data?.items.length > 0) {
        const videoId = videos.data.items[0].id;
        navigate(
          `/campaigns/${campaignId}/videos/${videoId}/?usecase=${selectedItem?.id}`
        );
      }
    }
  }, [videos, selectedItem?.id, currentUsecaseId, campaignId, navigate]);

  useEffect(() => {
    const selectedUsecase = usecases?.find(
      (usecase) => usecase.id === currentUsecaseId
    );
    if (selectedUsecase) {
      setSelectedItem(selectedUsecase);
    }
  }, [currentUsecaseId, usecases]);

  return (
    <Select
      isCompact
      onSelect={(item) =>
        setSelectedItem(
          usecases.find((usecase) => usecase.id === parseInt(item))
        )
      }
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
  );
};

export default UsecaseSelect;
