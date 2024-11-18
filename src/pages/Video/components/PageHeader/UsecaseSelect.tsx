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
import { GetCampaignsByCidUsecasesApiResponse } from 'src/features/api';
import useUsecaseWithVideos from './useUsecaseWithVideos';

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
    usecasesWithVideos: useUsecasesWithVideos,
    isLoading,
    isFetching,
  } = useUsecaseWithVideos(campaignId || '');

  /**
   * Navigate to the video page with the selected usecase
   */
  const handleNavigate = useCallback(
    (useCaseId: string) => {
      const usecase = useUsecasesWithVideos?.find(
        (u) => u.id === parseInt(useCaseId, 10)
      );
      if (usecase) {
        const videoId = usecase?.videos[0]?.id;
        if (!videoId) return;

        navigate(`/campaigns/${campaignId}/videos/${videoId}/`);
      }
    },
    [useUsecasesWithVideos, selectedItem]
  );

  useEffect(() => {
    const selectedUsecase = useUsecasesWithVideos?.find(
      (usecase) => usecase.id === currentUsecaseId
    );
    if (selectedUsecase) {
      setSelectedItem(selectedUsecase);
    }
  }, [currentUsecaseId, useUsecasesWithVideos]);

  return !isLoading && !isFetching && useUsecasesWithVideos && selectedItem ? (
    <Select
      isCompact
      onSelect={(item) => {
        setSelectedItem(
          useUsecasesWithVideos.find(
            (usecase) => usecase.id === parseInt(item, 10)
          )
        );
        handleNavigate(item);
      }}
      key={JSON.stringify(useUsecasesWithVideos)}
      inputValue={selectedItem?.id.toString()}
      selectionValue={selectedItem?.id.toString()}
      renderValue={() => (
        <Ellipsis style={{ width: 220 }}>{selectedItem?.title?.full}</Ellipsis>
      )}
    >
      {useUsecasesWithVideos?.map((usecase) => (
        <Select.Option key={usecase.id} value={usecase.id.toString()}>
          <MD>
            <Ellipsis style={{ width: 220 }}>{usecase.title.full}</Ellipsis>
          </MD>
          <SM style={{ color: appTheme.palette.grey[600] }}>
            <Trans count={usecase.videos.length} i18nKey="__VIDEOS_COUNT">
              video {{ count: usecase.videos.length }}
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
