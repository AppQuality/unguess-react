import { useCallback, useState } from 'react';
import { Player, Skeleton } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import {
  useGetVideoByVidObservationsQuery,
  useGetVideoByVidQuery,
  usePostVideoByVidObservationsMutation,
} from 'src/features/api';
import { styled } from 'styled-components';
import { Transcript } from './Transcript';
import { useVideoContext } from '../context/VideoContext';

const PlayerContainer = styled.div<{
  isFetching: boolean;
}>`
  width: 100%;
  height: auto;
  max-height: 50vh;
  display: flex;

  ${({ isFetching }) =>
    isFetching &&
    `
    opacity: 0.75;
  `}

  > div {
    height: auto;
  }
`;

const VideoPlayer = () => {
  const { videoId } = useParams();
  const { setOpenAccordion } = useVideoContext();
  const [postVideoByVidObservations] = usePostVideoByVidObservationsMutation();

  const {
    data: video,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideoByVidQuery({
    vid: videoId || '',
  });
  const [currentTime, setCurrentTime] = useState(0);

  const handleVideoRef = useCallback((videoRef: HTMLVideoElement) => {
    if (videoRef) {
      videoRef.addEventListener('timeupdate', () => {
        setCurrentTime(videoRef?.currentTime || 0);
      });
    }
  }, []);

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
    async (time: number) => {
      if (!start) {
        setStart(time);
        return;
      }

      await postVideoByVidObservations({
        vid: videoId || '',
        body: {
          start,
          end: time,
        },
      })
        .unwrap()
        .then((res) => {
          setOpenAccordion({ id: res.id });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });

      setStart(undefined);
    },
    [observations, start]
  );

  const handleBookmarksUpdate = useCallback(
    (bookmarks) => {
      // eslint-disable-next-line no-console
      console.log(bookmarks);
    },
    [observations]
  );

  if (!video || isErrorVideo) return null;
  if (!observations || isErrorObservations) return null;

  if (isFetchingVideo || isLoadingVideo || isLoadingObservations)
    return <Skeleton />;
  return (
    <>
      <PlayerContainer isFetching={isFetchingObservations}>
        <Player
          ref={handleVideoRef}
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
            onClick: () => setOpenAccordion({ id: obs.id }),
          }))}
        />
      </PlayerContainer>
      <Transcript currentTime={currentTime} isSearchable />
    </>
  );
};

export { VideoPlayer };
