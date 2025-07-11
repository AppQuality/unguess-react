import { Col, Row, Skeleton } from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { StyledContainerCard, StyledCardHeader } from './common';

export const Loader = () => (
  <StyledContainerCard
    id="anchor-profile-id"
    data-qa="profile-card"
    style={{ marginBottom: appTheme.space.xxl, height: 'auto' }}
    title={t('__PROFILE_PAGE_USER_CARD_LABEL')}
  >
    <StyledCardHeader>
      <Skeleton width="100px" height="20px" />
    </StyledCardHeader>
    <Divider style={{ marginBottom: appTheme.space.md }} />
    <Row style={{ marginBottom: appTheme.space.md }}>
      <Col style={{ marginBottom: appTheme.space.xs }}>
        <Skeleton width="100%" height="20px" />
      </Col>
      <Col style={{ marginBottom: appTheme.space.xs }}>
        <Skeleton width="100%" height="20px" />
      </Col>
    </Row>
  </StyledContainerCard>
);
