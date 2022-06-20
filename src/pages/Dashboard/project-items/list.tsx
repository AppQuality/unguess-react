import { Row, Col, theme } from '@appquality/unguess-design-system';
import { Campaign } from 'src/features/api';
import { getLocalizeRoute } from 'src/hooks/useLocalizeDashboardUrl';
import { CampaignItem } from '../CampaignItem';

const CardGroup = ({ items }: { items: Array<Campaign> }) => {
  const clickToggle = (campaignId: number, cpType: string) => {
    window.location.href = getLocalizeRoute(campaignId, cpType);
  };

  return (
    <>
      {items.map((campaign) => (
        <Col size={3} xs={12} md={6} lg={3}>
          <CampaignItem
            key={campaign.id}
            campaign={campaign}
            onCampaignClicked={clickToggle}
            style={{ marginBottom: `${theme.space.base * 4}px` }}
          />
        </Col>
      ))}
    </>
  );
};

export const CardList = ({ campaigns }: { campaigns: Array<Campaign> }) => (
  <Row>
    <CardGroup items={campaigns} />
  </Row>
);
