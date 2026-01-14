import {
  Button,
  Lightbox,
  MD,
  Player,
  Slider,
  Span,
  Tag,
} from '@appquality/unguess-design-system';
import { vi } from 'date-fns/locale';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as DownloadIcon } from 'src/assets/icons/download-stroke.svg';
import {
  BugMedia,
  GetCampaignsByCidBugsAndBidApiResponse,
} from 'src/features/api';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import BugDescription from './Description';
import DetailsItems from './DetailsItems';
import { formatDateDDMMYYYY } from './Media/dateUtils';
import BugMeta from './Meta';

const Grey600Span = styled.span`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const Grey800Span = styled.span`
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const SlideContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const PositionedTag = styled(Tag)`
  position: absolute;
  top: ${({ theme }) => theme.space.sm};
  left: ${({ theme }) => theme.space.sm};
  width: fit-content;
  z-index: 1;
`;

const DateValue = styled(Span)`
  margin-left: ${({ theme }) => theme.space.xs};
`;

export const LightboxContainer = ({
  items,
  bug,
  currentIndex = 0,
  onClose,
  onSlideChange,
  showDateLabels = false,
}: {
  items: BugMedia[];
  bug: GetCampaignsByCidBugsAndBidApiResponse;
  currentIndex?: number;
  onClose?: () => void;
  onSlideChange?: (index: number) => void;
  showDateLabels?: boolean;
}) => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const hideDetails = width < breakpointSm;

  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(currentIndex);

  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  const slideChange = useCallback(
    (index: number) => {
      if (onSlideChange) {
        onSlideChange(index);
        setActiveIndex(index);
      }
      videoRefs.current.forEach((ref) => {
        if (ref) {
          ref.pause();
        }
      });
    },
    [onSlideChange, videoRefs]
  );

  const activeItem = items[activeIndex];

  return (
    <Lightbox onClose={onClose}>
      <Lightbox.Header>
        <MD isBold>
          <Grey600Span>
            <Trans i18nKey="__BUGS_PAGE_LIGHTBOX_TITLE">
              BUG ID {{ bugId: bug.id }}
            </Trans>
          </Grey600Span>{' '}
          <Grey800Span>
            <Trans i18nKey="__BUGS_PAGE_LIGHTBOX_TITLE_ATTACHMENTS_COUNT">
              | Images and video attached ({{ attachments: items.length }})
            </Trans>
          </Grey800Span>
        </MD>
      </Lightbox.Header>

      <Lightbox.Body>
        <Lightbox.Body.Main style={{ flex: 2 }}>
          <SliderArea>
            {showDateLabels && activeItem && (
              <PositionedTag>
                {t(
                  '__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_LIGHTBOX_TAG_DATE_LABEL'
                )}
                <DateValue isBold>
                  {formatDateDDMMYYYY(new Date(activeItem.creation_date))}
                </DateValue>
              </PositionedTag>
            )}

            <Slider
              prevArrow={<Slider.PrevButton isBright />}
              nextArrow={<Slider.NextButton isBright />}
              onSlideChange={slideChange}
              initialSlide={currentIndex}
            >
              {items.map((item, index) => (
                <Slider.Slide key={item.url ?? index}>
                  <SlideContent>
                    {item.mime_type.type === 'image' && (
                      <img src={item.url} alt={`bug ${item.mime_type}`} />
                    )}

                    {item.mime_type.type === 'video' && (
                      <Player
                        ref={(ref) => {
                          videoRefs.current[index] = ref;
                        }}
                        url={item.url}
                      />
                    )}
                  </SlideContent>
                </Slider.Slide>
              ))}
            </Slider>
          </SliderArea>
        </Lightbox.Body.Main>

        {hideDetails === false && (
          <Lightbox.Body.Details style={{ flex: 1 }}>
            <BugMeta bug={bug} />
            <BugDescription bug={bug} />
            <DetailsItems bug={bug} />
          </Lightbox.Body.Details>
        )}
      </Lightbox.Body>

      <Lightbox.Footer>
        <Button
          isBasic
          onClick={() => {
            const media = items[activeIndex];
            if (media) window.open(media.url, '_blank');
          }}
        >
          <Button.StartIcon>
            <DownloadIcon />
          </Button.StartIcon>
          {t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_DOWNLOAD_BUTTON')}
        </Button>
      </Lightbox.Footer>

      <Lightbox.Close aria-label="Close attachments lightbox" />
    </Lightbox>
  );
};
