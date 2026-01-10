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

  const sentiments = useMemo(
    () =>
      video && video?.sentiment
        ? video.sentiment.paragraphs.map((s) => ({
            ...s,
            text: s.reason,
          }))
        : undefined,
    [video]
  );

  const speakers = useMemo(() => video?.transcript?.speakers || null, [video]);

  return {
    data: content,
    sentiments,
    generalSentiment: video?.sentiment?.reason,
    speakers,
    isError: isErrorVideo,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
  };
};
