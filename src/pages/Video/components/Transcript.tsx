import {
  Button,
  ContainerCard,
  Highlight,
  LG,
  Notification,
  Paragraph,
  SM,
  Skeleton,
  useToast,
} from '@appquality/unguess-design-system';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TagIcon } from 'src/assets/icons/tag-icon.svg';
import { ReactComponent as InfoIcon } from 'src/assets/info-transcript.svg';
import { getColorWithAlpha } from 'src/common/utils';
import {
  useGetVideosByVidObservationsQuery,
  useGetVideosByVidQuery,
  usePostVideosByVidObservationsMutation,
} from 'src/features/api';
import useDebounce from 'src/hooks/useDebounce';
import { styled } from 'styled-components';
import { useVideoContext } from '../context/VideoContext';
import { ObservationTooltip } from './ObservationTooltip';
import { SearchBar } from './SearchBar';
import { ParagraphMeta } from './ParagraphMeta';

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

const IconTitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.xxs};
`;

const HighlightContainer = styled.div``;

const ChipsWrap = styled.div`
  line-height: ${({ theme }) => theme.lineHeights.xxl};
  position: relative;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.space.xs};
`;

const CreateObservationButton = styled(Button)<{
  position: {
    x: number;
    y: number;
  };
}>`
  user-select: none;
  position: absolute;
  left: ${({ position }) => position.x}px;
  top: ${({ position }) => position.y}px;
  transform: translate(-50%, 0);
  z-index: ${({ theme }) => theme.levels.front};
`;

const TagsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
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
  const [postVideoByVidObservations] = usePostVideosByVidObservationsMutation();
  const { setOpenAccordion } = useVideoContext();
  const debouncedValue = useDebounce(searchValue, 300);
  const { addToast } = useToast();
  const {
    data: video,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideosByVidQuery({
    vid: videoId || '',
  });

  const {
    data: observations,
    isFetching: isFetchingObservations,
    isLoading: isLoadingObservations,
    isError: isErrorObservations,
  } = useGetVideosByVidObservationsQuery({
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
  const sanitizeInput = (input: string) => {
    const sanitizedInput = input.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    return sanitizedInput;
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      if (!wrapperRef || !wrapperRef.current) return;

      const s = document.getSelection();

      if (s && s.toString().length > 0) {
        const anchorNode = s?.anchorNode?.parentElement;
        const focusNode = s?.focusNode?.parentElement;

        if (
          !anchorNode ||
          !focusNode ||
          !wrapperRef.current.contains(anchorNode) ||
          !wrapperRef.current.contains(focusNode)
        ) {
          setIsSelecting(false);
          return;
        }

        setIsSelecting(true);

        const range = s.getRangeAt(0);
        const rects = range.getClientRects();
        const lastRect = rects[rects.length - 1];
        const containerRect =
          wrapperRef && wrapperRef.current
            ? wrapperRef.current.getBoundingClientRect()
            : null;

        if (!lastRect || !containerRect) return;

        const relativeY =
          lastRect.bottom - containerRect.top + wrapperRef.current.scrollTop;
        const relativeX =
          lastRect.right - containerRect.left + wrapperRef.current.scrollLeft;

        if (relativeY > 0 || relativeX > 0)
          // Fix to avoid the button to be placed sometimes at the top left corner of the screen (X: 0, Y: 0)
          setPosition({
            x: relativeX,
            y: relativeY + 15,
          });
      } else {
        setIsSelecting(false);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
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
            <IconTitleContainer>
              <InfoIcon />
              <LG color={appTheme.palette.grey[800]} isBold>
                {t('__VIDEO_PAGE_TRANSCRIPT_TITLE')}
              </LG>
            </IconTitleContainer>
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
          <HighlightContainer ref={wrapperRef}>
            <Highlight
              search={sanitizeInput(debouncedValue)}
              handleSelection={(part) => {
                if (!isSelecting) return;

                handleSelection(part);
              }}
            >
              <ChipsWrap id="chips-wrap">
                {video.transcript?.paragraphs.map((p) => (
                  <ParagraphMeta
                    speakers={video.transcript?.speakers || 0}
                    start={p.start}
                    end={p.end}
                    speakerIndex={p.speaker || 0}
                  >
                    {p.words.map((item, index) => (
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
                                tag.group.name.toLowerCase() === 'severity'
                            )?.tag.style || appTheme.palette.grey[600],
                          hue: getColorWithAlpha(
                            o.tags.find(
                              (tag) =>
                                tag.group.name.toLowerCase() === 'severity'
                            )?.tag.style || appTheme.palette.grey[600],
                            0.1
                          ),
                          label: o.title,
                          tags: o.tags,
                        }))}
                        currentTime={currentTime}
                        text={item.word}
                        tooltipContent={(obs) => (
                          <TagsWrapper>
                            {obs.map((o) => (
                              <ObservationTooltip
                                color={o.color}
                                observationId={o.id}
                                label={o.label}
                                isSelecting={isSelecting}
                              />
                            ))}
                          </TagsWrapper>
                        )}
                      />
                    ))}
                  </ParagraphMeta>
                ))}
                {isSelecting && (
                  <CreateObservationButton
                    size="small"
                    id="add-observation-button"
                    isAccent
                    isPrimary
                    onClick={handleAddObservation}
                    position={position || { x: 0, y: 0 }}
                  >
                    <Button.StartIcon>
                      <TagIcon />
                    </Button.StartIcon>
                    {t('__VIDEO_PAGE_ADD_OBSERVATION')}
                  </CreateObservationButton>
                )}
              </ChipsWrap>
            </Highlight>
          </HighlightContainer>
        </div>
      </StyledContainerCard>
    </div>
  );
};

export { Transcript };
