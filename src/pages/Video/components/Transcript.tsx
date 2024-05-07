import {
  ContainerCard,
  Highlight,
  IconButton,
  LG,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ReactComponent as TagIcon } from 'src/assets/icons/tag-icon.svg';
import {
  useGetVideoByVidObservationsQuery,
  useGetVideoByVidQuery,
  usePostVideoByVidObservationsMutation,
} from 'src/features/api';
import { useClickOtuside } from 'src/hooks/useClickOutside';
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
  const wrapperRef = useRef<HTMLDivElement>(null);
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
      const body = {
        start: Math.round(selection.from),
        end: Math.round(selection.to),
      }; // to be changed to float in the DB
      await postVideoByVidObservations({
        vid: videoId || '',
        body,
      }).unwrap();
    }
  };

  useClickOtuside(wrapperRef, () => {
    setSelection(undefined);
  });

  if (!video || isErrorVideo || !video.transcript || isErrorObservations)
    return null;

  if (
    isFetchingVideo ||
    isLoadingVideo ||
    isFetchingObservations ||
    isLoadingObservations
  )
    return <Skeleton />;
  return (
    <StyledContainerCard>
      <StyledTitle isBold>{t('__VIDEO_PAGE_TRANSCRIPT_TITLE')}</StyledTitle>
      <TranscriptContainer>
        <div ref={wrapperRef}>
          <Highlight handleSelection={(part) => setSelection(part)}>
            {video.transcript.words.map((item, index) => (
              <Highlight.Word
                size="sm"
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
        </div>
        {selection && (
          <IconButton onClick={handleAddObservation} size="small">
            <TagIcon />
          </IconButton>
        )}
      </TranscriptContainer>
    </StyledContainerCard>
  );
};

export { Transcript };
