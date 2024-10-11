import {
  Notification,
  PlayerProvider,
  Skeleton,
  useVideoContext as usePlayerContext,
  useToast,
} from '@appquality/unguess-design-system';
import { IBookmark } from '@appquality/unguess-design-system/build/stories/player/_types';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import {
  useGetVideosByVidObservationsQuery,
  useGetVideosByVidQuery,
  usePatchVideosByVidObservationsAndOidMutation,
  usePostVideosByVidObservationsMutation,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { styled } from 'styled-components';
import { useVideoContext } from '../context/VideoContext';
import { ObservationTooltip } from './ObservationTooltip';
import { Transcript } from './Transcript';
import { ToolsContextProvider } from './tools/context/ToolsContext';

const PlayerContainer = styled.div<{
  isFetching?: boolean;
}>`
  width: 100%;
  height: 55vh;
  display: flex;
  position: relative;
  top: 0;
  z-index: 3;
  overflow: hidden;

  ${({ isFetching }) =>
    isFetching &&
    `
    opacity: 0.75;
  `}

  > div {
    height: auto;
  }
`;

const CorePlayer = () => {
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
    isLoading: isLoadingObservations,
    isError: isErrorObservations,
  } = useGetVideosByVidObservationsQuery({
    vid: videoId || '',
  });
  const { data: video, isFetching: isFetchingVideo } = useGetVideosByVidQuery({
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

  const seekPlayer = (time: number, forcePlay?: boolean) => {
    if (!videoRef?.current) return;

    videoRef.current.currentTime = time;
    if (forcePlay) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

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
            start={obs.start}
            observationId={obs.id}
            color={
              obs.tags.find(
                (tag) => tag.group.name.toLowerCase() === 'severity'
              )?.tag.style || appTheme.palette.grey[600]
            }
            label={obs.title}
          />
        ),
        onClick: () => {
          setOpenAccordion({ id: obs.id });
          seekPlayer(obs.start);
        },
        tags: obs.tags,
      })),
    [observations]
  );

  const handleBookmarksUpdate = useCallback(async (bookmark: IBookmark) => {
    await patchObservation({
      vid: videoId || '',
      oid: bookmark.id.toString(),
      body: {
        title: bookmark.label,
        start: bookmark.start,
        end: bookmark.end,
        tags: bookmark.tags?.map((item: any) => item.tag.id),
      },
    }).unwrap();
  }, []);

  if (!observations || isErrorObservations || !video) return null;

  if (isLoadingObservations) return <Skeleton />;
  return (
    <ToolsContextProvider>
      <PlayerContainer isFetching={isFetchingVideo}>
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
      <Transcript
        currentTime={currentTime}
        setCurrentTime={(time) => {
          seekPlayer(time, false);
        }}
        videoId={videoId}
      />
    </ToolsContextProvider>
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
      <CorePlayer />
    </PlayerProvider>
  );
};

export { VideoPlayer };
