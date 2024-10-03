import {
  ContainerCard,
  Skeleton,
  Transcript,
} from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { FEATURE_FLAG_AI_TRANSLATION } from 'src/constants';
import { useGetVideosByVidTranslationQuery } from 'src/features/api';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import styled from 'styled-components';
import { useToolsContext } from '../tools/context/ToolsContext';
import { Header } from './Header';
import { TranscriptTheme } from './TranscriptTheme';
import { useAddObservation } from './useAddObservation';
import { useContent } from './useContent';
import { useObservations } from './useObservations';

export const StyledContainerCard = styled(ContainerCard)`
  margin: ${({ theme }) => theme.space.xl} 0;
  padding: ${({ theme }) => theme.space.xl};
  gap: ${({ theme }) => theme.space.sm};
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
    data: content,
    isError: isErrorVideo,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
  } = useContent(videoId || '');

  const {
    data: observations,
    isError: isErrorObservations,
    isFetching: isFetchingObservations,
    isLoading: isLoadingObservations,
  } = useObservations(videoId || '');

  const { data: translation } = useGetVideosByVidTranslationQuery(
    {
      vid: videoId || '',
      ...(language && { lang: language }),
    },
    {
      skip: !hasAIFeatureFlag,
    }
  );

  const handleAddObservation = useAddObservation({ videoId: videoId || '' });

  const editor = Transcript.useEditor(
    {
      currentTime: currentTime * 1000,
      onSetCurrentTime: (time) => setCurrentTime(time, false),
      content,
      translations: translation?.sentences,
      themeExtension: TranscriptTheme,
      observations,
    },
    [observations, translation?.sentences]
  );

  if (
    !editor ||
    !content ||
    isFetchingVideo ||
    isLoadingVideo ||
    isFetchingObservations ||
    isLoadingObservations ||
    isErrorVideo ||
    isErrorObservations
  )
    return <Skeleton />;

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
