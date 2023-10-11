import {
  CampaignCard,
  Col,
  Main,
  Row,
  Skeleton,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { Divider } from './divider';

export const PageLoader = () => (
  <Main>
    <Skeleton
      width="30%"
      height="32px"
      style={{ marginTop: appTheme.space.sm, marginLeft: appTheme.space.sm }}
    />
    <Divider style={{ margin: '24px 0' }} />
    <Row>
      <Col xs={12} md={6} lg={3}>
        <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
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
    </Row>
  </Main>
);
