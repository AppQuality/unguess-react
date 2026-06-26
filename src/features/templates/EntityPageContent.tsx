import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useOutletContext } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { CampaignMetaRow } from 'src/pages/Campaign/CampaignMetaRow';
import { CampaignWidgets } from 'src/pages/Campaign/CampaignWidgets';
import styled from 'styled-components';
import type { CampaignHubContext } from './CampaignsHubsMiddleware';
import type { EntityPageTabId } from './EntityPageHeader';

const StyledMetaRow = styled(CampaignMetaRow)`
  margin-bottom: ${({ theme }) => theme.space.md};
`;

// Per-tab content rendered under the shared `EntityPageWrapper`. Each tab reuses
// an existing content-only component, so no legacy page header is rendered here.
//   overview   -> UN-2894 (this file: CampaignMetaRow + CampaignWidgets)
//   bug-list   -> UN-2895
//   media-list -> UN-2896 campaign / UN-2897 hub
//   insights   -> UN-2896 campaign / UN-2897 hub
type EntityOutletContext = CampaignHubContext & { activeTab: EntityPageTabId };

const EntityPageContent = () => {
  const { isHub, entityId, activeTab } =
    useOutletContext<EntityOutletContext>();

  if (!isHub && activeTab === 'overview') {
    return (
      <LayoutWrapper>
        <Grid>
          <Row>
            <Col>
              <StyledMetaRow campaignId={entityId} />
              <CampaignWidgets />
            </Col>
          </Row>
        </Grid>
      </LayoutWrapper>
    );
  }

  // Other tabs are migrated in the following subtasks.
  return null;
};

export default EntityPageContent;
