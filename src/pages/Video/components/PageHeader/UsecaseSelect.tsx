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
import useUsecaseWithCounter from './useUsecaseWithCounter';

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
    usecasesWithVideoCounter: useCasesWithVideoCount,
    isLoading,
    isFetching,
  } = useUsecaseWithCounter(campaignId || '');

  /**
   * Navigate to the video page with the selected usecase
   */
  const handleNavigate = useCallback(
    (useCaseId: string) => {
      const usecase = useCasesWithVideoCount?.find(
        (u) => u.id === parseInt(useCaseId, 10)
      );
      if (usecase) {
        const videoId = usecase?.videos[0]?.id;
        if (!videoId) return;

        navigate(`/campaigns/${campaignId}/videos/${videoId}/`);
      }
    },
    [useCasesWithVideoCount, selectedItem]
  );

  useEffect(() => {
    const selectedUsecase = useCasesWithVideoCount?.find(
      (usecase) => usecase.id === currentUsecaseId
    );
    if (selectedUsecase) {
      setSelectedItem(selectedUsecase);
    }
  }, [currentUsecaseId, useCasesWithVideoCount]);

  return !isLoading && !isFetching && useCasesWithVideoCount && selectedItem ? (
    <Select
      isCompact
      onSelect={(item) => {
        setSelectedItem(
          useCasesWithVideoCount.find(
            (usecase) => usecase.id === parseInt(item, 10)
          )
        );
        handleNavigate(item);
      }}
      key={JSON.stringify(useCasesWithVideoCount)}
      inputValue={selectedItem?.id.toString()}
      selectionValue={selectedItem?.id.toString()}
      renderValue={() => (
        <Ellipsis style={{ width: 220 }}>{selectedItem?.title?.full}</Ellipsis>
      )}
    >
      {useCasesWithVideoCount?.map((usecase) => (
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
