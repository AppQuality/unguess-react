import {
  Button,
  ContainerCard,
  Paragraph,
  UnorderedList,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { usePlan } from '../../hooks/usePlan';
import { ReactComponent as ApprovedImage } from '../assets/lens.svg';
import { Title } from './typography/Title';

const StyledList = styled(UnorderedList)`
  margin-bottom: ${appTheme.space.sm};
  margin-top: ${appTheme.space.xs};
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

const ContentRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.md};
`;

export const GoToDashboardCard = () => {
  const { planId } = useParams();
  const { t } = useTranslation();
  const { plan } = usePlan(planId);
  const campaignRoute = useLocalizeRoute(
    `campaigns/${plan?.campaign?.id ?? '0'}`
  );
  if (!plan || plan.status !== 'approved') return null;

  return (
    <ContainerCard>
      <ContentRow>
        <ContentItem>
          <Title>
            {t('__PLAN_PAGE_SUMMARY_TAB_GO_TO_DASHBOARD_CARD_TITLE')}
          </Title>
          <Trans i18nKey="__PLAN_PAGE_SUMMARY_TAB_GO_TO_DASHBOARD_CARD_DESCRIPTION">
            <Paragraph>
              We&apos;ll notify you by email when the first results are
              available. In the meantime, you can:
            </Paragraph>
            <StyledList>
              <UnorderedList.Item>
                Set up email notifications for key milestones;
              </UnorderedList.Item>
              <UnorderedList.Item>
                Invite team members who should have access to results
              </UnorderedList.Item>
            </StyledList>
          </Trans>
        </ContentItem>
        <ImageItem>
          <ApprovedImage />
        </ImageItem>
      </ContentRow>
      <Link to={campaignRoute}>
        <Button>
          {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_GO_TO_CAMPAIGN_CTA')}
        </Button>
      </Link>
    </ContainerCard>
  );
};
