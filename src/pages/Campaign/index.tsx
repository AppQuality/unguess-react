import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { StickyContainer } from 'src/common/components/StickyContainer';
import {
  StickyNavItem,
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation';
import CampaignPage from './CampaignPage';
import { EmptyState } from './EmptyState';
import { useWidgets } from './useWidgets';

const Campaign = () => {
  const { campaignId } = useParams();
  const { widgets } = useWidgets({
    campaignId: campaignId ? Number(campaignId) : 0,
  });
  const { all, footers, items, itemsWithTitles } = widgets;

  return (
    <CampaignPage>
      {all.length === 0 ? (
        <EmptyState />
      ) : (
        <Grid gutters="xl">
          <Row>
            <Col xs={12} lg={3}>
              <StickyContainer>
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
              </StickyContainer>
            </Col>
            <Col xs={12} lg={9}>
              {items.map((widget) => widget.content)}
            </Col>
          </Row>
        </Grid>
      )}
    </CampaignPage>
  );
};

export default Campaign;
