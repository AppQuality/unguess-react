import { Col } from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { StickyContainer } from 'src/common/components/StickyContainer';
import {
  StickyNavItem,
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation';
import { useGetCampaignWithWorkspaceQuery } from 'src/features/api/customEndpoints/getCampaignWithWorkspace';
import { setWorkspace } from '../../features/navigation/navigationSlice';
import CampaignPage from './CampaignPage';
import { EmptyState } from './EmptyState';
import { useWidgets } from './useWidgets';

const Campaign = () => {
  const { campaignId } = useParams();
  const dispatch = useAppDispatch();
  const { data: { workspace } = {} } = useGetCampaignWithWorkspaceQuery({
    cid: campaignId?.toString() ?? '0',
  });
  const { widgets } = useWidgets({
    campaignId: campaignId ? Number(campaignId) : 0,
  });
  const { all, footers, items, itemsWithTitles } = widgets;

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [workspace, dispatch]);

  return (
    <CampaignPage>
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
                      <StickyNavItemLabel>{widget.title}</StickyNavItemLabel>
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
    </CampaignPage>
  );
};

export default Campaign;
