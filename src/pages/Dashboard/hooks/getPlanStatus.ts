import { GetWorkspacesByWidPlansApiResponse } from 'src/features/api';
import { TFunction } from 'i18next';

type IPlanStatus = 'draft' | 'submitted' | 'pending_quote_review' | 'approved';
export const getPlanStatus = (
  plan: Omit<GetWorkspacesByWidPlansApiResponse[number], 'title' | 'project'>,
  t: TFunction
): {
  status: IPlanStatus;
  statusLabel: string;
} => {
  if (plan.status === 'pending_review') {
    if (!plan.quote || plan.quote.status === 'pending')
      return {
        status: 'submitted' as IPlanStatus,
        statusLabel: t('__DASHBOARD_CARD_PLAN_STATUS_SUBMITTED'),
      };

    return {
      status: 'pending_quote_review' as IPlanStatus,
      statusLabel: t('__DASHBOARD_CARD_PLAN_STATUS_AWAITING_APPROVAL'),
    };
  }

  if (plan.status === 'approved')
    return {
      status: 'approved' as IPlanStatus,
      statusLabel: t('__DASHBOARD_CARD_PLAN_STATUS_APPROVED'),
    };

  return {
    status: 'draft' as IPlanStatus,
    statusLabel: t('__DASHBOARD_CARD_PLAN_STATUS_DRAFT'),
  };
};
