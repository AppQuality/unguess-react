import { useMemo } from 'react';
import {
  useGetPlansByPidCheckoutItemQuery,
  useGetPlansByPidQuery,
  useGetWorkspacesByWidTemplatesAndTidQuery,
  useGetCampaignsByCidQuery,
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
  const campaignId = plan?.campaign?.id;

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

  const {
    data: planCampaign,
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
  } = useGetCampaignsByCidQuery(
    {
      cid: campaignId?.toString() ?? '',
    },
    {
      skip: !campaignId,
    }
  );

  const planComposedStatus: PlanComposedStatusType | undefined = useMemo(() => {
    if (!plan) return undefined;

    const hasCI = !!ci; // checkout item present
    const quoteStatus = plan.quote?.status;
    const hasTemplateQuote = planTemplate?.price !== undefined;
    const cpStatus = planCampaign?.status.name;

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
        if (hasCI && cpStatus === 'running') return 'PurchasedPlan'; // purchased & running
        if (cpStatus === 'running') return 'RunningPlan'; // running without checkout item context
        if (quoteStatus === 'approved') return 'Accepted';
        throw new Error(`Unknown approved plan status for plan: ${plan.id}`);
      }

      case 'paying': {
        return 'Paying'; // in payment flow
      }

      default:
        throw new Error(`Unknown plan status for plan: ${plan.id}`);
    }
  }, [plan, ci]);

  if (!plan) {
    return {
      isLoading:
        isLoading || isCiLoading || isTemplateLoading || isCampaignLoading,
      isFetching:
        isFetching || isCiFetching || isTemplateFetching || isCampaignFetching,
      activeWorkspace,
      plan: undefined,
      checkoutItem: ci,
      planComposedStatus,
    };
  }

  return {
    isLoading:
      isLoading || isCiLoading || isTemplateLoading || isCampaignLoading,
    isFetching:
      isFetching || isCiFetching || isTemplateFetching || isCampaignFetching,
    activeWorkspace,
    plan: { ...plan, isPurchasable: !!ci },
    checkoutItem: ci,
    planComposedStatus,
  };
};

export { usePlan };
