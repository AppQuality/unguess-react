import {
  ContainerCard,
  Highlight,
  LG,
  Notification,
  SM,
  Skeleton,
  useToast,
} from '@appquality/unguess-design-system';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
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
  setCurrentTime,
}: {
  currentTime: number;
  isSearchable: boolean;
  setCurrentTime: (time: number, forcePlay?: boolean) => void;
}) => {
  const { t } = useTranslation();
  const { videoId } = useParams();
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

  const sanitizeInput = (input: string) => {
    const sanitizedInput = input.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    return sanitizedInput;
  };

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
              onSelectionButtonClick={handleAddObservation}
              i18n={{
                selectionButtonLabel: t('__VIDEO_PAGE_ADD_OBSERVATION'),
              }}
            >
              <ChipsWrap id="chips-wrap">
                {video.transcript?.paragraphs.map((p) => (
                  <ParagraphMeta
                    speakers={video.transcript?.speakers || 0}
                    start={p.start}
                    end={p.end}
                    speakerIndex={p.speaker || 0}
                    setCurrentTime={(time) => setCurrentTime(time, true)}
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
                                observationId={o.id}
                                start={o.start}
                                color={o.color}
                                label={o.label}
                                seekPlayer={setCurrentTime}
                              />
                            ))}
                          </TagsWrapper>
                        )}
                      />
                    ))}
                  </ParagraphMeta>
                ))}
              </ChipsWrap>
            </Highlight>
          </HighlightContainer>
        </div>
      </StyledContainerCard>
    </div>
  );
};

export { Transcript };
