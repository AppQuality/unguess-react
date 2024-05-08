import { useEffect, useCallback, useRef, useState } from 'react';
import { LG, Player, Skeleton } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import {
  useGetVideoByVidObservationsQuery,
  useGetVideoByVidQuery,
} from 'src/features/api';
import { styled } from 'styled-components';
import { Transcript } from './Transcript';

const PlayerContainer = styled.div`
  width: 100%;
  height: auto;
`;

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { videoId } = useParams();

  const {
    data: video,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideoByVidQuery({
    vid: videoId || '',
  });
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(videoRef.current?.currentTime || 0);
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', () => {
          setCurrentTime(videoRef.current?.currentTime || 0);
        });
      }
    };
  }, [videoRef]);

  const {
    data: observations,
    isFetching: isFetchingObservations,
    isLoading: isLoadingObservations,
    isError: isErrorObservations,
  } = useGetVideoByVidObservationsQuery({
    vid: videoId || '',
  });

  const [start, setStart] = useState<number | undefined>(undefined);

  const handleCut = useCallback(
    (time: number) => {
      if (!start) {
        setStart(time);
        return;
      }

      // TODO: POST obs start and time

      setStart(undefined);
    },
    [observations, start]
  );

  const handleBookmarksUpdate = useCallback(
    (bookmarks) => {
      console.log(bookmarks);
    },
    [observations]
  );

  if (!video || isErrorVideo) return null;
  if (!observations || isErrorObservations) return null;

  if (isFetchingVideo || isLoadingVideo) return <Skeleton />;
  return (
    <>
      <PlayerContainer>
        <Player
          ref={videoRef}
          url={video.url}
          onCutHandler={handleCut}
          handleBookmarkUpdate={handleBookmarksUpdate}
          isCutting={!!start}
          enablePipOnScroll
          bookmarks={observations.map((obs) => ({
            id: obs.id,
            start: obs.start,
            end: obs.end,
            title: obs.title,
            hue:
              obs.tags.find(
                (tag) => tag.group.name.toLowerCase() === 'severity'
              )?.tag.style || 'grey',
            label: obs.title,
          }))}
        />
      </PlayerContainer>
      <Transcript currentTime={currentTime} />
    </>
  );
};

export { VideoPlayer };
