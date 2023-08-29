import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { EmptyState } from '../EmptyState';
import { useWidgets } from '../useWidgets';

export const PreviewWidgets = () => {
  const { campaignId } = useParams();
  const { widgets } = useWidgets({
    campaignId: campaignId ? Number(campaignId) : 0,
    isPreview: true,
  });
  const { all, items } = widgets;

  return all.length === 0 ? (
    <EmptyState />
  ) : (
    <Grid gutters="xl">
      <Row>
        <Col xs={12}>{items.map((widget) => widget.content)}</Col>
      </Row>
    </Grid>
  );
};
