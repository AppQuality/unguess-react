import { Col, Row, Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ChevronLeftIcon } from '@zendeskgarden/svg-icons/src/12/chevron-left-stroke.svg';
import { appTheme } from 'src/app/theme';
import { SectionTitle } from '../common/SectionTitle';
import { usePlanTab } from '../context/planContext';
import { usePlan } from '../hooks/usePlan';
import { ActivityInfo } from './components/ActivityInfo';
import { ConfirmationCard } from './components/ConfirmationCard';
import { DetailsCard } from './components/DetailsCard';
import { GoToDashboardCard } from './components/GoToDashboard';
import { IntroductionCard } from './components/IntroductionCard';
import { TabTitle } from '../common/TabTitle';

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

  if (plan.status === 'draft') {
    setActiveTab('setup');
    return null;
  }

  return (
    <Row>
      <Col sm="6" offsetSm={3}>
        <StyledDiv>
          <TabTitle tabId="summary" />
          <IntroductionCard />
          <ActivityInfo />
          <ConfirmationCard />
          <GoToDashboardCard />
        </StyledDiv>
        <Button
          style={{ marginTop: appTheme.space.md }}
          isBasic
          size="small"
          onClick={() => {
            setActiveTab('instructions');
          }}
        >
          <Button.StartIcon>
            <ChevronLeftIcon />
          </Button.StartIcon>
          {t('__MODULES_BOTTOM_NAVIGATION_SUMMARY_TAB_LEFT_LABEL')}
        </Button>
      </Col>
      <Col sm="3">
        <DetailsCard />
      </Col>
    </Row>
  );
};

export default SummaryBody;
