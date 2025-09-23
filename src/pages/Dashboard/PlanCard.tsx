import { PlanCard as UGPlanCard } from '@appquality/unguess-design-system';
import { useNavigate } from 'react-router-dom';
import { GetWorkspacesByWidPlansApiResponse } from 'src/features/api';
import { usePlan } from 'src/hooks/usePlan';
import { usePlanStatusLabel } from 'src/hooks/usePlanStatusLabel';

export const PlanCard = ({
  plan,
}: {
  plan: GetWorkspacesByWidPlansApiResponse[number];
}) => {
  const { planComposedStatus } = usePlan(plan.id.toString());
  const statusLabel = usePlanStatusLabel({ planStatus: planComposedStatus });
  const navigate = useNavigate();
  const navigateToPlan = () => {
    navigate(`/plans/${plan.id}`);
  };
  return (
    <UGPlanCard
      status={planComposedStatus}
      i18n={{ statusLabel }}
      onClick={navigateToPlan}
    >
      <UGPlanCard.ProjectLabel>{plan.project.title}</UGPlanCard.ProjectLabel>
      <UGPlanCard.Title>{plan.title}</UGPlanCard.Title>
    </UGPlanCard>
  );
};
