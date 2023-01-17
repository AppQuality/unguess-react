import { Col, Grid, Row, SM } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BugMedia as BugMediaType,
  GetCampaignsByCidBugsAndBidApiResponse,
} from 'src/features/api';
import { theme as globalTheme } from 'src/app/theme';
import ImageCard from './ImageCard';
import VideoCard from './VideoCard';
import { LightboxContainer } from './lightbox';

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
