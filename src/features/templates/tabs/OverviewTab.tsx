import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useOutletContext } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { CampaignMetaRow } from 'src/pages/Campaign/CampaignMetaRow';
import { CampaignWidgets } from 'src/pages/Campaign/CampaignWidgets';
import styled from 'styled-components';
import type { EntityTabContext } from '../entityTabs';

const StyledMetaRow = styled(CampaignMetaRow)`
  margin-bottom: ${({ theme }) => theme.space.md};
`;

/**
 * Campaign overview tab body. Reuses the content-only `CampaignWidgets` and a
 * `CampaignMetaRow` (status/duration/devices) at the top — no legacy page
 * header is rendered here, the shared `EntityPageHeader` owns it.
 */
export const OverviewTab = () => {
  const { entityId } = useOutletContext<EntityTabContext>();

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
};
