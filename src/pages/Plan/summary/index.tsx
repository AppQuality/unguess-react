import { Col, Row } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '../common/SectionTitle';
import { ActivityInfo } from './components/ActivityInfo';
import { IntroductionCard } from './components/IntroductionCard';

const SummaryBody = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col sm="6" offsetSm={3}>
        <SectionTitle isBold>{t('__PLAN_PAGE_SUMMARY_TAB_TITLE')}</SectionTitle>
        <IntroductionCard />
        <ActivityInfo />
      </Col>
      <Col sm="3">prezzo</Col>
    </Row>
  );
};

export default SummaryBody;
