import {
  Col,
  Row,
  Paragraph,
  theme,
  Skeleton,
  CampaignCard,
} from '@appquality/unguess-design-system';

export const CardRowLoading = () => (
  <Row>
    <Col size={12} style={{ marginBottom: `${theme.space.base * 4}px` }}>
      <Paragraph>
        <Skeleton width="200px" height="12px" />
      </Paragraph>
    </Col>
    <Col xs={12} md={6} lg={3}>
      <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
    </Col>
    <Col xs={12} md={6} lg={3}>
      <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
    </Col>
    <Col xs={12} md={6} lg={3}>
      <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
    </Col>
    <Col size={3}>
      <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
    </Col>
  </Row>
);
