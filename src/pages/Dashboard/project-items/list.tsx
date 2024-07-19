import { Col, Row } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { Campaign } from 'src/features/api';
import { CampaignItem } from '../CampaignItem';

const CardGroup = ({ items }: { items: Array<Campaign> }) => (
  <>
    {items.map((campaign) => (
      <Col size={3} xs={12} md={6} lg={3}>
        <CampaignItem
          key={`campaign_${campaign.id}`}
          campaign={campaign}
          style={{ marginBottom: `${appTheme.space.base * 4}px` }}
        />
      </Col>
    ))}
  </>
);

export const CardList = ({ campaigns }: { campaigns: Array<Campaign> }) => (
  <Row>
    <CardGroup items={campaigns} />
  </Row>
);
