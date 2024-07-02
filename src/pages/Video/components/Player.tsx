import {
  Notification,
  useVideoContext as usePlayerContext,
  PlayerProvider,
  Skeleton,
  useToast,
} from '@appquality/unguess-design-system';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import {
  GetVideosByVidApiResponse,
  useGetVideosByVidObservationsQuery,
  useGetVideosByVidQuery,
  usePatchVideosByVidObservationsAndOidMutation,
  usePostVideosByVidObservationsMutation,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { styled } from 'styled-components';
import { useVideoContext } from '../context/VideoContext';
import { EmptyTranscript } from './EmptyTranscript';
import { ObservationTooltip } from './ObservationTooltip';
import { Transcript } from './Transcript';

const PlayerContainer = styled.div<{
  isFetching: boolean;
}>`
  width: 100%;
  height: 55vh;
  display: flex;
  position: relative;
  top: 0;
  z-index: 101;

  ${({ isFetching }) =>
    isFetching &&
    `
    opacity: 0.75;
  `}

  > div {
    height: auto;
  }
`;

const CorePlayer = ({ video }: { video: GetVideosByVidApiResponse }) => {
  const { videoId } = useParams();
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { setOpenAccordion } = useVideoContext();
  const [postVideoByVidObservations] = usePostVideosByVidObservationsMutation();
  const [patchObservation] = usePatchVideosByVidObservationsAndOidMutation();
  const [start, setStart] = useState<number | undefined>(undefined);
  const { context, setIsPlaying } = usePlayerContext();
  const { currentTime } = context.player || { currentTime: 0 };
  const { addToast } = useToast();

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

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

      if (time > start) {
        try {
          const res = await postVideoByVidObservations({
            vid: videoId || '',
            body: {
              start,
              end: time,
            },
          }).unwrap();
          videoRef?.current?.pause();
          exitFullscreen();
          setOpenAccordion({ id: res.id });
        } catch (err) {
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="error"
                message={t('__VIDEO_PAGE_PLAYER_ERROR_OBSERVATION')}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
        }
      } else {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={t('__VIDEO_PAGE_PLAYER_ERROR_OBSERVATION_TIME')}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      }
      setStart(undefined);
    },
    [start]
  );

  const seekPlayer = useCallback(
    (time: number) => {
      if (videoRef && videoRef.current) {
        videoRef.current.currentTime = time;
        setIsPlaying(true);
        videoRef.current.play();
      }
    },
    [videoRef]
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
            start={obs.start}
            color={
              obs.tags.find(
                (tag) => tag.group.name.toLowerCase() === 'severity'
              )?.tag.style || appTheme.palette.grey[600]
            }
            label={obs.title}
            seekPlayer={seekPlayer}
          />
        ),
        onClick: () => {
          seekPlayer(obs.start);
          setOpenAccordion({ id: obs.id });
        },
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

  if (!observations || isErrorObservations) return null;

  if (isLoadingObservations) return <Skeleton />;
  return (
    <>
      <PlayerContainer isFetching={isFetchingObservations}>
        <PlayerProvider.Core
          ref={videoRef}
          pipMode="auto"
          url={video.streamUrl ?? video.url}
          onCutHandler={handleCut}
          handleBookmarkUpdate={handleBookmarksUpdate}
          isCutting={!!start}
          bookmarks={mappedObservations}
          i18n={{
            beforeHighlight: t('__VIDEO_PAGE_PLAYER_START_ADD_OBSERVATION'),
            onHighlight: t('__VIDEO_PAGE_PLAYER_STOP_ADD_OBSERVATION'),
          }}
        />
      </PlayerContainer>
      {video.transcript ? (
        <Transcript
          currentTime={currentTime}
          isSearchable
          setCurrentTime={seekPlayer}
        />
      ) : (
        <EmptyTranscript />
      )}
    </>
  );
};

const VideoPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const location = useLocation();

  const {
    data: video,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideosByVidQuery({
    vid: videoId || '',
  });

  if (isErrorVideo) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  if (!video) return null;
  if (isFetchingVideo || isLoadingVideo) return <Skeleton />;

  return (
    <PlayerProvider url={video.streamUrl ?? video.url}>
      <CorePlayer video={video} />
    </PlayerProvider>
  );
};

export { VideoPlayer };
