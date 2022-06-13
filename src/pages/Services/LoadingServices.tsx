import {
  CampaignCard,
  Col,
  Row,
  Skeleton,
} from '@appquality/unguess-design-system';

export const LoadingServices = () => (
  <>
    <Row>
      <Col>
        <Skeleton width="100px" height="28px" style={{ marginBottom: '8px' }} />
      </Col>
    </Row>
    <Row>
      <Col>
        <Skeleton
          width="250px"
          height="16px"
          style={{ marginBottom: '16px' }}
        />
      </Col>
    </Row>
    <Row>
      <Col size={4}>
        <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
      </Col>
      <Col size={4}>
        <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
      </Col>
      <Col size={4}>
        <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
      </Col>
    </Row>
  </>
);
