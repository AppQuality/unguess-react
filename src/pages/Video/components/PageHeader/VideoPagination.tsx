import { Pagination, Skeleton } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetVideosByVidApiResponse } from 'src/features/api';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import useUsecaseWithCounter from './useUsecaseWithVideos';

const VideoPagination = ({
  currentUsecaseId,
  campaignId,
  video,
}: {
  currentUsecaseId: number;
  campaignId: string | undefined;
  video: GetVideosByVidApiResponse;
}) => {
  const navigate = useNavigate();
  const sendGTMEvent = useSendGTMevent();

  const {
    usecasesWithVideos: useCasesWithVideoCount,
    isLoading,
    isFetching,
  } = useUsecaseWithCounter(campaignId || '');

  const paginationData = useMemo(() => {
    const videosCurrentUsecase = useCasesWithVideoCount?.find(
      (usecase) => usecase.id === currentUsecaseId
    )?.videos;
    if (videosCurrentUsecase && videosCurrentUsecase.length > 0) {
      const index = videosCurrentUsecase.findIndex(
        (item) => item.id === video.id
      );
      return {
        items: videosCurrentUsecase,
        total: videosCurrentUsecase.length,
        currentPage: index + 1,
      };
    }
    return { items: [], total: 0, currentPage: 1 };
  }, [useCasesWithVideoCount, video]);

  return paginationData.items.length > 0 && !isLoading && !isFetching ? (
    <Pagination
      totalPages={paginationData.total}
      currentPage={paginationData.currentPage}
      pageGap={2}
      pagePadding={0}
      onChange={(page) => {
        // eslint-disable-next-line no-console
        if (!page) return;
        const targetId = paginationData.items[page - 1].id;

        // Tracking video navigation
        if (page > paginationData.currentPage) {
          sendGTMEvent({
            action: 'video_next',
            event: 'video_navigation',
            category: 'bugs',
            content: targetId.toString(),
          });
        } else if (page < paginationData.currentPage) {
          sendGTMEvent({
            action: 'video_previous',
            event: 'video_navigation',
            category: 'bugs',
            content: targetId.toString(),
          });
        }

        navigate(`/campaigns/${campaignId}/videos/${targetId}/`, {
          replace: true,
        });
      }}
    />
  ) : (
    <Skeleton width="200px" height="20px" />
  );
};

export default VideoPagination;
