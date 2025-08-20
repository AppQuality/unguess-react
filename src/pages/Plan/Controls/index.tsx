import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Pipe } from 'src/common/components/Pipe';
import { useGetPlansByPidCheckoutItemQuery } from 'src/features/api';
import { useModule } from 'src/features/modules/useModule';
import styled from 'styled-components';
import { getPlanStatus } from '../../Dashboard/hooks/getPlanStatus';
import { usePlanContext } from '../context/planContext';
import { usePlan } from '../hooks/usePlan';
import { DeletePlanModal } from '../modals/DeletePlanModal';
import { SendRequestModal } from '../modals/SendRequestModal';
import { BuyPlanButton } from './BuyPlanButton';
import { ConfirmPlanButton } from './ConfirmPlanButton';
import { GoToCampaignButton } from './GoToCampaignButton';
import { IconButtonMenu } from './IconButtonMenu';
import { RequestQuotationButton } from './RequestQuotationButton';
import { SaveConfigurationButton } from './SaveConfigurationButton';

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

  const { data: checkoutItemData } = useGetPlansByPidCheckoutItemQuery(
    { pid: planId ?? '' },
    { skip: !planId }
  );

  if (!plan) return null;

  const { status } = getPlanStatus(plan, t);

  return (
    <div
      style={{ display: 'flex', gap: appTheme.space.xs, alignItems: 'center' }}
    >
      {status === 'approved' && <GoToCampaignButton />}
      {status !== 'draft' && status !== 'approved' && <ConfirmPlanButton />}
      {status !== 'draft' && status !== 'approved' && checkoutItemData && (
        <BuyPlanButton />
      )}
      {status === 'draft' && (
        <>
          <SaveConfigurationButton />
          <StyledPipe />
          <RequestQuotationButton
            onClick={() => setRequestQuotationModalOpen(true)}
          />
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
