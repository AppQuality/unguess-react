import { TFunction } from 'i18next';

type IPlanStatus =
  | 'draft'
  | 'submitted'
  | 'pending_quote_review'
  | 'approved'
  | 'paying';
export const getPlanStatus = ({
  planStatus,
  quote,
  t,
}: {
  planStatus: string;
  quote?: { status: string } | null;
  t: TFunction;
}): {
  status: IPlanStatus;
  statusLabel: string;
} => {
  if (planStatus === 'pending_review') {
    if (!quote || quote.status === 'pending')
      return {
        status: 'submitted' as IPlanStatus,
        statusLabel: t('__DASHBOARD_CARD_PLAN_STATUS_SUBMITTED'),
      };

    return {
      status: 'pending_quote_review' as IPlanStatus,
      statusLabel: t('__DASHBOARD_CARD_PLAN_STATUS_AWAITING_APPROVAL'),
    };
  }

  if (planStatus === 'approved')
    return {
      status: 'approved' as IPlanStatus,
      statusLabel: t('__DASHBOARD_CARD_PLAN_STATUS_APPROVED'),
    };

  if (planStatus === 'paying')
    return {
      status: 'paying' as IPlanStatus,
      statusLabel: t('__DASHBOARD_CARD_PLAN_STATUS_PAYING'),
    };

  return {
    status: 'draft' as IPlanStatus,
    statusLabel: t('__DASHBOARD_CARD_PLAN_STATUS_DRAFT'),
  };
};
