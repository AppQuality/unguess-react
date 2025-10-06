import { PlanCard as UGPlanCard } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GetWorkspacesByWidPlansApiResponse } from 'src/features/api';
import { usePlan } from 'src/hooks/usePlan';
import { usePlanStatusLabel } from 'src/hooks/usePlanStatusLabel';
import { PlanComposedStatusType } from 'src/types';

export const PlanCard = ({
  plan,
}: {
  plan: GetWorkspacesByWidPlansApiResponse[number];
}) => {
  const { planComposedStatus } = usePlan(plan.id.toString());
  const { t } = useTranslation();
  const statusLabel = usePlanStatusLabel({ planStatus: planComposedStatus });
  const navigate = useNavigate();
  const navigateToPlan = () => {
    navigate(`/plans/${plan.id}`);
  };

  const getPlanLabel = (planStatus?: PlanComposedStatusType) => {
    switch (planStatus) {
      case 'PurchasableDraft':
      case 'UnquotedDraft':
      case 'PrequotedDraft':
        return t('_PLAN_CARD_LABEL_FINALIZE');
      case 'Submitted':
      case 'OpsCheck':
      case 'Paying':
        return t('_PLAN_CARD_LABEL_LOOK');
      case 'AwaitingPayment':
      case 'AwaitingApproval':
        return t('_PLAN_CARD_LABEL_CONFIRM');
      default:
        return '';
    }
  };
  return (
    <UGPlanCard
      status={planComposedStatus}
      i18n={{ statusLabel, planLabel: getPlanLabel(planComposedStatus) }}
      onClick={navigateToPlan}
    >
      <UGPlanCard.ProjectLabel>{plan.project.title}</UGPlanCard.ProjectLabel>
      <UGPlanCard.Title>{plan.title}</UGPlanCard.Title>
    </UGPlanCard>
  );
};
