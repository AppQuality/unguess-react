import { Button, Col, Row } from '@appquality/unguess-design-system';
import { ReactComponent as ChevronLeftIcon } from '@zendeskgarden/svg-icons/src/12/chevron-left-stroke.svg';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { usePatchPlansByPidStatusMutation } from 'src/features/api';
import styled from 'styled-components';
import { StickyCol } from '../common/StickyCol';
import { TabTitle } from '../common/TabTitle';
import { usePlanContext } from '../context/planContext';
import { usePlan } from '../hooks/usePlan';
import { ActivityInfo } from './components/ActivityInfo';
import { ConfirmationCard } from './components/ConfirmationCard';
import { DetailsCard } from './components/DetailsCard';
import { GoToDashboardCard } from './components/GoToDashboard';
import { IntroductionCard } from './components/IntroductionCard';
import { PaymentLoader } from './components/PaymentLoader';
import { SaveTemplateCard } from './components/SaveTemplateCard';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const SummaryBody = () => {
  const { t } = useTranslation();
  const { planId } = useParams();
  const { plan } = usePlan(planId);
  const { setActiveTab, isPaymentInProgress } = usePlanContext();
  const [patchStatus] = usePatchPlansByPidStatusMutation();
  const [search] = useSearchParams();

  useEffect(() => {
    if (search && search.get('payment') === 'failed') {
      patchStatus({
        pid: planId?.toString() ?? '',
        body: {
          status: 'draft',
        },
      })
        .unwrap()
        .then(() => {
          const url = window.location.origin + window.location.pathname;
          window.history.replaceState({}, '', url);
          window.location.reload();
        })
        .catch((err) => {
          console.error(
            'Error updating plan status after payment failure',
            err
          );
        });
    }
  }, [search]);

  if (!plan) return null;

  if (plan.status === 'draft') {
    setActiveTab('setup');
    return null;
  }

  return (
    <Row>
      <Col sm="6" offsetSm={3}>
        <StyledDiv>
          <TabTitle />
          <IntroductionCard />
          <ActivityInfo />
          {!plan.isPurchasable && <ConfirmationCard />}
          <SaveTemplateCard />
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
      <StickyCol sm="3">
        <DetailsCard />
      </StickyCol>
      {isPaymentInProgress && <PaymentLoader />}
    </Row>
  );
};

export default SummaryBody;
