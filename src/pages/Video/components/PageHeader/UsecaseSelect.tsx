import {
  Ellipsis,
  MD,
  Select,
  Skeleton,
  SM,
} from '@appquality/unguess-design-system';
import { useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
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

  const usecasesWithVideoCounter = usecases?.map((usecase) => {
    const videos = videosCampaigns?.items.filter(
      (item) => item.usecaseId === usecase.id
    );
    return {
      ...usecase,
      videoCount: videos?.length || 0,
    };
  });

  /**
   * Navigate to the video page with the selected usecase
   */
  const handleNavigate = useCallback(
    (useCaseId: string) => {
      const videosDesktop = videosCampaigns?.items.filter(
        (item) =>
          item.usecaseId === Number.parseInt(useCaseId, 10) &&
          item.tester.device.type === 'desktop'
      );

      const filteredVideos =
        videosDesktop && videosDesktop?.length > 0
          ? videosDesktop
          : videosCampaigns?.items.filter(
              (item) => item.usecaseId === Number.parseInt(useCaseId, 10)
            );
      if (filteredVideos?.length) {
        const videoId = filteredVideos[0].id;
        navigate(`/campaigns/${campaignId}/videos/${videoId}/`);
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
    usecasesWithVideoCounter &&
    selectedItem &&
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
      inputValue={selectedItem?.id.toString()}
      selectionValue={selectedItem?.id.toString()}
      renderValue={() => (
        <Ellipsis style={{ width: 220 }}>{selectedItem?.title?.full}</Ellipsis>
      )}
    >
      {usecasesWithVideoCounter?.map((usecase) => (
        <Select.Option key={usecase.id} value={usecase.id.toString()}>
          <MD>
            <Ellipsis style={{ width: 220 }}>{usecase.title.full}</Ellipsis>
          </MD>
          <SM style={{ color: appTheme.palette.grey[600] }}>
            <Trans count={usecase.videoCount} i18nKey="__VIDEOS_COUNT">
              video {{ count: usecase.videoCount }}
            </Trans>
          </SM>
        </Select.Option>
      ))}
    </Select>
  ) : (
    <Skeleton width="200px" height="20px" />
  );
};

export default UsecaseSelect;
