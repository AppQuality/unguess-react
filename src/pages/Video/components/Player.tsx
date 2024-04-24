import { useRef } from 'react';
import { LG, Player, Skeleton } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { useGetVideoByVidQuery } from 'src/features/api';

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { campaignId, videoId } = useParams();

  const {
    data: video,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideoByVidQuery({
    vid: videoId || '',
  });

  if (!video || isErrorVideo) return null;

  if (isFetchingVideo || isLoadingVideo) return <Skeleton />;

  return (
    <>
      <LG>Tester ID {video.tester.id}</LG>
      <Player ref={videoRef} url={video.url} />
    </>
  );
};

export { VideoPlayer };
