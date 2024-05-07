import {
  Button,
  ContainerCard,
  Highlight,
  LG,
  Paragraph,
  SM,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Divider } from 'src/common/components/divider';
import {
  useGetVideoByVidObservationsQuery,
  useGetVideoByVidQuery,
  usePostVideoByVidObservationsMutation,
} from 'src/features/api';
import { styled } from 'styled-components';

const StyledContainerCard = styled(ContainerCard)`
  margin: ${({ theme }) => theme.space.xl} 0;
  padding: ${({ theme }) => theme.space.xl};
  gap: ${({ theme }) => theme.space.sm};
`;
const StyledTitle = styled(LG)`
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.grey[800]};
`;
const StyledSelectionText = styled(SM)`
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const StyledDivider = styled(Divider)`
  margin: ${({ theme }) => theme.space.sm} 0;
`;
const TranscriptContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const Transcript = ({ currentTime }: { currentTime: number }) => {
  const { t } = useTranslation();
  const { campaignId, videoId } = useParams();
  const [selection, setSelection] = useState<{
    from: number;
    to: number;
    text: string;
  }>();

  const [postVideoByVidObservations] = usePostVideoByVidObservationsMutation();

  const {
    data: video,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideoByVidQuery({
    vid: videoId || '',
  });

  const {
    data: observations,
    isFetching: isFetchingObservations,
    isLoading: isLoadingObservations,
    isError: isErrorObservations,
  } = useGetVideoByVidObservationsQuery({
    vid: videoId || '',
  });

  const handleAddObservation = async () => {
    if (selection) {
      const body = { start: selection.from, end: selection.to };
      await postVideoByVidObservations({
        vid: videoId || '',
        body,
      }).unwrap();
    }
  };

  if (!video || isErrorVideo || !video.transcript) return null;

  if (isFetchingVideo || isLoadingVideo) return <Skeleton />;
  return (
    <StyledContainerCard>
      <StyledTitle isBold>{t('__VIDEO_PAGE_TRANSCRIPT_TITLE')}</StyledTitle>
      <TranscriptContainer>
        <Highlight handleSelection={(part) => setSelection(part)}>
          {video.transcript.words.map((item, index) => (
            <Highlight.Word
              key={`${item.word + index}`}
              start={item.start}
              end={item.end}
              observations={observations}
              currentTime={currentTime}
            >
              {item.word}
            </Highlight.Word>
          ))}
        </Highlight>
      </TranscriptContainer>
      {selection && (
        <>
          <StyledDivider />
          <StyledSelectionText isBold>
            {t('__VIDEO_PAGE_TRANSCRIPT_HIGHLIGHTED_TEXT')}
          </StyledSelectionText>
          <Paragraph>
            <i>{selection.text}</i> ({selection.from} - {selection.to})
          </Paragraph>
          <br />
          <Button isPrimary onClick={handleAddObservation}>
            {t('__VIDEO_PAGE_TRANSCRIPT_ADD_OBSERVATION')}
          </Button>
        </>
      )}
    </StyledContainerCard>
  );
};

export { Transcript };
