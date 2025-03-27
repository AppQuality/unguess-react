import { Button, ContainerCard } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { usePatchWorkspacesByWidPlansAndPidStatusMutation } from 'src/features/api';
import styled from 'styled-components';
import { usePlan } from '../../hooks/usePlan';
import { Title } from './typography/Title';

const Footer = styled.div`
  display: flex;
  gap: ${appTheme.space.xs};
  align-items: center;
`;

export const ConfirmationCard = () => {
  const { planId } = useParams();
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { plan, activeWorkspace } = usePlan(planId);

  const [patchStatus] = usePatchWorkspacesByWidPlansAndPidStatusMutation();

  if (!plan) return null;

  if (plan.status === 'draft') return null;

  if (!plan.quote || plan.quote.status !== 'proposed') return null;

  return (
    <ContainerCard>
      <Title style={{ marginBottom: appTheme.space.xs }}>
        {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_TITLE')}
      </Title>
      <Footer>
        <Button
          isDanger
          isBasic
          disabled={isSubmitted}
          onClick={() => {
            setIsSubmitted(true);
            patchStatus({
              wid: activeWorkspace?.id.toString() ?? '',
              pid: planId?.toString() ?? '',
              body: { status: 'draft' },
            }).unwrap();
            setIsSubmitted(false);
          }}
        >
          {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_REFUSE_CTA')}
        </Button>
        <Button
          disabled={isSubmitted}
          onClick={() => {
            setIsSubmitted(true);
            patchStatus({
              wid: activeWorkspace?.id.toString() ?? '',
              pid: planId?.toString() ?? '',
              body: { status: 'approved' },
            }).unwrap();
            setIsSubmitted(false);
          }}
        >
          {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_CONFIRM_CTA')}
        </Button>
      </Footer>
    </ContainerCard>
  );
};
