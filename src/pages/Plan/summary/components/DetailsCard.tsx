import {
  Anchor,
  Button,
  getColor,
  LG,
  MD,
  Message,
  PlanTag,
  SM,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { usePatchPlansByPidStatusMutation } from 'src/features/api';
import { useModule } from 'src/features/modules/useModule';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { usePlanStatusLabel } from 'src/hooks/usePlanStatusLabel';
import { WidgetSpecialCard } from 'src/pages/Campaign/widgetCards/common/StyledSpecialCard';
import styled from 'styled-components';
import { usePlan } from '../../../../hooks/usePlan';
import { GoToCampaignButton } from '../../Controls/GoToCampaignButton';
import { BuyButton } from './BuyButton';
import { CancelPlanButton } from './CancelPlanButton';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.space.md};
`;

const PrimaryText = styled(LG)<{ isPending?: boolean }>`
  color: ${({ theme }) => getColor(theme.colors.primaryHue, 600)};

  ${({ isPending, theme }) =>
    isPending &&
    `
    color: ${theme.palette.grey[600]};
    font-style: italic;
  `}
`;

const Footer = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Content = ({ date, quote }: { date: Date; quote?: string }) => {
  const { t, i18n } = useTranslation();
  const { planId } = useParams();
  const { planComposedStatus } = usePlan(planId);
  const price =
    quote ||
    `${t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_PRICE_NOT_AVAILABLE')}*`;

  return (
    <>
      <StyledDiv>
        <SM>
          {(planComposedStatus === 'Submitted' ||
          planComposedStatus === 'OpsCheck'
            ? t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_DATE_LABEL_SUBMITTED')
            : t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_DATE_LABEL')
          ).toLocaleUpperCase()}
        </SM>
        <PrimaryText isBold>
          {date.toLocaleDateString(i18n.language, {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          })}
          {planComposedStatus === 'Submitted' ||
          planComposedStatus === 'OpsCheck'
            ? '*'
            : ''}
        </PrimaryText>
      </StyledDiv>
      <StyledDiv>
        <SM>
          {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_PRICE').toLocaleUpperCase()}
        </SM>
        <PrimaryText
          isBold
          isPending={!quote || planComposedStatus === 'OpsCheck'}
        >
          {planComposedStatus === 'Submitted' &&
            quote &&
            t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_PRICE_PREFIX')}{' '}
          {planComposedStatus === 'OpsCheck'
            ? `${t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_PRICE_PENDING')}*`
            : price}
        </PrimaryText>
        {planComposedStatus === 'Submitted' && (
          <MD style={{ marginTop: appTheme.space.sm }}>
            {t(
              '__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_PRICE_NOT_AVAILABLE_NOTES'
            )}
          </MD>
        )}
        {planComposedStatus === 'OpsCheck' && (
          <MD style={{ marginTop: appTheme.space.sm }}>
            {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_PRICE_OPS_CHECK_NOTES')}
          </MD>
        )}
      </StyledDiv>
    </>
  );
};

const Cta = ({
  campaignId,
  isSubmitted,
  onClick,
}: {
  campaignId: number;
  isSubmitted: boolean;
  onClick: () => void;
}) => {
  const { t } = useTranslation();
  const campaignRoute = useLocalizeRoute(`campaigns/${campaignId}`);
  const { planId } = useParams();
  const { planComposedStatus } = usePlan(planId);

  if (
    planComposedStatus === 'Accepted' ||
    planComposedStatus === 'PurchasedPlan'
  )
    return (
      <Link to={campaignRoute}>
        <Anchor isExternal>
          {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_GO_TO_CAMPAIGN_CTA')}
        </Anchor>
      </Link>
    );

  return (
    <StyledDiv>
      <Button
        isAccent
        isPrimary
        isStretched
        type="button"
        disabled={
          planComposedStatus === 'Submitted' ||
          planComposedStatus === 'OpsCheck' ||
          isSubmitted ||
          planComposedStatus === 'Paying'
        }
        onClick={onClick}
      >
        {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_CONFIRM_CTA')}
      </Button>

      {(planComposedStatus === 'AwaitingApproval' ||
        planComposedStatus === 'AwaitingPayment') && (
        <StyledDiv>
          <Message>
            {t(
              '__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_CONFIRM_CTA_INFO_MESSAGE'
            )}
          </Message>
        </StyledDiv>
      )}
    </StyledDiv>
  );
};

export const DetailsCard = () => {
  const { t } = useTranslation();
  const { planId } = useParams();
  const { plan, planComposedStatus } = usePlan(planId);
  const label = usePlanStatusLabel({ planStatus: planComposedStatus });
  const { value } = useModule('dates');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [patchStatus] = usePatchPlansByPidStatusMutation();

  if (!plan) return null;

  const planDate = () => {
    if (plan.campaign) {
      return new Date(plan.campaign.startDate);
    }

    return value?.output.start ? new Date(value.output.start) : new Date(); // Add check with cp startDate
  };

  const getCta = () => {
    if (!plan.isPurchasable) {
      return (
        <Cta
          isSubmitted={isSubmitted}
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
          campaignId={plan?.campaign?.id ?? 0}
        />
      );
    }
    if (planComposedStatus === 'PurchasedPlan') {
      return <GoToCampaignButton />;
    }
    if (planComposedStatus === 'Paying') {
      return <CancelPlanButton />;
    }
    return (
      <>
        <BuyButton isStretched />
        <SM
          style={{
            marginTop: appTheme.space.md,
            color: appTheme.palette.grey[600],
          }}
        >
          {t(
            '__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_PAYMENT_CARD_ADDITIONAL_INFO'
          )}
        </SM>
      </>
    );
  };

  return (
    <WidgetSpecialCard style={{ height: 'auto' }}>
      <WidgetSpecialCard.Meta justifyContent="space-between">
        <>
          <MD isBold style={{ color: getColor(appTheme.palette.grey, 800) }}>
            {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_TITLE')}
          </MD>
          {planComposedStatus !== 'Accepted' && (
            <PlanTag status={planComposedStatus} statusLabel={label} />
          )}
        </>
      </WidgetSpecialCard.Meta>
      <Divider />
      <Content date={planDate()} quote={plan?.quote?.value} />
      <Footer>{getCta()}</Footer>
    </WidgetSpecialCard>
  );
};
