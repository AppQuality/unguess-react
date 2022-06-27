import {
  Col,
  Row,
  Paragraph,
  theme,
  MD,
  ProductCard,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useGetWorkspacesByWidCampaignsQuery } from 'src/features/api';
import { getLocalizeRoute } from 'src/hooks/useLocalizeDashboardUrl';
import { ReactComponent as ExpressIcon } from 'src/assets/icons/express-icon.svg';
import { openDrawer, openWizard } from 'src/features/express/expressSlice';
import { hasEnoughCoins, toggleChat } from 'src/common/utils';
import { CampaignItem } from './CampaignItem';
import { CardsContainer, StyledRow } from './CardContainer';
import { CardRowLoading } from './CardRowLoading';
import { ExpressDrawer } from '../ExpressWizard/drawer';
import { ExpressWizardContainer } from '../ExpressWizard';

export const SuggestedCampaigns = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { activeWorkspace } = useAppSelector((state) => state.navigation);

  const hasExpress = hasEnoughCoins({ workspace: activeWorkspace });

  const campaigns = useGetWorkspacesByWidCampaignsQuery({
    wid: activeWorkspace?.id ?? 0,
    orderBy: 'start_date',
    order: 'DESC',
    limit: hasExpress ? 3 : 4,
  });

  if (campaigns.isError) return null; // TODO: Improve error handling

  const goToCampaignDashboard = (campaignId: number, cpType: string) => {
    window.location.href = getLocalizeRoute(campaignId, cpType);
  };

  return campaigns.isLoading ||
    campaigns.isFetching ||
    !campaigns.data ||
    !campaigns.data.items ? (
    <CardRowLoading />
  ) : (
    <>
      <Row>
        <Col xs={12} style={{ marginBottom: `${theme.space.base * 4}px` }}>
          <Paragraph>
            <MD style={{ color: theme.palette.grey[700] }}>
              {t('__DASHABOARD_SUGGESTED_CAMPAIGN_TITLE MAX:12').toUpperCase()}
            </MD>
          </Paragraph>
        </Col>
      </Row>
      <CardsContainer>
        <StyledRow>
          {campaigns.data.items.map((campaign) => (
            <Col xs={10} md={6} lg={3}>
              <CampaignItem
                key={`suggested_${campaign.id}`}
                campaign={campaign}
                onCampaignClicked={goToCampaignDashboard}
              />
            </Col>
          ))}
          {hasExpress && (
            <>
              <Col xs={10} md={6} lg={3}>
                <ProductCard
                  title={t('__EXPRESS_WIZARD_TITLE')}
                  onCtaClick={() => {
                    dispatch(openDrawer());
                    toggleChat(false);
                  }}
                  icon={<ExpressIcon />}
                  ctaLabel={t('__DASHABOARD_EXPRESS_CARD_CTA_TEXT')}
                  preTitle={t('__DASHABOARD_EXPRESS_CARD_PRE_TITLE MAX:12')}
                  productTitle={t('__DASHABOARD_EXPRESS_CARD_TITLE MAX:12')}
                  style={{ height: '100%' }}
                />
              </Col>
              <ExpressDrawer onCtaClick={() => dispatch(openWizard())} />
              <ExpressWizardContainer />
            </>
          )}
        </StyledRow>
      </CardsContainer>
    </>
  );
};
