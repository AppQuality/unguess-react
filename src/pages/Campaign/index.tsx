// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from 'react-i18next';
import { Page } from 'src/features/templates/Page';
import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidReportsQuery,
} from 'src/features/api';
import { CampaignPageHeader } from './pageHeader';
import { HeaderLoader } from './pageHeaderLoading';

const Campaign = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');

  const { campaignId } = useParams();

  if (!campaignId || Number.isNaN(Number(campaignId))) {
    navigate(notFoundRoute);
  }

  const {
    isLoading,
    isFetching,
    isError,
    data: reports,
  } = useGetCampaignsByCidReportsQuery({
    cid: Number(campaignId),
  });

  const campaign = useGetCampaignsByCidQuery({
    cid: Number(campaignId),
  });

  if (isError || campaign.isError) {
    navigate(notFoundRoute);
  }

  return (
    <Page
      title={t('__PAGE_TITLE_CAMPAIGN_DASHBOARD')}
      pageHeader={
        isLoading || isFetching || !campaign.data ? (
          <HeaderLoader />
        ) : (
          <CampaignPageHeader
            projectId={Number(campaign.data.project.id)}
            pageTitle={campaign.data.customer_title}
          />
        )
      }
      route="campaigns"
    >
      <Grid>
        <Row>
          {reports &&
            reports.map((report) => (
              <Col xs={12} md={4} lg={3}>
                {report.title}
              </Col>
            ))}
        </Row>
      </Grid>
    </Page>
  );
};

export default Campaign;
