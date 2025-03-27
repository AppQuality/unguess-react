import { ContainerCard, Label, MD } from '@appquality/unguess-design-system';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { useModule } from 'src/features/modules/useModule';
import styled from 'styled-components';
import { usePlan } from '../../hooks/usePlan';
import { Description } from './typography/Description';
import { Title } from './typography/Title';

const PlanContentDiv = styled.div``;

export const ActivityInfo = () => {
  const { planId } = useParams();
  const { t } = useTranslation();

  const { value } = useModule('dates');

  const { plan } = usePlan(planId);

  if (!plan) return null;

  if (plan.status === 'draft') return null;

  const planDate = () => {
    if (plan.campaign) {
      return new Date(plan.campaign.startDate);
    }

    return value?.output.start ? new Date(value.output.start) : new Date(); // Add check with cp startDate
  };

  return (
    <ContainerCard>
      <Title style={{ marginBottom: appTheme.space.xs }}>
        {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_TITLE')}
      </Title>

      {(!plan.quote || plan.quote.status === 'pending') && (
        <Description>
          {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_SUBMITTED_DESCRIPTION')}
        </Description>
      )}
      {plan.quote && plan.quote.status === 'proposed' && (
        <Description>
          {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_AWAITING_DESCRIPTION')}
        </Description>
      )}
      {plan.quote && plan.quote.status === 'approved' && (
        <Description>
          {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_APPROVED_DESCRIPTION')}
        </Description>
      )}
      <Divider style={{ marginBottom: appTheme.space.xs }} />

      <PlanContentDiv>
        <Label>{t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_DATE_LABEL')}</Label>
        <MD>{format(planDate(), 'dd/MM/yyyy')}</MD>
      </PlanContentDiv>
    </ContainerCard>
  );
};
