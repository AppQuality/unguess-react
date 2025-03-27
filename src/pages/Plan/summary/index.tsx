import { Col, Row } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { SectionTitle } from '../common/SectionTitle';
import { usePlanTab } from '../context/planContext';
import { usePlan } from '../hooks/usePlan';
import { ActivityInfo } from './components/ActivityInfo';
import { ConfirmationCard } from './components/ConfirmationCard';
import { DetailsCard } from './components/DetailsCard';
import { GoToDashboardCard } from './components/GoToDashboard';
import { IntroductionCard } from './components/IntroductionCard';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const SummaryBody = () => {
  const { t } = useTranslation();
  const { planId } = useParams();
  const { plan } = usePlan(planId);
  const { setActiveTab } = usePlanTab();
  if (!plan) return null;

  if (plan.status === 'draft') setActiveTab('setup');

  return (
    <Row>
      <Col sm="6" offsetSm={3}>
        <StyledDiv>
          <SectionTitle isBold>
            {t('__PLAN_PAGE_SUMMARY_TAB_TITLE')}
          </SectionTitle>
          <IntroductionCard />
          <ActivityInfo />
          <ConfirmationCard />
          <GoToDashboardCard />
        </StyledDiv>
      </Col>
      <Col sm="3">
        <DetailsCard />
      </Col>
    </Row>
  );
};

export default SummaryBody;
