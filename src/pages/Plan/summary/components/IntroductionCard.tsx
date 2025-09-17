import { ContainerCard, XXL } from '@appquality/unguess-design-system';
import { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { usePlan } from '../../hooks/usePlan';
import { ReactComponent as ApprovedImage } from '../assets/approved.svg';
import { ReactComponent as PayingImage } from '../assets/paying.svg';
import { ReactComponent as AwaitingImage } from '../assets/awaiting.svg';
import { ReactComponent as SubmittedImage } from '../assets/submitted.svg';
import { Description } from './typography/Description';

const Title = styled((props: ComponentProps<typeof XXL>) => (
  <XXL isBold {...props} />
))`
  color: ${({ theme }) => theme.palette.blue[600]};
`;

const ContentRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.md};
`;

const ImageItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.md};
  flex: 1 0 0;
`;

export const IntroductionCard = () => {
  const { planId } = useParams();
  const { t } = useTranslation();
  const { planComposedStatus } = usePlan(planId);

  if (!planComposedStatus) return null;

  // Map status to image, title, description
  const statusMap: Record<
    string,
    { image: JSX.Element; title: string; description: string }
  > = {
    Paying: {
      image: <PayingImage />,
      title: t('__PLAN_PAGE_INTRODUCTION_CARD_PAID_TITLE'),
      description: t('__PLAN_PAGE_INTRODUCTION_CARD_PAID_DESCRIPTION'),
    },
    Submitted: {
      image: <SubmittedImage />,
      title: t('__PLAN_PAGE_INTRODUCTION_CARD_SUBMITTED_TITLE'),
      description: t('__PLAN_PAGE_INTRODUCTION_CARD_SUBMITTED_DESCRIPTION'),
    },
    AwaitingApproval: {
      image: <AwaitingImage />,
      title: t('__PLAN_PAGE_INTRODUCTION_CARD_AWAITING_REVIEW_TITLE'),
      description: t(
        '__PLAN_PAGE_INTRODUCTION_CARD_AWAITING_REVIEW_DESCRIPTION'
      ),
    },
    OpsCheck: {
      image: <SubmittedImage />,
      title: t('__PLAN_PAGE_INTRODUCTION_CARD_OPSCHECK_TITLE'),
      description: t('__PLAN_PAGE_INTRODUCTION_CARD_OPSCHECK_DESCRIPTION'),
    },
    AwaitingPayment: {
      image: <AwaitingImage />,
      title: t('__PLAN_PAGE_INTRODUCTION_CARD_AWAITING_PAYMENT_TITLE'),
      description: t(
        '__PLAN_PAGE_INTRODUCTION_CARD_AWAITING_PAYMENT_DESCRIPTION'
      ),
    },
    PurchasedPlan: {
      image: <ApprovedImage />,
      title: t('__PLAN_PAGE_INTRODUCTION_CARD_PURCHASED_TITLE'),
      description: t('__PLAN_PAGE_INTRODUCTION_CARD_PURCHASED_DESCRIPTION'),
    },
    Accepted: {
      image: <ApprovedImage />,
      title: t('__PLAN_PAGE_INTRODUCTION_CARD_APPROVED_TITLE'),
      description: t('__PLAN_PAGE_INTRODUCTION_CARD_APPROVED_DESCRIPTION'),
    },
    RunningPlan: {
      image: <ApprovedImage />,
      title: t('__PLAN_PAGE_INTRODUCTION_CARD_APPROVED_TITLE'),
      description: t('__PLAN_PAGE_INTRODUCTION_CARD_APPROVED_DESCRIPTION'),
    },
  };

  const statusData = statusMap[`${planComposedStatus}`];
  if (!statusData) return null;

  return (
    <ContainerCard>
      <ContentRow>
        <ImageItem>{statusData.image}</ImageItem>
        <ContentItem>
          <Title>{statusData.title}</Title>
          <Description>{statusData.description}</Description>
        </ContentItem>
      </ContentRow>
    </ContainerCard>
  );
};
