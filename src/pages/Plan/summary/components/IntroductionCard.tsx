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

  const { plan } = usePlan(planId);

  if (!plan) return null;

  if (plan.status === 'draft') return null;

  if (plan.status === 'paying') {
    return (
      <ContainerCard>
        <ContentRow>
          <ImageItem>
            <PayingImage />
          </ImageItem>
          <ContentItem>
            <Title>{t('__PLAN_PAGE_INTRODUCTION_CARD_PAID_TITLE')}</Title>
            <Description>
              {t('__PLAN_PAGE_INTRODUCTION_CARD_PAID_DESCRIPTION')}
            </Description>
          </ContentItem>
        </ContentRow>
      </ContainerCard>
    );
  }

  if (plan.isPurchasable) {
    return (
      <ContainerCard>
        <ContentRow>
          <>
            <ImageItem>
              <ApprovedImage />
            </ImageItem>
            <ContentItem>
              <Title>
                {' '}
                {t('__PLAN_PAGE_INTRODUCTION_CARD_PURCHASABLE_TITLE')}
              </Title>
              <Description>
                {t('__PLAN_PAGE_INTRODUCTION_CARD_PURCHASABLE_DESCRIPTION')}
              </Description>
            </ContentItem>
          </>
        </ContentRow>
      </ContainerCard>
    );
  }

  return (
    <ContainerCard>
      <ContentRow>
        {/* PLAN SUBMITTED */}
        {(!plan.quote || plan.quote.status === 'pending') && (
          <>
            <ImageItem>
              <SubmittedImage />
            </ImageItem>
            <ContentItem>
              <Title>
                {t('__PLAN_PAGE_INTRODUCTION_CARD_SUBMITTED_TITLE')}
              </Title>
              <Description>
                {t('__PLAN_PAGE_INTRODUCTION_CARD_SUBMITTED_DESCRIPTION')}
              </Description>
            </ContentItem>
          </>
        )}

        {/* PLAN AWAITING REVIEW */}
        {plan.quote && plan.quote.status === 'proposed' && (
          <>
            <ImageItem>
              <AwaitingImage />
            </ImageItem>
            <ContentItem>
              <Title>
                {t('__PLAN_PAGE_INTRODUCTION_CARD_AWAITING_REVIEW_TITLE')}
              </Title>
              <Description>
                {t('__PLAN_PAGE_INTRODUCTION_CARD_AWAITING_REVIEW_DESCRIPTION')}
              </Description>
            </ContentItem>
          </>
        )}

        {/* PLAN APPROVED */}
        {plan.quote && plan.quote.status === 'approved' && (
          <>
            <ImageItem>
              <ApprovedImage />
            </ImageItem>
            <ContentItem>
              <Title>{t('__PLAN_PAGE_INTRODUCTION_CARD_APPROVED_TITLE')}</Title>
              <Description>
                {t('__PLAN_PAGE_INTRODUCTION_CARD_APPROVED_DESCRIPTION')}
              </Description>
            </ContentItem>
          </>
        )}
      </ContentRow>
    </ContainerCard>
  );
};
