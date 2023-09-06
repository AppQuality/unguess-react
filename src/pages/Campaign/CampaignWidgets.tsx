import { Col, Grid, Row, Skeleton } from '@appquality/unguess-design-system';
import {
  StickyNavItem,
  StickyNavItemLabel,
  StyledDivider,
  StickyNavContainer,
} from 'src/common/components/navigation';
import { useParams } from 'react-router-dom';
import { EmptyState } from './EmptyState';
import { useWidgets } from './useWidgets';

export const CampaignWidgets = () => {
  const { campaignId } = useParams();
  const { widgets, isLoading } = useWidgets({
    campaignId: campaignId ? Number(campaignId) : 0,
  });
  const { all, footers, items, itemsWithTitles } = widgets;

  return all.length === 0 ? (
    <EmptyState />
  ) : (
    <Grid gutters="xl">
      <Row>
        <Col xs={12} lg={2}>
          <StickyNavContainer>
            {isLoading ? (
              <Skeleton height="300px" />
            ) : (
              <>
                {itemsWithTitles.map((widget) => {
                  switch (widget.type) {
                    case 'title':
                      return (
                        <StickyNavItemLabel>{widget.title}</StickyNavItemLabel>
                      );
                    case 'item':
                      return (
                        <StickyNavItem
                          id={`anchor-${widget.id}`}
                          to={widget.id}
                          containerId="main"
                          spy
                          smooth
                          duration={500}
                          offset={-30}
                        >
                          {widget.title}
                        </StickyNavItem>
                      );
                    default:
                      return null;
                  }
                })}
                {footers.length > 0 && <StyledDivider />}
                {footers.map((widget) => widget.content)}
              </>
            )}
          </StickyNavContainer>
        </Col>
        <Col xs={12} lg={10}>
          {items.map((widget) => widget.content)}
        </Col>
      </Row>
    </Grid>
  );
};
