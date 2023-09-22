import {
  Lightbox,
  MD,
  Player,
  Slider,
  Span,
  XL,
} from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { useCallback, useRef } from 'react';
import { Trans } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { GetCampaignsByCidUxApiResponse } from 'src/features/api';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { getClusterName, getSeverityTag } from './utils';

const LightboxHeader = styled(Lightbox.Header)`
  display: flex;
  flex-direction: row;
`;

const InsightLightbox = ({
  insight,
  items,
  currentIndex = 0,
  onClose,
  onSlideChange,
}: {
  insight: NonNullable<GetCampaignsByCidUxApiResponse['findings']>[number];
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

  if (!items) return null;

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
      <LightboxHeader>
        <MD isBold>
          <Span
            style={{ color: appTheme.colors.neutralHue, fontWeight: 'normal' }}
          >
            {insight.title}
          </Span>{' '}
          |{' '}
          <Trans
            count={items.length}
            i18nKey="__CAMPAIGN_PAGE_INSIGHTS_LIGHTBOX_HEADER_HIGHLIGHTS_LABEL"
          >
            ({{ count: items.length }} Highlights)
          </Trans>
        </MD>
      </LightboxHeader>
      <Lightbox.Body>
        <Lightbox.Body.Main style={{ flex: 2 }}>
          <Slider
            prevArrow={<Slider.PrevButton isBright />}
            nextArrow={<Slider.NextButton isBright />}
            onSlideChange={slideChange}
            initialSlide={currentIndex}
          >
            {items.length > 0 &&
              items.map((item) => (
                <Slider.Slide>
                  <Player
                    ref={(ref) => {
                      videoRefs.current.push(ref);
                    }}
                    url={item.streamUrl || item.url}
                    start={item.start}
                    end={item.end}
                  />
                </Slider.Slide>
              ))}
          </Slider>
        </Lightbox.Body.Main>
        {hideDetails === false && (
          <Lightbox.Body.Details>
            <div>{getSeverityTag(insight.severity)}</div>
            <XL
              isBold
              style={{
                margin: `${appTheme.space.xs} 0`,
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              }}
            >
              “{items[`${currentIndex}`].description}“
            </XL>
            <MD style={{ color: appTheme.palette.grey[600] }}>
              {getClusterName(insight.cluster, t)}
            </MD>
            <MD
              isBold
              style={{ margin: `${appTheme.space.md} 0 ${appTheme.space.xs}` }}
            >
              {t(
                '__CAMPAIGN_PAGE_INSIGHTS_LIGHTBOX_DETAILS_LINKED_INSIGHT_LABEL'
              )}
            </MD>
            <MD style={{ whiteSpace: 'pre-wrap' }}>{insight.description}</MD>
          </Lightbox.Body.Details>
        )}
      </Lightbox.Body>
      <Lightbox.Footer />
      <Lightbox.Close aria-label="Close insight lightbox" />
    </Lightbox>
  );
};

export { InsightLightbox };
