import { useMemo } from 'react';
import {
  useGetPlansByPidCheckoutItemQuery,
  useGetPlansByPidQuery,
  useGetWorkspacesByWidTemplatesAndTidQuery,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { PlanComposedStatusType } from 'src/types';

const usePlan = (planId?: string) => {
  const { activeWorkspace } = useActiveWorkspace();
  const {
    isLoading,
    isFetching,
    data: plan,
  } = useGetPlansByPidQuery(
    {
      pid: planId ?? '',
    },
    {
      skip: !activeWorkspace || !planId,
    }
  );

  const {
    data: ci,
    isLoading: isCiLoading,
    isFetching: isCiFetching,
  } = useGetPlansByPidCheckoutItemQuery(
    {
      pid: planId ?? '',
    },
    {
      skip: !activeWorkspace || !planId,
    }
  );

  // Fetch template and campaign only if plan is loaded and has the relevant ids
  const templateId = plan?.from_template?.id;
  const workspaceId = plan?.workspace_id;

  const {
    data: planTemplate,
    isLoading: isTemplateLoading,
    isFetching: isTemplateFetching,
  } = useGetWorkspacesByWidTemplatesAndTidQuery(
    {
      wid: workspaceId?.toString() ?? '',
      tid: templateId?.toString() ?? '',
    },
    {
      skip: !workspaceId || !templateId,
    }
  );

  const planComposedStatus: PlanComposedStatusType | undefined = useMemo(() => {
    if (!plan) return undefined;

    const hasCI = !!ci; // checkout item present
    const quoteStatus = plan.quote?.status;
    const hasTemplateQuote = planTemplate?.price !== undefined;

    switch (plan.status) {
      case 'draft': {
        // Draft variations
        if (hasCI) return 'PurchasableDraft'; // checkout item exists
        if (hasTemplateQuote) return 'PrequotedDraft'; // template quote attached
        return 'UnquotedDraft';
      }

      case 'pending_review': {
        // Pending review variations
        if (hasCI) return 'AwaitingPayment'; // checkout item present while waiting
        if (quoteStatus === 'pending') return 'OpsCheck'; // operational checks on quote
        if (quoteStatus === 'proposed') return 'AwaitingApproval'; // quote proposed, awaiting approval
        return 'Submitted'; // generic submitted without quote info
      }

      case 'approved': {
        // Approved variations
        if (hasCI) return 'PurchasedPlan'; // purchased
        if (quoteStatus === 'approved') return 'Accepted'; // quote approved
        return 'RunningPlan'; // running without checkout item or quote context
      }

      case 'paying': {
        return 'Paying'; // in payment flow
      }

      default:
        throw new Error(`Unknown plan status for plan: ${plan.id}`);
    }
  }, [plan, ci, planTemplate]);

  if (!plan) {
    return {
      isLoading: isLoading || isCiLoading || isTemplateLoading,
      isFetching: isFetching || isCiFetching || isTemplateFetching,
      activeWorkspace,
      plan: undefined,
      checkoutItem: ci,
      planComposedStatus,
    };
  }

  return {
    isLoading: isLoading || isCiLoading || isTemplateLoading,
    isFetching: isFetching || isCiFetching || isTemplateFetching,
    activeWorkspace,
    plan: { ...plan, isPurchasable: !!ci },
    checkoutItem: ci,
    planComposedStatus,
  };
};

export { usePlan };
