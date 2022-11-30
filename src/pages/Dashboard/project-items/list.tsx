import { Row, Col } from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import { Campaign } from 'src/features/api';
import { getLocalizeDashboardRoute } from 'src/hooks/useLocalizeDashboardUrl';
import { CampaignItem } from '../CampaignItem';
import { CampaignActionProps } from '../types';

const CardGroup = ({ items }: { items: Array<Campaign> }) => {
  const clickToggle = (props: CampaignActionProps) => {
    window.location.href = getLocalizeDashboardRoute(props);
  };

  return (
    <>
      {items.map((campaign) => (
        <Col size={3} xs={12} md={6} lg={3}>
          <CampaignItem
            key={`campaign_${campaign.id}`}
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
