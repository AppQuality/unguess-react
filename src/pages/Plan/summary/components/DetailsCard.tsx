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
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { useModule } from 'src/features/modules/useModule';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { WidgetSpecialCard } from 'src/pages/Campaign/widgetCards/common/StyledSpecialCard';
import { getPlanStatus } from 'src/pages/Dashboard/hooks/getPlanStatus';
import styled from 'styled-components';
import { StickyContainer } from '../../common/StickyContainer';
import { usePlan } from '../../hooks/usePlan';

type IPlanStatus = 'draft' | 'submitted' | 'pending_quote_review' | 'approved';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.space.md};
`;

const PrimaryText = styled(LG)`
  color: ${({ theme }) => getColor(theme.colors.primaryHue, 600)};
`;

const Footer = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Content = ({
  date,
  price,
  status,
}: {
  date: Date;
  price: string;
  status: IPlanStatus;
}) => {
  const { t } = useTranslation();
  return (
    <>
      <StyledDiv>
        <SM>
          {t(
            '__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_DATE_LABEL'
          ).toLocaleUpperCase()}
        </SM>
        <PrimaryText isBold>{format(date, 'dd/MM/yyyy')}</PrimaryText>
      </StyledDiv>
      <StyledDiv>
        <SM>
          {t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_PRICE').toLocaleUpperCase()}
        </SM>
        <PrimaryText isBold>{price}</PrimaryText>
        {status === 'submitted' && (
          <MD>
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
}: {
  status: IPlanStatus;
  campaignId: number;
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
        disabled={status === 'submitted'}
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
  const { plan } = usePlan(planId);
  const { value } = useModule('dates');

  if (!plan) return null;

  const planDate = () => {
    if (plan.campaign) {
      return new Date(plan.campaign.startDate);
    }

    return value?.output.start ? new Date(value.output.start) : new Date(); // Add check with cp startDate
  };

  const price =
    plan?.quote?.value ||
    `${t('__PLAN_PAGE_SUMMARY_TAB_ACTIVITY_INFO_PRICE_NOT_AVAILABLE')}*`;

  const { status } = getPlanStatus(plan, t);

  return (
    <StickyContainer>
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
        <Content date={planDate()} price={price} status={status} />
        <Footer>
          <Cta status={status} campaignId={plan?.campaign?.id ?? 0} />
        </Footer>
      </WidgetSpecialCard>
    </StickyContainer>
  );
};
