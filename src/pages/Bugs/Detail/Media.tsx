import {
  Col,
  Grid,
  Row,
  SM,
  Lightbox,
  Slider,
  MD,
  Button,
} from '@appquality/unguess-design-system';
import { ReactComponent as DownloadIcon } from 'src/assets/icons/download-stroke.svg';
import { useState } from 'react';
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import {
  BugMedia as BugMediaType,
  GetCampaignsByCidBugsAndBidApiResponse,
} from 'src/features/api';
import { theme as globalTheme } from 'src/app/theme';
import ImageCard from './ImageCard';
import VideoCard from './VideoCard';
import BugMeta from './Meta';
import BugDescription from './Description';
import BugDetails from './Details';
import DetailsItems from './DetailsItems';

const Grey600Span = styled.span`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const Grey800Span = styled.span`
  color: ${({ theme }) => theme.palette.grey[800]};
`;

export default ({
  items,
  bug,
}: {
  items: BugMediaType[];
  bug: GetCampaignsByCidBugsAndBidApiResponse;
}) => {
  const { t } = useTranslation();
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  const openLightbox = (index: number) => {
    setIsLightboxOpen(true);
    setCurrentIndex(index);
  };

  const imagesCount = items.filter(
    (item) => item.mime_type.type === 'image'
  ).length;
  const videosCount = items.filter(
    (item) => item.mime_type.type === 'video'
  ).length;

  return (
    <>
      <SM
        style={{
          color: globalTheme.palette.grey[600],
          marginBottom: globalTheme.space.md,
        }}
      >
        {imagesCount > 0 && (
          <>
            {imagesCount}{' '}
            {t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_IMAGE_LABEL', {
              count: imagesCount,
            })}{' '}
          </>
        )}
        {videosCount > 0 && (
          <>
            {videosCount}{' '}
            {t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_VIDEO_LABEL', {
              count: videosCount,
            })}{' '}
          </>
        )}
      </SM>
      <Grid>
        <Row>
          {items.map((item, index) => {
            // Check if item is an image or a video
            if (item.mime_type.type === 'image')
              return (
                <Col xs={12} sm={6}>
                  <ImageCard
                    index={index}
                    url={item.url}
                    onClick={() => openLightbox(index)}
                  />
                </Col>
              );
            if (item.mime_type.type === 'video')
              return (
                <Col xs={12} sm={6}>
                  <VideoCard
                    index={index}
                    url={item.url}
                    onClick={() => openLightbox(index)}
                  />
                </Col>
              );
            return null;
          })}
        </Row>
      </Grid>
      {isLightboxOpen && (
        <Lightbox onClose={() => setIsLightboxOpen(false)}>
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
            <Lightbox.Body.Main>
              <Slider
                arrows
                onSlideChange={onSlideChange}
                initialSlide={currentIndex}
              >
                {items.map((item) => (
                  <Slider.Slide>
                    {item.mime_type.type === 'image' && (
                      <img src={item.url} alt={`bug ${item.mime_type}`} />
                    )}
                    {item.mime_type.type === 'video' && (
                      <video src={item.url} controls>
                        <track kind="captions" />
                      </video>
                    )}
                  </Slider.Slide>
                ))}
              </Slider>
            </Lightbox.Body.Main>
            <Lightbox.Body.Details>
              <BugMeta bug={bug} />
              <BugDescription bug={bug} />
              <DetailsItems bug={bug} />
            </Lightbox.Body.Details>
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
      )}
    </>
  );
};
