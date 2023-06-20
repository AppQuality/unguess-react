import { Col, Grid, Row, TextLabel } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BugMedia as BugMediaType,
  GetCampaignsByCidBugsAndBidApiResponse,
} from 'src/features/api';
import { appTheme } from 'src/app/theme';
import ImageCard from '../ImageCard';
import VideoCard from '../VideoCard';
import 'src/common/components/BugDetail/responsive-grid.css';
import { LightboxContainer } from '../lightbox';

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
      <TextLabel
        style={{
          marginBottom: appTheme.space.md,
        }}
      >
        {videosCount > 0 && (
          <>
            {videosCount}{' '}
            {t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_VIDEO_LABEL', {
              count: videosCount,
            })}{' '}
          </>
        )}
        {imagesCount > 0 && (
          <>
            {videosCount > 0 && '- '}
            {imagesCount}{' '}
            {t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_IMAGE_LABEL', {
              count: imagesCount,
            })}
          </>
        )}
      </TextLabel>
      <Grid>
        <Row className="responsive-container">
          {items.map((item, index) => {
            // Check if item is an image or a video
            if (item.mime_type.type === 'image')
              return (
                <Col xs={12} sm={6} className="flex-3-sm">
                  <ImageCard
                    className="bug-preview-media-item bug-preview-media-image"
                    index={index}
                    url={item.url}
                    onClick={() => openLightbox(index)}
                  />
                </Col>
              );
            if (item.mime_type.type === 'video')
              return (
                <Col xs={12} sm={6} className="flex-3-sm">
                  <VideoCard
                    className="bug-preview-media-item bug-preview-media-video"
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
        <LightboxContainer
          items={items}
          bug={bug}
          currentIndex={currentIndex}
          onClose={() => setIsLightboxOpen(false)}
          onSlideChange={onSlideChange}
        />
      )}
    </>
  );
};
