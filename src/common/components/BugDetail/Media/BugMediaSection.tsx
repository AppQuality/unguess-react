import {
  Col,
  Grid,
  Row,
  TextLabel,
  Title,
} from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { BugMedia as BugMediaType } from 'src/features/api';
import { Divider } from '../../divider';
import ImageCard from '../ImageCard';
import VideoCard from '../VideoCard';

type Entry = { item: BugMediaType; index: number };

export function BugMediaSection({
  dateLabel,
  entries,
  onOpenLightbox,
  showDivider = false,
}: {
  dateLabel: string;
  entries: Entry[];
  onOpenLightbox: (index: number) => void;
  showDivider?: boolean;
}) {
  const { t } = useTranslation();

  const { imagesCount, videosCount } = useMemo(() => {
    let images = 0;
    let videos = 0;

    for (const { item } of entries) {
      if (item.mime_type.type === 'image') images++;
      else if (item.mime_type.type === 'video') videos++;
    }

    return { imagesCount: images, videosCount: videos };
  }, [entries]);

  return (
    <>
      <Title
        style={{
          fontSize: appTheme.fontSizes.lg,
          marginBottom: appTheme.space.xxs,
        }}
      >
        {t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_DATE_LABEL', {
          date: dateLabel,
        })}
      </Title>

      <TextLabel style={{ marginBottom: appTheme.space.md }}>
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
          {entries.map(({ item, index }) => {
            if (item.mime_type.type === 'image')
              return (
                <Col key={`img-${index}`} xs={12} sm={6} className="flex-3-sm">
                  <ImageCard
                    className="bug-preview-media-item bug-preview-media-image"
                    index={index}
                    url={item.url}
                    onClick={() => onOpenLightbox(index)}
                  />
                </Col>
              );

            if (item.mime_type.type === 'video')
              return (
                <Col key={`vid-${index}`} xs={12} sm={6} className="flex-3-sm">
                  <VideoCard
                    className="bug-preview-media-item bug-preview-media-video"
                    index={index}
                    url={item.url}
                    onClick={() => onOpenLightbox(index)}
                  />
                </Col>
              );

            return null;
          })}
        </Row>
      </Grid>

      {showDivider && (
        <Divider style={{ marginBottom: `${appTheme.space.lg}` }} />
      )}
    </>
  );
}
