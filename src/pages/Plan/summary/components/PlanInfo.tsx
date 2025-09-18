import {
  MD,
  GlobalAlert,
  Span,
  LG,
  Anchor,
  SM,
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
`;

const Footer = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
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
      <MD
        isBold
        style={{
          color: appTheme.palette.grey[800],
          marginBottom: appTheme.space.sm,
        }}
      >
        {t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_TITLE')}
      </MD>
      <Divider />

      <PlanContentDiv>
        <SM data-qa="plan-page-template-type-title">
          {t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_TEMPLATE_TYPE')}
        </SM>
        <LG
          isBold
          data-qa="template-type-value"
          style={{
            color: appTheme.palette.blue[600],
          }}
        >
          {plan.from_template.title}
        </LG>
      </PlanContentDiv>
      <PlanContentDiv>
        <SM>{t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_STARTING_PRICE')}</SM>
        <LG
          isBold
          data-qa="starting-price-value"
          style={{
            color: appTheme.palette.blue[600],
          }}
        >
          {plan.price}
        </LG>
      </PlanContentDiv>
      <PlanContentDiv>
        <SM isBold style={{ fontStyle: 'italic' }}>
          {t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_STARTING_PRICE_INFO')}
        </SM>
      </PlanContentDiv>
      <PlanContentDiv>
        <SM>{t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_CURRENT_SETUP')}</SM>
        <LG
          isBold
          data-qa="current-setup-value"
          style={{
            color: appTheme.palette.blue[600],
          }}
        >
          {t('__PLAN_PAGE_DRAFT_ACTIVITY_INFO_CURRENT_SETUP_VALUE')}
        </LG>
      </PlanContentDiv>
      <Footer>
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
      </Footer>
    </WidgetSpecialCard>
  );
};
