import {
  // Button,
  Lightbox,
  MD,
  Slider,
  Span,
  XL,
} from '@appquality/unguess-design-system';
import { useCallback, useRef } from 'react';
import Video from '@appquality/stream-player';
import styled from 'styled-components';
import useWindowSize from 'src/hooks/useWindowSize';
import { appTheme } from 'src/app/theme';
import { GetCampaignsByCidUxApiResponse } from 'src/features/api';
import { t } from 'i18next';
// import { ReactComponent as DownloadIcon } from 'src/assets/icons/download-stroke.svg';
import { Trans } from 'react-i18next';
import {
  getClusterName,
  // getClusterTag,
  getSeverityTag,
} from './utils';

const Player = styled(Video.Player)``;

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
          <Trans i18nKey="__CAMPAIGN_PAGE_INSIGHTS_LIGHTBOX_HEADER_HIGHLIGHTS_LABEL">
            ({{ number: items.length }} Highlights)
          </Trans>
        </MD>
      </LightboxHeader>
      <Lightbox.Body>
        <Lightbox.Body.Main>
          <Slider
            prevArrow={<Slider.PrevButton isBright />}
            nextArrow={<Slider.NextButton isBright />}
            onSlideChange={slideChange}
            initialSlide={currentIndex}
          >
            {items.length > 0 &&
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
            <div>{getSeverityTag(insight.severity)}</div>
            <XL isBold style={{ margin: `${appTheme.space.xs} 0` }}>
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
            <MD>{insight.description}</MD>
          </Lightbox.Body.Details>
        )}
      </Lightbox.Body>
      {/* TODO: check how to download the trimmed video, not the full media url 📦📦📦 */}
      <Lightbox.Footer>
        {/* <Button
          isBasic
          onClick={() => {
            if (items)
              if (currentIndex in items) {
                const media = items[currentIndex as number];
                // eslint-disable-next-line security/detect-non-literal-fs-filename
                window.open(media.url, '_blank');
              }
          }}
        >
          <Button.StartIcon>
            <DownloadIcon />
          </Button.StartIcon>
          {t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_DOWNLOAD_BUTTON')}
        </Button> */}
      </Lightbox.Footer>
      <Lightbox.Close aria-label="Close insight lightbox" />
    </Lightbox>
  );
};

export { InsightLightbox };
