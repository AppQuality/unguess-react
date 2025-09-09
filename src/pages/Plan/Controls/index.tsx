import { useToast, Notification } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Pipe } from 'src/common/components/Pipe';
import { useModule } from 'src/features/modules/useModule';
import styled from 'styled-components';
import { useSubmit } from '../../../features/modules/useModuleConfiguration';
import { getPlanStatus } from '../../Dashboard/hooks/getPlanStatus';
import { usePlanContext } from '../context/planContext';
import { usePlan } from '../hooks/usePlan';
import { DeletePlanModal } from '../modals/DeletePlanModal';
import { SendRequestModal } from '../modals/SendRequestModal';
import { ConfirmPlanButton } from './ConfirmPlanButton';
import { GoToCampaignButton } from './GoToCampaignButton';
import { IconButtonMenu } from './IconButtonMenu';
import { RequestQuotationButton } from './RequestQuotationButton';
import { SaveConfigurationButton } from './SaveConfigurationButton';
import { unguessApiSlice } from 'src/features/api/apiTags';

const StyledPipe = styled(Pipe)`
  display: inline;
  margin: 0;
  height: auto;
`;

export const Controls = () => {
  const { t } = useTranslation();
  const [isRequestQuotationModalOpen, setRequestQuotationModalOpen] =
    useState(false);
  const { isDeleteModalOpen, setIsDeleteModalOpen } = usePlanContext();
  const { planId } = useParams();
  const { plan } = usePlan(planId);
  const { value: titleValue } = useModule('title'); // to use the current changed title value (also if plan is not saved) in delete modal
  const { addToast } = useToast();
  const { handleSubmit } = useSubmit(planId || '');
  const [trigger] =
    unguessApiSlice.endpoints.getPlansByPidRulesEvaluation.useLazyQuery();

  if (!plan) return null;

  const { status } = getPlanStatus({
    planStatus: plan.status,
    quote: plan.quote,
    t,
  });

  const handleRequestQuotation = async () => {
    try {
      await handleSubmit();
      if (plan.isPurchasable) {
        const { data, isError } = await trigger({ pid: planId || '' });
        if (isError) {
          throw new Error('Failed to fetch rules evaluation');
        }
        if (data && data.failed.length > 0) {
          // todo: Handle failed rules evaluation
          // setFailedRules(data.failed);
        }
      }
      setRequestQuotationModalOpen(true);
    } catch (e) {
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="error"
            role="alert"
            title={t('__PLAN_PAGE_MODAL_SEND_REQUEST_TOAST_ERROR')}
            message={
              e instanceof Error && e.message
                ? e.message
                : t('__PLAN_PAGE_MODAL_SEND_REQUEST_TOAST_ERROR')
            }
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
    }
  };

  return (
    <div
      style={{ display: 'flex', gap: appTheme.space.xs, alignItems: 'center' }}
    >
      {status === 'approved' && <GoToCampaignButton />}
      {status !== 'draft' && status !== 'approved' && <ConfirmPlanButton />}
      {status === 'draft' && (
        <>
          <SaveConfigurationButton />
          <StyledPipe />
          <RequestQuotationButton onClick={handleRequestQuotation} />
        </>
      )}

      <IconButtonMenu />
      {isDeleteModalOpen && planId && (
        <DeletePlanModal
          planId={planId}
          planTitle={titleValue?.output ?? ''}
          onQuit={() => setIsDeleteModalOpen(false)}
        />
      )}

      {isRequestQuotationModalOpen && (
        <SendRequestModal onQuit={() => setRequestQuotationModalOpen(false)} />
      )}
    </div>
  );
};
