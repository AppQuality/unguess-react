import {
  ContainerCard,
  EditorWithHighlight,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import {
  useGetVideosByVidObservationsQuery,
  useGetVideosByVidQuery,
} from 'src/features/api';
import styled from 'styled-components';
import { TranscriptTheme } from './TranscriptTheme';

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
  const { data: video } = useGetVideosByVidQuery({
    vid: videoId || '',
  });
  const { data: observations } = useGetVideosByVidObservationsQuery({
    vid: videoId || '',
  });

  const editor = EditorWithHighlight.useEditor({
    currentTime: currentTime * 1000,
    onSetCurrentTime: (time) => {
      setCurrentTime(time, false);
    },
    content:
      video && video?.transcript
        ? video.transcript.paragraphs.map((p) => ({
            ...p,
            sentences: [],
            speaker: p.speaker ? p.speaker : 0,
          }))
        : undefined,
    themeExtension: TranscriptTheme,
    observations: observations?.map((o) => ({
      id: o.id,
      title: o.title,
      text: o.title,
      type: '',
      start: o.start,
      end: o.end,
    })),
  });

  if (!editor || !video) return <Skeleton />;
  return (
    <div style={{ padding: `0 ${appTheme.space.xxl}` }}>
      <StyledContainerCard>
        <EditorWithHighlight.Search editor={editor} />
        <EditorWithHighlight editor={editor} />
      </StyledContainerCard>
    </div>
  );
};
