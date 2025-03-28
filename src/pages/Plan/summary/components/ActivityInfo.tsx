import {
  ContainerCard,
  Label,
  MD,
  Message,
  UnorderedList,
} from '@appquality/unguess-design-system';
import { isSameDay } from 'date-fns';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { GetWorkspacesByWidPlansAndPidApiResponse } from 'src/features/api';
import { useModule } from 'src/features/modules/useModule';
import { Notes } from 'src/pages/ExpressWizard/notesCard';
import styled from 'styled-components';
import { usePlan } from '../../hooks/usePlan';
import { Description } from './typography/Description';
import { Title } from './typography/Title';

const PlanContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.space.md};
  gap: ${({ theme }) => theme.space.lg};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const ActivityDescription = ({
  plan,
}: {
  plan: GetWorkspacesByWidPlansAndPidApiResponse;
}) => {
  const { t } = useTranslation();

  if (!plan.quote || plan.quote.status === 'pending')
    return (
      <Description>
        {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_SUBMITTED_DESCRIPTION')}
      </Description>
    );

  if (plan.quote && plan.quote.status === 'proposed')
    return (
      <Description>
        {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_AWAITING_DESCRIPTION')}
      </Description>
    );

  if (plan.quote && plan.quote.status === 'approved')
    return (
      <Description>
        {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_APPROVED_DESCRIPTION')}
      </Description>
    );

  return null;
};

export const ActivityInfo = () => {
  const { planId } = useParams();
  const { t, i18n } = useTranslation();

  const { value } = useModule('dates');

  const { plan } = usePlan(planId);

  if (!plan) return null;

  if (plan.status === 'draft') return null;
  const modulesDate = value?.output.start
    ? new Date(value.output.start)
    : new Date();

  const planDate = useMemo(() => {
    if (plan.campaign) {
      return new Date(plan.campaign.startDate);
    }

    return modulesDate;
  }, [modulesDate, plan.campaign]);

  return (
    <ContainerCard>
      <Title
        isBold
        style={{
          marginBottom: appTheme.space.xs,
          color: appTheme.palette.grey[800],
        }}
      >
        {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_TITLE')}
      </Title>
      <ActivityDescription plan={plan} />
      <Divider
        style={{
          marginBottom: appTheme.space.xs,
          marginTop: appTheme.space.sm,
        }}
      />

      <PlanContentDiv>
        <div>
          <Label>{t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_DATE_LABEL')}</Label>
          <MD>
            {planDate.toLocaleDateString(i18n.language, {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            })}
          </MD>
          {plan.campaign &&
            !isSameDay(new Date(plan.campaign.startDate), modulesDate) && (
              <Message
                validation="warning"
                style={{ marginTop: appTheme.space.md }}
              >
                {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_DATE_WARNING')}
              </Message>
            )}
        </div>
        <div>
          <Label>{t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_PRICE')}</Label>
          <MD>
            {plan?.quote?.value ||
              t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_PRICE_NOT_AVAILABLE')}
          </MD>
        </div>
      </PlanContentDiv>

      <Notes style={{ cursor: 'default' }}>
        <Trans i18nKey="__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_NOTES_CARD_DESCRIPTION">
          <MD
            isBold
            style={{
              marginBottom: appTheme.space.xs,
              color: appTheme.palette.grey[800],
            }}
          >
            Factors that can affect the price and start date:
          </MD>
          <UnorderedList>
            <UnorderedList.Item>
              Number and complexity of tasks
            </UnorderedList.Item>
            <UnorderedList.Item>
              Timeline and urgency requirements
            </UnorderedList.Item>
            <UnorderedList.Item>
              User incentives and recruitment needs
            </UnorderedList.Item>
            <UnorderedList.Item>Research activities scope</UnorderedList.Item>
            <UnorderedList.Item>
              Project management activities
            </UnorderedList.Item>
            <UnorderedList.Item>Additional customizations</UnorderedList.Item>
          </UnorderedList>
        </Trans>
      </Notes>
    </ContainerCard>
  );
};
