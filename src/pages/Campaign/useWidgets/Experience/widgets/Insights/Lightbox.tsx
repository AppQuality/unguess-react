import { Lightbox, Slider } from '@appquality/unguess-design-system';
import { useCallback, useRef } from 'react';
import Video from '@appquality/stream-player';
import styled from 'styled-components';
import useWindowSize from 'src/hooks/useWindowSize';
import { appTheme } from 'src/app/theme';
import { GetCampaignsByCidUxApiResponse } from 'src/features/api';

const Player = styled(Video.Player)``;

const InsightLightbox = ({
  items,
  currentIndex = 0,
  onClose,
  onSlideChange,
}: {
  items: NonNullable<
    GetCampaignsByCidUxApiResponse['findings']
  >[number]['video'];
  currentIndex?: number;
  onClose?: () => void;
  onSlideChange?: (index: number) => void;
}) => {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const hideDetails = width < breakpointSm;

  const slideChange = useCallback(
    (index: number) => {
      if (onSlideChange) {
        onSlideChange(index);
      }
      videoRefs.current.forEach((ref) => {
        if (ref) {
          ref.pause();
        }
      });
    },
    [videoRefs]
  );

  return (
    <Lightbox onClose={onClose}>
      <Lightbox.Header>
        <h1>Lightbox</h1>
      </Lightbox.Header>
      <Lightbox.Body>
        <Lightbox.Body.Main>
          <Slider
            prevArrow={<Slider.PrevButton isBright />}
            nextArrow={<Slider.NextButton isBright />}
            onSlideChange={slideChange}
            initialSlide={currentIndex}
          >
            {items &&
              items.length > 0 &&
              items.map((item) => (
                <Slider.Slide>
                  <Video src={item.streamUrl} start={item.start} end={item.end}>
                    <Player />
                  </Video>
                </Slider.Slide>
              ))}
          </Slider>
        </Lightbox.Body.Main>
        {hideDetails === false && (
          <Lightbox.Body.Details>
            <p>Lightbox body details</p>
          </Lightbox.Body.Details>
        )}
      </Lightbox.Body>
      <Lightbox.Footer>
        <p>Lightbox footer</p>
      </Lightbox.Footer>
      <Lightbox.Close aria-label="Close insight lightbox" />
    </Lightbox>
  );
};

export { InsightLightbox };
