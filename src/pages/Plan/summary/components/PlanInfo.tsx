import {
  Label,
  MD,
  GlobalAlert,
  Span,
} from '@appquality/unguess-design-system';
import { WidgetSpecialCard } from 'src/pages/Campaign/widgetCards/common/StyledSpecialCard';
import { ReactComponent as NewWindowIcon } from '@zendeskgarden/svg-icons/src/16/new-window-stroke.svg';
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

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.space.xs};
`;

const LinkText = styled(MD)`
  display: inline;
`;

const LinkIcon = styled(NewWindowIcon)`
  vertical-align: baseline;
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
        <GlobalAlert
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
                <ExternalLink
                  href="https://google.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <LinkText>
                    {t(
                      '__PLAN_PAGE_DRAFT_ACTIVITY_INFO_PRICE_WARNING_LINK_TEXT'
                    )}
                  </LinkText>
                  <LinkIcon />
                </ExternalLink>
              </div>
            </>
          }
          type="info"
        />
      </PlanContentDiv>
    </WidgetSpecialCard>
  );
};
