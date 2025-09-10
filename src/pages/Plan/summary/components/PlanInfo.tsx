import {
  MD,
  GlobalAlert,
  Span,
  LG,
  Anchor,
} from '@appquality/unguess-design-system';
import { WidgetSpecialCard } from 'src/pages/Campaign/widgetCards/common/StyledSpecialCard';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import styled from 'styled-components';
import { usePlan } from '../../hooks/usePlan';

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
      <LG
        isBold
        style={{
          marginBottom: appTheme.space.xs,
          color: appTheme.palette.grey[800],
        }}
      >
        {t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_TITLE')}
      </LG>
      <Divider
        style={{
          marginBottom: appTheme.space.xs,
          marginTop: appTheme.space.sm,
        }}
      />

      <PlanContentDiv>
        <div>
          <MD data-qa="plan-page-template-type-title">
            {t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_TEMPLATE_TYPE')}
          </MD>
          <LG
            isBold
            data-qa="template-type-value"
            style={{
              color: appTheme.palette.blue[600],
            }}
          >
            {plan.from_template.title}
          </LG>
        </div>
        <div>
          <MD>{t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_STARTING_PRICE')}</MD>
          <LG
            isBold
            data-qa="starting-price-value"
            style={{
              color: appTheme.palette.blue[600],
            }}
          >
            {plan.price}
          </LG>
        </div>
        <div>
          <MD isBold style={{ fontStyle: 'italic' }}>
            {t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_STARTING_PRICE_INFO')}
          </MD>
        </div>
        <div>
          <MD>{t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_CURRENT_SETUP')}</MD>
          <LG
            isBold
            data-qa="current-setup-value"
            style={{
              color: appTheme.palette.blue[600],
            }}
          >
            {t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_CURRENT_SETUP_VALUE')}
          </LG>
        </div>
        <GlobalAlert
          type="info"
          data-qa="plan-page-price-warning-global-alert"
          title={t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_PRICE_WARNING')}
          message={
            <>
              <Span>
                {t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_PRICE_WARNING_MESSAGE')}
              </Span>
              <div
                style={{
                  marginTop: appTheme.space.sm,
                }}
              >
                <Anchor
                  isExternal
                  href="https://google.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  {t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_PRICE_WARNING_LINK_TEXT')}
                </Anchor>
              </div>
            </>
          }
        />
      </PlanContentDiv>
    </WidgetSpecialCard>
  );
};
