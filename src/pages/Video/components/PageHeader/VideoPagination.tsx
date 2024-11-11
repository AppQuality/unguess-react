import { Pagination, Skeleton } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GetVideosByVidApiResponse,
  useGetCampaignsByCidVideosQuery,
} from 'src/features/api';

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
  const { data: videosListCurrentUsecase } = useGetCampaignsByCidVideosQuery(
    {
      cid: campaignId || '',
      filterBy: {
        usecase: currentUsecaseId,
      },
    },
    { skip: !video || !campaignId }
  );

  const paginationData = useMemo(() => {
    if (videosListCurrentUsecase && video) {
      const group = videosListCurrentUsecase.items.filter(
        (item) => item.usecaseId === video.usecase.id
      );
      const videos = [
        ...group.filter((item) => item.tester.device.type === 'desktop'),
        ...group.filter((item) => item.tester.device.type === 'tablet'),
        ...group.filter((item) => item.tester.device.type === 'smartphone'),
        ...group.filter((item) => item.tester.device.type === 'other'),
      ].map((item) => ({ id: item.id }));

      const index = videos.findIndex((item) => item.id === video.id);
      return {
        items: videos,
        total: videos.length,
        currentPage: index + 1,
      };
    }
    return { items: [], total: 0, currentPage: 1 };
  }, [videosListCurrentUsecase, video]);

  return paginationData.items.length > 0 ? (
    <Pagination
      totalPages={paginationData.total}
      currentPage={paginationData.currentPage}
      pageGap={2}
      pagePadding={0}
      onChange={(page) => {
        // eslint-disable-next-line no-console
        const targetId = paginationData.items[page - 1].id;
        navigate(`/campaigns/${campaignId}/videos/${targetId}`, {
          replace: true,
        });
      }}
    />
  ) : (
    <Skeleton width="200px" height="20px" />
  );
};

export default VideoPagination;
