import {
  CampaignCard,
  Col,
  Row,
  Skeleton,
} from '@appquality/unguess-design-system';
import { theme as globalTheme } from 'src/app/theme';

export const LoadingServices = () => (
  <>
    <Row>
      <Col>
        <Skeleton
          width="100px"
          height="28px"
          style={{ marginBottom: globalTheme.space.sm }}
        />
      </Col>
    </Row>
    <Row>
      <Col>
        <Skeleton
          width="250px"
          height="16px"
          style={{ marginBottom: globalTheme.space.lg }}
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={6} lg={4}>
        <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
      </Col>
      <Col xs={12} md={6} lg={4}>
        <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
      </Col>
      <Col xs={12} md={6} lg={4}>
        <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
      </Col>
    </Row>
  </>
);
