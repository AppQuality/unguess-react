import { useTranslation } from 'react-i18next';
import { PlanComposedStatusType } from 'src/types';

export const usePlanStatusLabel = ({
  planStatus,
}: {
  planStatus?: PlanComposedStatusType;
}): string => {
  const { t } = useTranslation();
  if (!planStatus) {
    return '';
  }
  const statusMap: Record<PlanComposedStatusType, string> = {
    UnquotedDraft: t('___PLAN_STATUS_UNQUOTED_DRAFT'),
    PrequotedDraft: t('___PLAN_STATUS_PREQUOTED_DRAFT'),
    PurchasableDraft: t('___PLAN_STATUS_PURCHASABLE_DRAFT'),
    Submitted: t('___PLAN_STATUS_SUBMITTED'),
    OpsCheck: t('___PLAN_STATUS_OPS_CHECK'),
    AwaitingApproval: t('___PLAN_STATUS_AWAITING_APPROVAL'),
    Accepted: t('___PLAN_STATUS_ACCEPTED'),
    RunningPlan: t('___PLAN_STATUS_RUNNING_PLAN'),
    AwaitingPayment: t('___PLAN_STATUS_AWAITING_PAYMENT'),
    Paying: t('___PLAN_STATUS_PAYING'),
    PurchasedPlan: t('___PLAN_STATUS_PURCHASED_PLAN'),
  };

  return statusMap[`${planStatus}`];
};
