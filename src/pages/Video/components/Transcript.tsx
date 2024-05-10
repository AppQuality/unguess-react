import {
  Col,
  ContainerCard,
  Grid,
  Highlight,
  IconButton,
  LG,
  Row,
  Skeleton,
  Span,
  Tag,
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
import useDebounce from 'src/hooks/useDebounce';
import { styled } from 'styled-components';
import { getColorWithAlpha } from 'src/common/utils';
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

const TranscriptHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const HighlightContainer = styled.div``;

const ChipsWrap = styled.div`
  line-height: ${({ theme }) => theme.lineHeights.xl};
  position: relative;

  .highlighted-tag {
    position: absolute;
    left: 100%;
  }
`;

const StyledTag = styled(Tag)`
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }

  * {
    user-select: none;
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
  const [yPosition, setYPosition] = useState<number>(50);
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

  document.addEventListener('selectionchange', () => {
    const s = document.getSelection();
    if (s && s.toString().length > 0) {
      setIsSelecting(true);

      if (!wrapperRef || !wrapperRef.current) return;

      const rect = s.getRangeAt(0).getBoundingClientRect();
      const containerRect =
        wrapperRef && wrapperRef.current
          ? wrapperRef.current.getBoundingClientRect()
          : null;

      if (!rect || !containerRect) return;

      const relativeY =
        rect.top - containerRect.top + wrapperRef.current.scrollTop;
      setYPosition(relativeY);
    } else {
      setIsSelecting(false);
    }
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
        <Grid>
          <Row>
            <Col lg={8}>
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
                          <>
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
                                    (tag) =>
                                      tag.group.name.toLowerCase() ===
                                      'severity'
                                  )?.tag.style || appTheme.palette.grey[600],
                                backgroundColor: getColorWithAlpha(
                                  o.tags.find(
                                    (tag) =>
                                      tag.group.name.toLowerCase() ===
                                      'severity'
                                  )?.tag.style || appTheme.palette.grey[600],
                                  0.1
                                ),
                              }))}
                              currentTime={currentTime}
                              text={item.word}
                            />
                            {observations &&
                              observations
                                .filter(
                                  (observation) =>
                                    observation.start ===
                                    parseFloat(item.start.toFixed(2))
                                )
                                .map((observation) => (
                                  <StyledTag
                                    className="highlighted-tag"
                                    key={observation.id}
                                    color={
                                      observation.tags.find(
                                        (tag) =>
                                          tag.group.name.toLowerCase() ===
                                          'severity'
                                      )?.tag.style || appTheme.palette.grey[600]
                                    }
                                    style={{
                                      backgroundColor: getColorWithAlpha(
                                        observation.tags.find(
                                          (tag) =>
                                            tag.group.name.toLowerCase() ===
                                            'severity'
                                        )?.tag.style ||
                                          appTheme.palette.grey[600],
                                        0.1
                                      ),
                                    }}
                                    onClick={() =>
                                      setOpenAccordion({ id: observation.id })
                                    }
                                  >
                                    <TagIcon style={{ width: 12 }} />
                                    {observation.title.length > 0 && (
                                      <Span
                                        style={{
                                          marginLeft: appTheme.space.xxs,
                                        }}
                                      >
                                        {observation.title}
                                      </Span>
                                    )}
                                  </StyledTag>
                                ))}
                          </>
                        ))}
                        {isSelecting && (
                          <IconButton
                            id="add-observation-button"
                            isAccent
                            isPrimary
                            onClick={handleAddObservation}
                            style={{
                              position: 'absolute',
                              left: '100%',
                              top: yPosition,
                              marginLeft: appTheme.space.lg,
                            }}
                          >
                            <TagIcon />
                          </IconButton>
                        )}
                      </ChipsWrap>
                    </Highlight>
                  </HighlightContainer>
                ) : (
                  <EmptyTranscript />
                )}
              </div>
            </Col>
            <Col>&nbsp;</Col>
          </Row>
        </Grid>
      </StyledContainerCard>
    </div>
  );
};

export { Transcript };
