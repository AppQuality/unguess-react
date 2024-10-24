import { useMemo } from 'react';
import { useGetVideosByVidQuery } from 'src/features/api';

export const useContent = (videoId: string) => {
  const {
    data: video,
    isError: isErrorVideo,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
  } = useGetVideosByVidQuery({
    vid: videoId || '',
  });

  const content = useMemo(
    () =>
      video && video?.transcript
        ? video.transcript.paragraphs.map((p) => ({
            ...p,
            speaker: p.speaker ? p.speaker : 0,
          }))
        : undefined,
    [video]
  );

  const speakers = useMemo(() => video?.transcript?.speakers || null, [video]);

  return {
    data: content,
    speakers,
    isError: isErrorVideo,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
  };
};
