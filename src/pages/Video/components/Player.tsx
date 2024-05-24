import { Player, Skeleton } from '@appquality/unguess-design-system';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import {
  useGetVideosByVidObservationsQuery,
  useGetVideosByVidQuery,
  usePatchVideosByVidObservationsAndOidMutation,
  usePostVideosByVidObservationsMutation,
} from 'src/features/api';
import { styled } from 'styled-components';
import { useVideoContext } from '../context/VideoContext';
import { ObservationTooltip } from './ObservationTooltip';
import { Transcript } from './Transcript';
import { EmptyTranscript } from './EmptyTranscript';

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
  const { t } = useTranslation();
  const { setOpenAccordion } = useVideoContext();
  const [postVideoByVidObservations] = usePostVideosByVidObservationsMutation();
  const [patchObservation] = usePatchVideosByVidObservationsAndOidMutation();
  const [ref, setRef] = useState<HTMLVideoElement | null>(null);
  const [start, setStart] = useState<number | undefined>(undefined);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const {
    data: video,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideosByVidQuery({
    vid: videoId || '',
  });

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
  } = useGetVideosByVidObservationsQuery({
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
    [start]
  );

  const mappedObservations = useMemo(
    () =>
      observations?.map((obs) => ({
        id: obs.id,
        start: obs.start,
        end: obs.end,
        title: obs.title,
        hue:
          obs.tags.find((tag) => tag.group.name.toLowerCase() === 'severity')
            ?.tag.style || 'grey',
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
      })),
    [observations]
  );

  const handleBookmarksUpdate = useCallback(async (bookmark) => {
    await patchObservation({
      vid: videoId || '',
      oid: bookmark.id.toString(),
      body: {
        title: bookmark.label,
        start: bookmark.start,
        end: bookmark.end,
        tags: bookmark.tags.map((item: any) => item.tag.id),
      },
    }).unwrap();
  }, []);

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
          bookmarks={mappedObservations}
          i18n={{
            beforeHighlight: t('__VIDEO_PAGE_PLAYER_START_ADD_OBSERVATION'),
            onHighlight: t('__VIDEO_PAGE_PLAYER_STOP_ADD_OBSERVATION'),
          }}
        />
      </PlayerContainer>
      {video.transcript ? (
        <Transcript currentTime={currentTime} isSearchable />
      ) : (
        <EmptyTranscript />
      )}
    </>
  );
};

export { VideoPlayer };
