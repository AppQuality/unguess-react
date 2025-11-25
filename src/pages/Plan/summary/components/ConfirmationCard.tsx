import {
  Alert,
  Button,
  ContainerCard,
  Paragraph,
  Span,
  UnorderedList,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import analytics from 'src/analytics';
import { appTheme } from 'src/app/theme';
import { usePatchPlansByPidStatusMutation } from 'src/features/api';
import styled from 'styled-components';
import { usePlan } from '../../../../hooks/usePlan';
import { BuyButton } from './BuyButton';
import { Title } from './typography/Title';

const Footer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
  align-items: center;
  margin-top: ${({ theme }) => theme.space.lg};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${appTheme.space.md};
`;

const StyledList = styled(UnorderedList)`
  margin-bottom: ${appTheme.space.sm};
  margin-top: ${appTheme.space.xs};
`;

export const ConfirmationCard = () => {
  const { planId } = useParams();
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { planComposedStatus, plan } = usePlan(planId);

  const [patchStatus] = usePatchPlansByPidStatusMutation();

  if (!planComposedStatus) return null;

  if (planComposedStatus === 'AwaitingPayment') {
    return (
      <ContainerCard>
        <Title style={{ marginBottom: appTheme.space.xs }}>
          {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_PAYMENT_CARD_TITLE')}
        </Title>
        <Body>
          <div>
            <Trans i18nKey="__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_PAYMENT_CARD_DESCRIPTION">
              Your price is confirmed. Pay now and your test will start exactly
              on your chosen date:
              <StyledList>
                <UnorderedList.Item>
                  Start on the scheduled date
                </UnorderedList.Item>
                <UnorderedList.Item>
                  Get real user feedback on your digital product
                </UnorderedList.Item>
                <UnorderedList.Item>
                  Email alerts when your first results are ready
                </UnorderedList.Item>
              </StyledList>
            </Trans>
          </div>
        </Body>
        <Footer>
          <BuyButton isAccent={false} isPrimary={false} />
        </Footer>
      </ContainerCard>
    );
  }
  if (planComposedStatus === 'AwaitingApproval') {
    return (
      <ContainerCard>
        <Title style={{ marginBottom: appTheme.space.xs }}>
          {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_TITLE')}
        </Title>
        <Body>
          <div>
            <Trans i18nKey="__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_DESCRIPTION">
              Your quotation is confirmed.
              <Paragraph>
                <Span isBold>Approve now</Span> to{' '}
                <Span isBold>secure your date</Span> and begin collecting
                valuable insights:
              </Paragraph>
              <StyledList>
                <UnorderedList.Item>
                  Start on the scheduled date
                </UnorderedList.Item>
                <UnorderedList.Item>
                  Collect valuable user feedback for your digital product
                </UnorderedList.Item>
                <UnorderedList.Item>
                  Receive notifications when first results become available
                </UnorderedList.Item>
              </StyledList>
              You can also <Span isBold>return to draft status</Span> if you
              need to make changes.
            </Trans>
          </div>
          <Alert type="warning">
            <Alert.Title>
              {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_WARNING_TITLE')}
            </Alert.Title>
            {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_WARNING_DESCRIPTION')}
          </Alert>
        </Body>
        <Footer>
          <Button
            isDanger
            isBasic
            disabled={isSubmitted}
            onClick={() => {
              setIsSubmitted(true);
              patchStatus({
                pid: planId?.toString() ?? '',
                body: { status: 'draft' },
              })
                .unwrap()
                .then(() => {
                  setIsSubmitted(false);
                });
            }}
          >
            {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_REFUSE_CTA')}
          </Button>
          <Button
            disabled={isSubmitted}
            onClick={() => {
              setIsSubmitted(true);
              patchStatus({
                pid: planId?.toString() ?? '',
                body: { status: 'approved' },
              }).unwrap();
              analytics.track('planActivityConfirmed', {
                planId: planId?.toString(),
                templateId: plan?.from_template?.id.toString(),
                templateName: plan?.from_template?.title,
                previousStatus: 'AwaitingApproval', // should be AwaitingApproval
                newStatus: 'Accepted',
                confirmedPrice: plan?.price,
              });
              setIsSubmitted(false);
            }}
          >
            {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_CONFIRM_CTA')}
          </Button>
        </Footer>
      </ContainerCard>
    );
  }

  return null;
};
