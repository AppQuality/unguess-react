import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { type ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import {
  AsideNav,
  StickyNavItem,
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation/asideNav';
import { appTheme } from 'src/app/theme';
import { EmptyState } from './EmptyState';
import { useWidgets } from './useWidgets';

export const CampaignWidgets = ({
  contentHeader,
}: {
  // Optional content rendered as a full-width row above the whole layout (both
  // the side navigation and the content column). Used by the entity overview
  // tab to place the meta row across the top; the legacy page passes nothing.
  contentHeader?: ReactNode;
}) => {
  const { entityId: resolvedCampaignId } = useParams<{ entityId?: string }>();
  const { widgets, isLoading } = useWidgets({
    campaignId: resolvedCampaignId ? Number(resolvedCampaignId) : 0,
  });
  const { all, footers, items, itemsWithTitles } = widgets;

  return all.length === 0 ? (
    <>
      {contentHeader}
      <EmptyState />
    </>
  ) : (
    <Grid gutters="xl">
      {contentHeader && (
        <Row>
          {/* Col carries a default 32px bottom margin; drop it so the only gap
              below the meta row is its own (40px), avoiding a doubled margin. */}
          <Col xs={12} style={{ marginBottom: 0 }}>
            {contentHeader}
          </Col>
        </Row>
      )}
      <Row>
        <Col xs={12} lg={2} style={{ margin: 0 }}>
          <AsideNav isLoading={isLoading} containerId="main">
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: appTheme.space.sm,
                }}
              >
                {footers.map((widget) => widget.content)}
              </div>
            </>
          </AsideNav>
        </Col>
        <Col xs={12} lg={10}>
          {items.map((widget) => widget.content)}
        </Col>
      </Row>
    </Grid>
  );
};
