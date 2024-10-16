import {
  ContainerCard,
  Skeleton,
  Transcript as TranscriptComponent,
} from '@appquality/unguess-design-system';
import { ReactNode } from 'react';
import { appTheme } from 'src/app/theme';
import { FEATURE_FLAG_AI_TRANSLATION } from 'src/constants';
import {
  useGetVideosByVidQuery,
  useGetVideosByVidTranslationQuery,
} from 'src/features/api';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { useToolsContext } from '../tools/context/ToolsContext';
import { EmptyState } from './EmptyState';
import { Header } from './Header';
import { TranscriptTheme } from './TranscriptTheme';
import { useAddObservation } from './useAddObservation';
import { useContent } from './useContent';
import { useObservations } from './useObservations';

const TranscriptWrapper = ({
  videoId,
  children,
  editor,
}: {
  editor: any;
  videoId?: string;
  children: ReactNode;
}) => {
  const { data: video } = useGetVideosByVidQuery({
    vid: videoId || '',
  });

  const isEmpty = !video?.transcript;

  return (
    <div style={{ padding: `0 ${appTheme.space.xxl}` }}>
      <ContainerCard>
        <Header editor={isEmpty ? undefined : editor} isEmpty={isEmpty} />
        {video?.transcript ? children : <EmptyState />}
      </ContainerCard>
    </div>
  );
};

export const Transcript = ({
  videoId,
  currentTime,
  setCurrentTime,
}: {
  videoId?: string;
  currentTime: number;
  setCurrentTime: (time: number) => void;
}) => {
  const { language } = useToolsContext();

  const { hasFeatureFlag } = useFeatureFlag();
  const hasAIFeatureFlag = hasFeatureFlag(FEATURE_FLAG_AI_TRANSLATION);

  const handleAddObservation = useAddObservation({ videoId: videoId || '' });

  const { data: content, speakers } = useContent(videoId || '');

  const { data: observations } = useObservations(videoId || '');

  const { data: translation } = useGetVideosByVidTranslationQuery(
    {
      vid: videoId || '',
      ...(language && { lang: language }),
    },
    {
      skip: !hasAIFeatureFlag || !language,
    }
  );

  const editor = TranscriptComponent.useEditor(
    {
      currentTime: currentTime * 1000,
      onSetCurrentTime: (time) => setCurrentTime(time),
      content,
      translations: translation?.sentences,
      themeExtension: TranscriptTheme,
      observations,
      // @ts-ignore
      numberOfSpeakers: speakers,
    },
    [observations, translation?.sentences]
  );

  return (
    <TranscriptWrapper videoId={videoId} editor={editor}>
      {editor ? (
        <>
          <TranscriptComponent.FloatingMenu
            editor={editor}
            onClick={(ed, { start, end }) => {
              handleAddObservation({
                from: start,
                to: end,
                text: '',
              }).then((id) => {
                if (!id) return;
                ed.commands.addObservation({ id, title: '' });
              });
            }}
          />
          <TranscriptComponent editor={editor} />
        </>
      ) : (
        <Skeleton height="40px" />
      )}
    </TranscriptWrapper>
  );
};
