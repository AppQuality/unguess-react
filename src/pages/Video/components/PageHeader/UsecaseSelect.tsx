import {
  Ellipsis,
  MD,
  Select,
  Skeleton,
  SM,
} from '@appquality/unguess-design-system';
import { useCallback, useState } from 'react';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import TagManager from 'react-gtm-module';
import useUsecaseWithVideos from './useUsecaseWithVideos';

const UsecaseSelect = ({
  currentUsecaseId,
  campaignId,
}: {
  currentUsecaseId: number;
  campaignId: string | undefined;
}) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<string>(
    currentUsecaseId.toString()
  );

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
    [useUsecasesWithVideos]
  );

  return !isLoading && !isFetching && useUsecasesWithVideos ? (
    <Select
      isCompact
      onSelect={(value) => {
        const usecaseId = useUsecasesWithVideos
          .find((usecase) => usecase.id === Number(value))
          ?.id.toString();

        if (!usecaseId) return;

        // Tracking change usecase event
        TagManager.dataLayer({
          dataLayer: {
            event: 'video_change_use_case',
            category: 'video_navigation',
            target: usecaseId,
          },
        });

        setSelectedItem(usecaseId);
        handleNavigate(value);
      }}
      inputValue={selectedItem}
      selectionValue={selectedItem}
      renderValue={({ inputValue }) => {
        const usecase = useUsecasesWithVideos?.find(
          (u) => u.id === Number(inputValue)
        );
        return (
          <Ellipsis style={{ width: 220 }}>{usecase?.title?.full}</Ellipsis>
        );
      }}
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
