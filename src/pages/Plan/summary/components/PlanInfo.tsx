import { Label, MD, Message } from '@appquality/unguess-design-system';
import { WidgetSpecialCard } from 'src/pages/Campaign/widgetCards/common/StyledSpecialCard';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import styled from 'styled-components';
import { usePlan } from '../../hooks/usePlan';
import { Title } from './typography/Title';

const PlanContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.space.md};
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

export const PlanInfo = () => {
  const { planId } = useParams();
  const { t } = useTranslation();

  const { plan } = usePlan(planId);

  if (!plan) return null;

  if (!plan.price || !plan.from_template) {
    return null;
  }

  return (
    <WidgetSpecialCard style={{ height: 'auto' }}>
      <Title
        isBold
        style={{
          marginBottom: appTheme.space.xs,
          color: appTheme.palette.grey[800],
        }}
      >
        {t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_TITLE')}
      </Title>
      <Divider
        style={{
          marginBottom: appTheme.space.xs,
          marginTop: appTheme.space.sm,
        }}
      />

      <PlanContentDiv>
        <div>
          <MD>{t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_TEMPLATE_TYPE')}</MD>
          <Label
            data-qa="template-type-value"
            style={{
              color: appTheme.palette.blue[600],
              fontSize: appTheme.fontSizes.lg,
            }}
          >
            {plan.from_template.title}
          </Label>
        </div>
        <div>
          <MD>{t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_STARTING_PRICE')}</MD>
          <Label
            data-qa="starting-price-value"
            style={{
              color: appTheme.palette.blue[600],
              fontSize: appTheme.fontSizes.lg,
            }}
          >
            {plan.price}
          </Label>
        </div>
        <Message validation="warning">
          {t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_PRICE_WARNING')}
        </Message>
      </PlanContentDiv>
    </WidgetSpecialCard>
  );
};
