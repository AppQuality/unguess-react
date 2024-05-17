import { useCallback, useEffect, useState } from 'react';
import { Player, Skeleton } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import {
  VideoTag,
  useGetVideoByVidObservationsQuery,
  useGetVideoByVidQuery,
  usePatchVideoByVidObservationsAndOidMutation,
  usePostVideoByVidObservationsMutation,
} from 'src/features/api';
import { styled } from 'styled-components';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import useDebounce from 'src/hooks/useDebounce';
import { Transcript } from './Transcript';
import { useVideoContext } from '../context/VideoContext';
import { ObservationTooltip } from './ObservationTooltip';

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
  const [patchObservation] = usePatchVideoByVidObservationsAndOidMutation();
  const [ref, setRef] = useState<HTMLVideoElement | null>(null);
  const { t } = useTranslation();
  const [updatedObservation, setUpdatedObservation] = useState<{
    id: number;
    start: number;
    end: number;
    title: string;
    hue: string;
    label: string;
    onClick: () => void;
    tags: VideoTag[];
  }>();
  const [start, setStart] = useState<number | undefined>(undefined);
  const debouncedObservation = useDebounce(updatedObservation, 500);

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
      setRef(videoRef);
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
          ref?.pause();
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
    (bookmark) => {
      setUpdatedObservation(bookmark);
    },
    [observations]
  );

  useEffect(() => {
    if (!debouncedObservation) return;

    patchObservation({
      vid: videoId || '',
      oid: debouncedObservation.id.toString(),
      body: {
        ...debouncedObservation,
        tags: debouncedObservation.tags.map((item) => item.tag.id),
      },
    })
      .unwrap()
      .then(() => {
        setUpdatedObservation(undefined);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, [debouncedObservation]);

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
            tooltipContent: (
              <ObservationTooltip
                observationId={obs.id}
                color={
                  obs.tags.find(
                    (tag) => tag.group.name.toLowerCase() === 'severity'
                  )?.tag.style || appTheme.palette.grey[600]
                }
                label={obs.title}
              />
            ),
            onClick: () => setOpenAccordion({ id: obs.id }),
            tags: obs.tags,
          }))}
          i18n={{
            beforeHighlight: t('__VIDEO_PAGE_ADD_OBSERVATION'),
            onHighlight: t('__VIDEO_PAGE_PLAYER_STOP_ADD_OBSERVATION'),
          }}
        />
      </PlayerContainer>
      <Transcript currentTime={currentTime} isSearchable />
    </>
  );
};

export { VideoPlayer };
