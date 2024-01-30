import {
  Button,
  Lightbox,
  MD,
  Player,
  Slider,
} from '@appquality/unguess-design-system';
import { useCallback, useRef } from 'react';
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
import BugMeta from './Meta';

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
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
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
            prevArrow={<Slider.PrevButton isBright />}
            nextArrow={<Slider.NextButton isBright />}
            onSlideChange={slideChange}
            initialSlide={currentIndex}
          >
            {items.map((item) => (
              <Slider.Slide>
                {item.mime_type.type === 'image' && (
                  <img src={item.url} alt={`bug ${item.mime_type}`} />
                )}
                {item.mime_type.type === 'video' && (
                  <Player
                    ref={(ref) => {
                      videoRefs.current.push(ref);
                    }}
                    url={item.url}
                  />
                )}
              </Slider.Slide>
            ))}
          </Slider>
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
        </Button>
      </Lightbox.Footer>
      <Lightbox.Close aria-label="Close attachments lightbox" />
    </Lightbox>
  );
};
