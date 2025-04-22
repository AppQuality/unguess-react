import {
  Button,
  ButtonMenu,
  IconButton,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Pipe } from 'src/common/components/Pipe';
import { ReactComponent as DotsIcon } from '@zendeskgarden/svg-icons/src/16/overflow-vertical-stroke.svg';
import { usePatchPlansByPidStatusMutation } from 'src/features/api';
import { useSubmit } from 'src/features/modules/useModuleConfiguration';
import { useRequestQuotation } from 'src/features/modules/useRequestQuotation';
import { useValidateForm } from 'src/features/planModules';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { useModule } from 'src/features/modules/useModule';
import { getPlanStatus } from '../Dashboard/hooks/getPlanStatus';
import { usePlan } from './hooks/usePlan';
import { SendRequestModal } from './modals/SendRequestModal';
import { DeletePlanModal } from './modals/DeletePlanModal';

const StyledPipe = styled(Pipe)`
  display: inline;
  margin: 0;
  height: auto;
`;

export const Controls = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { planId } = useParams();
  const { plan } = usePlan(planId);
  const { handleSubmit: submitModuleConfiguration, isLoading: isSubmitting } =
    useSubmit(planId || '');
  const { validateForm } = useValidateForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [patchStatus] = usePatchPlansByPidStatusMutation();
  const { value: titleValue } = useModule('title'); // to use the current changed title value (also if plan is not saved) in delete modal

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

  const handleMenuClick = (value?: string) => {
    if (value === 'delete') {
      setIsDeleteModalOpen(true);
    }
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
    <div
      style={{ display: 'flex', gap: appTheme.space.xs, alignItems: 'center' }}
    >
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
      <ButtonMenu
        onSelect={(value) => {
          handleMenuClick(value ?? '');
        }}
        label={(props) => (
          <IconButton data-qa="extra-actions-menu" {...props}>
            <DotsIcon />
          </IconButton>
        )}
      >
        <ButtonMenu.Item
          data-qa="delete-action-item"
          type="danger"
          value="delete"
        >
          {t('__PLAN_DELETE_PLAN_CTA')}
        </ButtonMenu.Item>
      </ButtonMenu>

      {isDeleteModalOpen && planId && (
        <DeletePlanModal
          planId={planId}
          planTitle={titleValue?.output ?? ''}
          onQuit={() => setIsDeleteModalOpen(false)}
        />
      )}

      {isModalOpen && <SendRequestModal onQuit={() => setIsModalOpen(false)} />}
    </div>
  );
};
