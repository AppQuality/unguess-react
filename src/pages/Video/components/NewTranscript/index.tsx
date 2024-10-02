import {
  ContainerCard,
  Skeleton,
  Transcript,
} from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { FEATURE_FLAG_AI_TRANSLATION } from 'src/constants';
import {
  useGetVideosByVidObservationsQuery,
  useGetVideosByVidQuery,
  useGetVideosByVidTranslationQuery,
} from 'src/features/api';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { useToolsContext } from '../tools/context/ToolsContext';
import { Header } from './Header';
import { TranscriptTheme } from './TranscriptTheme';
import { useAddObservation } from './useAddObservation';

export const StyledContainerCard = styled(ContainerCard)`
  margin: ${({ theme }) => theme.space.xl} 0;
  padding: ${({ theme }) => theme.space.xl};
  gap: ${({ theme }) => theme.space.sm};
`;

export const TranscriptHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.space.xl};
  z-index: 200;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.space.xs};
`;

export const NewTranscript = ({
  currentTime,
  setCurrentTime,
}: {
  currentTime: number;
  setCurrentTime: (time: number, forcePlay: boolean) => void;
}) => {
  const { videoId } = useParams();
  const { language } = useToolsContext();

  const { hasFeatureFlag } = useFeatureFlag();
  const hasAIFeatureFlag = hasFeatureFlag(FEATURE_FLAG_AI_TRANSLATION);
  const {
    data: video,
    isError: isErrorVideo,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
  } = useGetVideosByVidQuery({
    vid: videoId || '',
  });
  const {
    data: observations,
    isError: isErrorObservations,
    isFetching: isFetchingObservations,
    isLoading: isLoadingObservations,
  } = useGetVideosByVidObservationsQuery({
    vid: videoId || '',
  });

  const {
    data: translation,
    isLoading: isLoadingTranslation,
    isFetching: isFetchingTranslation,
    isError: isErrorTranslation,
  } = useGetVideosByVidTranslationQuery(
    {
      vid: videoId || '',
      ...(language && { lang: language }),
    },
    {
      skip: !hasAIFeatureFlag,
    }
  );

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

  const handleAddObservation = useAddObservation({ videoId: videoId || '' });

  const editor = Transcript.useEditor(
    {
      currentTime: currentTime * 1000,
      onSetCurrentTime: (time) => setCurrentTime(time, false),
      content,
      translations: translation?.sentences,
      themeExtension: TranscriptTheme,
      observations: observations?.map((o) => {
        function isHexColor(color: string): color is `#${string}` {
          return /^#[0-9A-F]{6}$/i.test(color);
        }

        const defaultColor = appTheme.palette.grey[600] as `#${string}`;

        const color =
          o.tags.find((tag) => tag.group.name.toLowerCase() === 'severity')?.tag
            .style || defaultColor;

        return {
          id: o.id,
          title: o.title,
          text: o.title,
          type: '',
          start: o.start,
          end: o.end,
          color: isHexColor(color) ? color : defaultColor,
        };
      }),
    },
    [observations, translation?.sentences]
  );

  if (!editor || !video) return <Skeleton />;
  if (!video || isErrorVideo || !video.transcript || isErrorObservations)
    return null;
  if (
    isFetchingVideo ||
    isLoadingVideo ||
    isFetchingObservations ||
    isLoadingObservations
  )
    return <Skeleton />;

  console.log('newtr');

  return (
    <div style={{ padding: `0 ${appTheme.space.xxl}` }}>
      <StyledContainerCard>
        <Header editor={editor} />
        <Transcript.FloatingMenu
          editor={editor}
          onClick={(ed, { start, end }) => {
            handleAddObservation({ from: start, to: end, text: '' }).then(
              (id) => {
                if (!id) return;
                ed.commands.addObservation({ id, title: '' });
              }
            );
          }}
        />
        <Transcript editor={editor} />
      </StyledContainerCard>
    </div>
  );
};
