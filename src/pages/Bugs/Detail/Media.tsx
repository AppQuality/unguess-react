import { Col, Grid, Row, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { BugMedia as BugMediaType } from 'src/features/api';
import { theme as globalTheme } from 'src/app/theme';
import ImageCard from './ImageCard';
import VideoCard from './VideoCard';

export default ({ items }: { items: BugMediaType[] }) => {
  const { t } = useTranslation();

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
        {imagesCount}{' '}
        {t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_IMAGE_LABEL', {
          count: imagesCount,
        })}{' '}
        - {videosCount}{' '}
        {t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_VIDEO_LABEL', {
          count: videosCount,
        })}
      </SM>
      <Grid>
        <Row>
          {items.map((item, index) => {
            // Check if item is an image or a video
            if (item.mime_type.type === 'image')
              return (
                <Col xs={12} sm={6}>
                  <ImageCard index={index + 1} url={item.url} />
                </Col>
              );
            if (item.mime_type.type === 'video')
              return (
                <Col xs={12} sm={6}>
                  <VideoCard index={index + 1} url={item.url} />
                </Col>
              );
            return null;
          })}
        </Row>
      </Grid>
    </>
  );
};
