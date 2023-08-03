import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useGetCampaignWithWorkspaceQuery } from 'src/features/api/customEndpoints/getCampaignWithWorkspace';
import { setWorkspace } from 'src/features/navigation/navigationSlice';
import { Page } from 'src/features/templates/Page';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useEffect } from 'react';
import { StickyContainer } from 'src/common/components/StickyContainer';
import {
  StickyNavItem,
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation';
import { useWidgets } from '../useWidgets';
import { EmptyState } from '../EmptyState';

const CampaignPreview = () => {
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const { campaignId } = useParams();
  const dispatch = useAppDispatch();
  const { widgets } = useWidgets({
    campaignId: campaignId ? Number(campaignId) : 0,
  });
  const { all, footers, items, itemsWithTitles } = widgets;

  if (!campaignId || Number.isNaN(Number(campaignId))) {
    navigate(notFoundRoute);
  }

  const {
    isLoading: isLoadingCampaign,
    isFetching: isFetchingCampaign,
    isError: isErrorCampaign,
    data: { campaign, workspace } = {},
  } = useGetCampaignWithWorkspaceQuery({
    cid: campaignId?.toString() ?? '0',
  });

  if (isErrorCampaign) {
    navigate(notFoundRoute);
  }

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [workspace, dispatch]);

  if (!campaign) return null;

  return (
    <Page
      title={(campaign && campaign.customer_title) ?? 'Campaign'}
      route="campaigns"
      isMinimal
    >
      <LayoutWrapper>
        <Grid>
          <Row>
            {all.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <Col xs={12} lg={3}>
                  <StickyContainer>
                    {itemsWithTitles.map((widget) => {
                      switch (widget.type) {
                        case 'title':
                          return (
                            <StickyNavItemLabel>
                              {widget.title}
                            </StickyNavItemLabel>
                          );
                        case 'item':
                          return (
                            <StickyNavItem
                              id={`"anchor-${widget.id}`}
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
              </>
            )}
          </Row>
        </Grid>
      </LayoutWrapper>
    </Page>
  );
};

export default CampaignPreview;
