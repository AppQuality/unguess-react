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
import { usePatchWorkspacesByWidPlansAndPidStatusMutation } from 'src/features/api';
import { useModule } from 'src/features/modules/useModule';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { WidgetSpecialCard } from 'src/pages/Campaign/widgetCards/common/StyledSpecialCard';
import { getPlanStatus } from 'src/pages/Dashboard/hooks/getPlanStatus';
import styled from 'styled-components';
import { usePlan } from '../../hooks/usePlan';

type IPlanStatus = 'draft' | 'submitted' | 'pending_quote_review' | 'approved';

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

const Content = ({
  date,
  quote,
  status,
}: {
  date: Date;
  quote?: string;
  status: IPlanStatus;
}) => {
  const { t, i18n } = useTranslation();

  const price =
    quote ||
    `${t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_PRICE_NOT_AVAILABLE')}*`;

  return (
    <>
      <StyledDiv>
        <SM>
          {(status === 'submitted'
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
          {status === 'submitted' ? '*' : ''}
        </PrimaryText>
      </StyledDiv>
      <StyledDiv>
        <SM>
          {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_PRICE').toLocaleUpperCase()}
        </SM>
        <PrimaryText isBold isPending={!quote}>
          {status === 'submitted' &&
            quote &&
            t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_PRICE_PREFIX')}{' '}
          {price}
        </PrimaryText>
        {status === 'submitted' && (
          <MD style={{ marginTop: appTheme.space.sm }}>
            {t(
              '__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_PRICE_NOT_AVAILABLE_NOTES'
            )}
          </MD>
        )}
      </StyledDiv>
    </>
  );
};

const Cta = ({
  status,
  campaignId,
  isSubmitted,
  onClick,
}: {
  status: IPlanStatus;
  campaignId: number;
  isSubmitted: boolean;
  onClick: () => void;
}) => {
  const { t } = useTranslation();
  const campaignRoute = useLocalizeRoute(`campaigns/${campaignId}`);

  if (status === 'approved')
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
        disabled={status === 'submitted' || isSubmitted}
        onClick={onClick}
      >
        {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_CONFIRM_CTA')}
      </Button>

      {status === 'pending_quote_review' && (
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
  const { plan, activeWorkspace } = usePlan(planId);
  const { value } = useModule('dates');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [patchStatus] = usePatchWorkspacesByWidPlansAndPidStatusMutation();

  if (!plan) return null;

  const planDate = () => {
    if (plan.campaign) {
      return new Date(plan.campaign.startDate);
    }

    return value?.output.start ? new Date(value.output.start) : new Date(); // Add check with cp startDate
  };

  const { status } = getPlanStatus(plan, t);

  return (
    <WidgetSpecialCard style={{ height: 'auto' }}>
      <WidgetSpecialCard.Meta justifyContent="space-between">
        <>
          <MD isBold style={{ color: getColor(appTheme.palette.grey, 800) }}>
            {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_TITLE')}
          </MD>
          <PlanTag {...getPlanStatus(plan, t)} />
        </>
      </WidgetSpecialCard.Meta>
      <Divider />
      <Content date={planDate()} quote={plan?.quote?.value} status={status} />
      <Footer>
        <Cta
          isSubmitted={isSubmitted}
          onClick={() => {
            setIsSubmitted(true);
            patchStatus({
              wid: activeWorkspace?.id.toString() ?? '',
              pid: planId?.toString() ?? '',
              body: { status: 'approved' },
            })
              .unwrap()
              .then(() => {
                setIsSubmitted(false);
              });
          }}
          status={status}
          campaignId={plan?.campaign?.id ?? 0}
        />
      </Footer>
    </WidgetSpecialCard>
  );
};
