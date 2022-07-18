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
import {
  openDrawer,
  openWizard,
  setExpressTypeId,
} from 'src/features/express/expressSlice';
import { hasEnoughCoins, toggleChat } from 'src/common/utils';
import i18n from 'src/i18n';
import { useGeti18nExpressTypesQuery } from 'src/features/backoffice/strapi';
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

  // TODO: this is a hack to get the express type id without a service attached
  const {
    data: exploratoryExpress,
    isLoading,
    isFetching,
  } = useGeti18nExpressTypesQuery({
    locale: i18n.language,
    filters: {
      express: {
        slug: {
          $eq: 'exploratory-test',
        },
      },
    },
  });

  const campaigns = useGetWorkspacesByWidCampaignsQuery({
    wid: activeWorkspace?.id ?? 0,
    orderBy: 'start_date',
    order: 'DESC',
    limit: hasExpress ? 3 : 4,
  });

  if (campaigns.isError || (!campaigns.data?.total && !hasExpress)) return null;

  const goToCampaignDashboard = (campaignId: number, cpType: string) => {
    window.location.href = getLocalizeRoute(campaignId, cpType);
  };

  return campaigns.isLoading ||
    campaigns.isFetching ||
    isLoading ||
    isFetching ||
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
          {hasExpress && exploratoryExpress && exploratoryExpress.data ? (
            <>
              <Col xs={10} md={6} lg={3}>
                <ProductCard
                  title={t('__EXPRESS_WIZARD_TITLE')}
                  onCtaClick={() => {
                    if (exploratoryExpress && exploratoryExpress.data)
                      dispatch(
                        setExpressTypeId(exploratoryExpress.data[0]?.id)
                      );
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
          ) : null}
        </StyledRow>
      </CardsContainer>
    </>
  );
};
