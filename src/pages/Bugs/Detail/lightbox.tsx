import {
  Button,
  Lightbox,
  MD,
  Slider,
} from '@appquality/unguess-design-system';
import { theme as globalTheme } from 'src/app/theme';
import { Trans, useTranslation } from 'react-i18next';
import {
  BugMedia,
  GetCampaignsByCidBugsAndBidApiResponse,
} from 'src/features/api';
import { useCallback, useRef } from 'react';
import { ReactComponent as DownloadIcon } from 'src/assets/icons/download-stroke.svg';
import styled from 'styled-components';
import useWindowSize from 'src/hooks/useWindowSize';
import BugMeta from './Meta';
import BugDescription from './Description';
import BugDetails from './Details';

const Grey600Span = styled.span`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const Grey800Span = styled.span`
  color: ${({ theme }) => theme.palette.grey[800]};
`;

export const LightboxContainer = ({
  items,
  bug,
  currentIndex = 0,
  onClose,
  onSlideChange,
}: {
  items: BugMedia[];
  bug: GetCampaignsByCidBugsAndBidApiResponse;
  currentIndex?: number;
  onClose?: () => void;
  onSlideChange?: (index: number) => void;
}) => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const breakpointSm = parseInt(globalTheme.breakpoints.sm, 10);
  const hideDetails = width < breakpointSm;

  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

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
          <Slider
            arrows
            onSlideChange={slideChange}
            initialSlide={currentIndex}
          >
            {items.map((item) => (
              <Slider.Slide>
                {item.mime_type.type === 'image' && (
                  <img src={item.url} alt={`bug ${item.mime_type}`} />
                )}
                {item.mime_type.type === 'video' && (
                  <video
                    ref={(ref) => {
                      videoRefs.current.push(ref);
                    }}
                    src={item.url}
                    controls
                  >
                    <track kind="captions" />
                  </video>
                )}
              </Slider.Slide>
            ))}
          </Slider>
        </Lightbox.Body.Main>
        {hideDetails === false && (
          <Lightbox.Body.Details style={{ flex: 1 }}>
            <BugMeta bug={bug} />
            <BugDescription bug={bug} />
            <BugDetails bug={bug} />
          </Lightbox.Body.Details>
        )}
      </Lightbox.Body>
      <Lightbox.Footer>
        <Button
          isBasic
          onClick={() => {
            if (currentIndex in items) {
              const media = items[currentIndex as number];

              // eslint-disable-next-line
              window.open(media.url, '_blank');
            }
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
