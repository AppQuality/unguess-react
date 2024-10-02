import { Col, Paragraph, Row } from '@appquality/unguess-design-system';
import { t } from 'i18next';
import Picture from 'src/assets/empty-state-report.svg';
import { Divider } from 'src/common/components/divider';
import { SectionTitle } from '../../SectionTitle';

export const EmptyState = () => (
  <Row id="reports">
    <Col xs={12}>
      <SectionTitle
        title={t('__CAMPAIGN_PAGE_REPORTS_TITLE')}
        subtitle={t('__CAMPAIGN_PAGE_REPORTS_DESCRIPTION')}
      />
      <Divider />
    </Col>
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <img
        src={Picture}
        alt={t('__CAMPAIGN_PAGE_REPORTS_EMPTY_STATE_ALT')}
        style={{ maxWidth: '300px' }}
      />
      <Paragraph>{t('__CAMPAIGN_PAGE_REPORTS_EMPTY_STATE')}</Paragraph>
    </div>
  </Row>
);
