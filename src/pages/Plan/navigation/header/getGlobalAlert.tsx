import { GlobalAlert } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { usePlan } from '../../../../hooks/usePlan';

export const useGlobalAlert = () => {
  const { planId } = useParams();
  const { planComposedStatus } = usePlan(planId);
  const { t } = useTranslation();

  switch (planComposedStatus) {
    case 'Paying':
      return (
        <GlobalAlert
          message={<>{t('PLAN_GLOBAL_ALERT_PAYING_STATE_MESSAGE')}</>}
          title={t('PLAN_GLOBAL_ALERT_PAYING_STATE_TITLE')}
          type="info"
        />
      );
    case 'Submitted':
    case 'OpsCheck':
      return (
        <GlobalAlert
          message={<>{t('PLAN_GLOBAL_ALERT_SUBMITTED_STATE_MESSAGE')}</>}
          title={t('PLAN_GLOBAL_ALERT_SUBMITTED_STATE_TITLE')}
          type="info"
        />
      );
    case 'AwaitingApproval':
    case 'AwaitingPayment':
      return (
        <GlobalAlert
          message={<>{t('PLAN_GLOBAL_ALERT_AWATING_STATE_MESSAGE')}</>}
          title={t('PLAN_GLOBAL_ALERT_AWATING_STATE_TITLE')}
          type="info"
        />
      );
    case 'Accepted':
    case 'RunningPlan':
      return (
        <GlobalAlert
          message={<>{t('PLAN_GLOBAL_ALERT_APPROVED_STATE_MESSAGE')}</>}
          title={t('PLAN_GLOBAL_ALERT_APPROVED_STATE_TITLE')}
          type="success"
        />
      );
    case 'PurchasedPlan':
      return (
        <GlobalAlert
          message={<>{t('PLAN_GLOBAL_ALERT_PURCHASED_STATE_MESSAGE')}</>}
          title={t('PLAN_GLOBAL_ALERT_PURCHASED_STATE_TITLE')}
          type="success"
        />
      );
    default:
      return null;
  }
};
