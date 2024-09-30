import {
  ContainerCard,
  EditorWithHighlight,
  Notification,
  Skeleton,
  useToast,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import {
  useGetVideosByVidObservationsQuery,
  useGetVideosByVidQuery,
  usePostVideosByVidObservationsMutation,
} from 'src/features/api';
import styled from 'styled-components';
import { useVideoContext } from '../../context/VideoContext';
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
  const [postVideoByVidObservations] = usePostVideosByVidObservationsMutation();
  const { setOpenAccordion } = useVideoContext();
  const { addToast } = useToast();
  const { t } = useTranslation();

  const handleAddObservation = async (part: {
    from: number;
    to: number;
    text: string;
  }) => {
    const body = {
      start: part.from,
      end: part.to,
      text: part.text,
    };
    await postVideoByVidObservations({
      vid: videoId || '',
      body,
    })
      .unwrap()
      .then((res) => {
        setOpenAccordion({ id: res.id });
      })
      .catch((err) => {
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
        // eslint-disable-next-line no-console
        console.error(err);
      });
  };

  const editor = EditorWithHighlight.useEditor(
    {
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
    [observations]
  );

  if (!editor || !video) return <Skeleton />;
  return (
    <div style={{ padding: `0 ${appTheme.space.xxl}` }}>
      <StyledContainerCard>
        <EditorWithHighlight.Search editor={editor} />
        <EditorWithHighlight.FloatingMenu
          editor={editor}
          onClick={(ed, { start, end }) => {
            handleAddObservation({ from: start, to: end, text: '' });
            // @ts-ignore
            ed.commands.addObservation({ title: '' });
          }}
        />
        <EditorWithHighlight editor={editor} />
      </StyledContainerCard>
    </div>
  );
};
