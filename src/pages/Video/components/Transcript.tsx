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
import { appTheme } from 'src/app/theme';
import { ReactComponent as TagIcon } from 'src/assets/icons/tag-icon.svg';
import {
  useGetVideoByVidObservationsQuery,
  useGetVideoByVidQuery,
  usePostVideoByVidObservationsMutation,
} from 'src/features/api';
import { useClickOtuside } from 'src/hooks/useClickOutside';
import useDebounce from 'src/hooks/useDebounce';
import { styled } from 'styled-components';
import { useVideoContext } from '../context/VideoContext';
import { EmptyTranscript } from './EmptyTranscript';
import { SearchBar } from './SearchBar';

const StyledContainerCard = styled(ContainerCard)`
  margin: ${({ theme }) => theme.space.xl} 0;
  padding: ${({ theme }) => theme.space.xl};
  gap: ${({ theme }) => theme.space.sm};
`;
const StyledTitle = styled(LG)`
  color: ${({ theme }) => theme.palette.grey[800]};
`;
const TranscriptContainer = styled.div`
  display: grid;
  line-height: ${({ theme }) => theme.lineHeights.lg};
  grid-template-columns: 2fr 1fr;
`;

const TranscriptHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const Transcript = ({
  currentTime,
  isSearchable,
}: {
  currentTime: number;
  isSearchable: boolean;
}) => {
  const { t } = useTranslation();
  const { videoId } = useParams();
  const [selection, setSelection] = useState<{
    from: number;
    to: number;
    text: string;
    y: number;
  }>();
  const [searchValue, setSearchValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [postVideoByVidObservations] = usePostVideoByVidObservationsMutation();
  const { setOpenAccordion } = useVideoContext();

  const debouncedValue = useDebounce(searchValue, 300);

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
      })
        .unwrap()
        .then((res) => {
          setOpenAccordion({ id: res.id });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    }
  };

  const handleSelection = (part: {
    from: number;
    to: number;
    text: string;
  }) => {
    const currentSelection = window.getSelection();
    if (currentSelection && currentSelection.rangeCount > 0) {
      const range = currentSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect =
        wrapperRef && wrapperRef.current
          ? wrapperRef.current.getBoundingClientRect()
          : null;
      if (!containerRect || !wrapperRef || !wrapperRef.current) return;
      const relativeY =
        rect.top - containerRect.top + wrapperRef.current.scrollTop;

      setSelection({
        from: part.from,
        to: part.to,
        text: part.text,
        y: relativeY,
      });
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
    <div style={{ padding: `0 ${appTheme.space.xxl}` }}>
      <StyledContainerCard>
        <TranscriptHeader>
          <StyledTitle isBold>{t('__VIDEO_PAGE_TRANSCRIPT_TITLE')}</StyledTitle>
          {isSearchable && (
            <SearchBar
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          )}
        </TranscriptHeader>
        <TranscriptContainer ref={containerRef}>
          {video.transcript ? (
            <div style={{ position: 'relative' }} ref={wrapperRef}>
              <Highlight
                search={debouncedValue}
                handleSelection={(part) => handleSelection(part)}
              >
                {video.transcript.words.map((item, index) => (
                  <Highlight.Word
                    size="sm"
                    key={`${item.word + index}`}
                    start={item.start}
                    end={item.end}
                    observations={observations}
                    currentTime={currentTime}
                    text={item.word}
                  />
                ))}
              </Highlight>
              {selection && (
                <IconButton
                  onClick={handleAddObservation}
                  size="small"
                  style={{
                    position: 'absolute',
                    right: '-40px',
                    top: `${selection.y}px`,
                  }}
                >
                  <TagIcon />
                </IconButton>
              )}
            </div>
          ) : (
            <EmptyTranscript />
          )}
        </TranscriptContainer>
      </StyledContainerCard>
    </div>
  );
};

export { Transcript };
