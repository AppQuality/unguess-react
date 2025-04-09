import { Button } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Pipe } from 'src/common/components/Pipe';
import { usePatchPlansByPidStatusMutation } from 'src/features/api';
import { useSubmit } from 'src/features/modules/useModuleConfiguration';
import { useRequestQuotation } from 'src/features/modules/useRequestQuotation';
import { useValidateForm } from 'src/features/planModules';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { getPlanStatus } from '../Dashboard/hooks/getPlanStatus';
import { usePlan } from './hooks/usePlan';
import { SendRequestModal } from './modals/SendRequestModal';

const StyledPipe = styled(Pipe)`
  display: inline;
  margin: 0;
  height: auto;
`;

export const Controls = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { planId } = useParams();
  const { plan } = usePlan(planId);
  const { handleSubmit: submitModuleConfiguration, isLoading: isSubmitting } =
    useSubmit(planId || '');
  const { validateForm } = useValidateForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [patchStatus] = usePatchPlansByPidStatusMutation();

  const campaignRoute = useLocalizeRoute(
    `campaigns/${plan?.campaign?.id ?? 0}`
  );
  const { isRequestQuoteCTADisabled } = useRequestQuotation();
  const handleSaveConfiguration = () => {
    validateForm();
    submitModuleConfiguration();
  };

  const handleSendRequest = () => {
    setIsModalOpen(true);
  };

  if (!plan) return null;

  const { status } = getPlanStatus(plan, t);

  if (status === 'approved') {
    return (
      <div style={{ display: 'flex', gap: appTheme.space.xs }}>
        <Button
          type="button"
          size="small"
          isAccent
          isPrimary
          onClick={() => navigate(campaignRoute)}
        >
          {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_GO_TO_CAMPAIGN_CTA')}
        </Button>
      </div>
    );
  }

  if (status !== 'draft') {
    return (
      <div style={{ display: 'flex', gap: appTheme.space.xs }}>
        <Button
          type="button"
          size="small"
          isAccent
          isPrimary
          disabled={status === 'submitted' || isSubmitted}
          onClick={() => {
            setIsSubmitted(true);
            patchStatus({
              pid: planId?.toString() ?? '',
              body: { status: 'approved' },
            })
              .unwrap()
              .then(() => {
                setIsSubmitted(false);
              });
          }}
          data-qa="confirm-activity-cta"
        >
          {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_CONFIRM_CTA')}
        </Button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: appTheme.space.xs }}>
      <Button
        type="button"
        size="small"
        disabled={isSubmitting || status !== 'draft'}
        onClick={handleSaveConfiguration}
      >
        {t('__PLAN_SAVE_CONFIGURATION_CTA')}
      </Button>
      <StyledPipe />
      <Button
        isAccent
        isPrimary
        type="button"
        size="small"
        disabled={isRequestQuoteCTADisabled()}
        onClick={handleSendRequest}
      >
        {t('__PLAN_REQUEST_QUOTATION_CTA')}
      </Button>
      {isModalOpen && <SendRequestModal onQuit={() => setIsModalOpen(false)} />}
    </div>
  );
};
