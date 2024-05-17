import {
  Button,
  ContainerCard,
  Highlight,
  LG,
  SM,
  Skeleton,
  Tag,
} from '@appquality/unguess-design-system';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TagIcon } from 'src/assets/icons/tag-icon.svg';
import { getColorWithAlpha } from 'src/common/utils';
import {
  useGetVideoByVidObservationsQuery,
  useGetVideoByVidQuery,
  usePostVideoByVidObservationsMutation,
} from 'src/features/api';
import useDebounce from 'src/hooks/useDebounce';
import { styled } from 'styled-components';
import { useVideoContext } from '../context/VideoContext';
import { EmptyTranscript } from './EmptyTranscript';
import { SearchBar } from './SearchBar';
import { ObservationTooltip } from './ObservationTooltip';

const StyledContainerCard = styled(ContainerCard)`
  margin: ${({ theme }) => theme.space.xl} 0;
  padding: ${({ theme }) => theme.space.xl};
  gap: ${({ theme }) => theme.space.sm};
`;

const TranscriptHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.sm};
  z-index: 200;
`;

const HighlightContainer = styled.div``;

const ChipsWrap = styled.div`
  line-height: ${({ theme }) => theme.lineHeights.xxl};
  position: relative;

  [observation] {
    display: inline-block;
    padding: 0 2px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
`;

const StyledTag = styled(Tag)`
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  background: white;
  position: relative;

  &:hover {
    cursor: pointer;
    color: ${({ color }) => getColorWithAlpha(color ?? '', 0.5)};
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ color }) => color};
    opacity: 0.1;
  }

  > svg {
    min-width: 0;
    margin-right: ${({ theme }) => theme.space.xxs};
  }
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
  }>();
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [position, setPosition] = useState<{
    x: number;
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
        start: selection.from,
        end: selection.to,
      };
      await postVideoByVidObservations({
        vid: videoId || '',
        body,
      })
        .unwrap()
        .then((res) => {
          setOpenAccordion({ id: res.id });
          setIsSelecting(false);
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
    setSelection({
      from: part.from,
      to: part.to,
      text: part.text,
    });
  };

  useEffect(() => {
    document.addEventListener('selectionchange', () => {
      if (!wrapperRef || !wrapperRef.current) return;

      const s = document.getSelection();

      if (s && s.toString().length > 0) {
        const anchorNode = s?.anchorNode?.parentElement;
        const focusNode = s?.focusNode?.parentElement;

        if (
          anchorNode &&
          focusNode &&
          !wrapperRef.current.contains(anchorNode) &&
          !wrapperRef.current.contains(focusNode)
        )
          return;

        setIsSelecting(true);

        const rect = s.getRangeAt(0).getBoundingClientRect();
        const containerRect =
          wrapperRef && wrapperRef.current
            ? wrapperRef.current.getBoundingClientRect()
            : null;

        if (!rect || !containerRect) return;

        const relativeY =
          rect.top - containerRect.top + wrapperRef.current.scrollTop;
        const relativeX =
          rect.left - containerRect.left + wrapperRef.current.scrollLeft;

        setPosition({
          x: relativeX,
          y: relativeY - 50,
        });
      } else {
        setIsSelecting(false);
      }
    });

    return () => {
      document.removeEventListener('selectionchange', () => {});
    };
  }, [wrapperRef]);

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
          <TitleWrapper>
            <LG isBold>{t('__VIDEO_PAGE_TRANSCRIPT_TITLE')}</LG>
            <SM>{t('__VIDEO_PAGE_TRANSCRIPT_INFO')}</SM>
          </TitleWrapper>
          {isSearchable && (
            <SearchBar
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          )}
        </TranscriptHeader>
        <div ref={containerRef}>
          {video.transcript ? (
            <HighlightContainer ref={wrapperRef}>
              <Highlight
                search={debouncedValue}
                handleSelection={(part) => {
                  if (!isSelecting) return;

                  handleSelection(part);
                }}
              >
                <ChipsWrap id="chips-wrap">
                  {video.transcript.words.map((item, index) => (
                    <Highlight.Word
                      size="md"
                      key={`${item.word + index}`}
                      start={item.start}
                      end={item.end}
                      observations={observations?.map((o) => ({
                        id: o.id,
                        start: o.start,
                        end: o.end,
                        color:
                          o.tags.find(
                            (tag) => tag.group.name.toLowerCase() === 'severity'
                          )?.tag.style || appTheme.palette.grey[600],
                        hue: getColorWithAlpha(
                          o.tags.find(
                            (tag) => tag.group.name.toLowerCase() === 'severity'
                          )?.tag.style || appTheme.palette.grey[600],
                          0.1
                        ),
                        label: o.title,
                      }))}
                      currentTime={currentTime}
                      text={item.word}
                      tooltipContent={(observation) => (
                        <ObservationTooltip
                          color={observation.color}
                          observationId={observation.id}
                          label={observation.label}
                        />
                      )}
                    />
                  ))}
                  {isSelecting && (
                    <Button
                      size="small"
                      id="add-observation-button"
                      isAccent
                      isPrimary
                      onClick={handleAddObservation}
                      style={{
                        position: 'absolute',
                        left: position?.x,
                        top: position?.y,
                        marginLeft: appTheme.space.lg,
                      }}
                    >
                      <Button.StartIcon>
                        <TagIcon />
                      </Button.StartIcon>
                      {t('__VIDEO_PAGE_TRANSCRIPT_ADD_OBSERVATION')}
                    </Button>
                  )}
                </ChipsWrap>
              </Highlight>
            </HighlightContainer>
          ) : (
            <EmptyTranscript />
          )}
        </div>
      </StyledContainerCard>
    </div>
  );
};

export { Transcript };
