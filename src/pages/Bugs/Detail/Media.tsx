import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { BugMedia as BugMediaType } from 'src/features/api';
import styled from 'styled-components';
import ImageCard from './ImageCard';
import VideoCard from './VideoCard';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin: ${({ theme }) => theme.space.lg} 0;
`;

export default ({ items }: { items: BugMediaType[] }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Grid>
        <Row>
          {items.map((item, index) => {
            // Check if item is an image or a video
            if (item.type.type === 'image')
              return (
                <Col xs={12} sm={6}>
                  <ImageCard index={index + 1} url={item.url} />
                </Col>
              );
            if (item.type.type === 'video')
              return (
                <Col xs={12} sm={6}>
                  <VideoCard index={index + 1} url={item.url} />
                </Col>
              );
            return null;
          })}
        </Row>
      </Grid>
    </Container>
  );
};
