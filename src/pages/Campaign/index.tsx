import { Page } from 'src/features/templates/Page';
import {
  Col,
  Grid,
  Paragraph,
  Row,
  XL,
  theme,
} from '@appquality/unguess-design-system';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidReportsQuery,
} from 'src/features/api';
import { useTranslation } from 'react-i18next';
import { CampaignPageHeader } from './pageHeader';
import { HeaderLoader } from './pageHeaderLoading';
import { ReportRowLoading } from './ReportRowLoading';
import { ReportRow } from './ReportRow';

const Campaign = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const { campaignId } = useParams();

  if (!campaignId || Number.isNaN(Number(campaignId))) {
    navigate(notFoundRoute);
  }

  const {
    isLoading: isLoadingCampaign,
    isFetching: isFetchingCampaign,
    isError: isErrorCampaign,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: Number(campaignId),
  });

  const {
    isLoading: isLoadingReports,
    isFetching: isFetchingReports,
    isError: isErrorReports,
    data: reports,
  } = useGetCampaignsByCidReportsQuery({
    cid: Number(campaignId),
  });

  if (isErrorCampaign || isErrorReports) {
    navigate(notFoundRoute);
  }

  return (
    <Page
      title={(campaign && campaign.customer_title) ?? 'Campaign'}
      pageHeader={
        isLoadingCampaign || isFetchingCampaign ? (
          <HeaderLoader />
        ) : (
          <CampaignPageHeader campaignId={Number(campaign ? campaign.id : 0)} />
        )
      }
      route="campaigns"
    >
      <Grid>
        {reports && reports.length ? (
          <Row>
            <Col xs={12}>
              <XL
                style={{
                  fontWeight: theme.fontWeights.medium,
                  marginBottom: theme.space.xs,
                }}
              >
                {t('__CAMPAIGN_PAGE_REPORTS_TITLE')}
              </XL>
              <Paragraph>{t('__CAMPAIGN_PAGE_REPORTS_DESCRIPTION')}</Paragraph>
            </Col>
          </Row>
        ) : null}
        {reports && campaign && !isLoadingReports && !isFetchingReports ? (
          <ReportRow reports={reports} campaign={campaign} />
        ) : (
          <ReportRowLoading />
        )}
      </Grid>
    </Page>
  );
};

export default Campaign;
