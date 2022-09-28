// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from 'react-i18next';
import { Page } from 'src/features/templates/Page';
import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useGetCampaignsByCidReportsQuery } from 'src/features/api';
import { CampaignPageHeader } from './pageHeader';

const Campaign = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
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
    error,
    data: reports,
  } = useGetCampaignsByCidReportsQuery({
    cid: Number(campaignId),
  });

  if (isError) {
    console.log(error);
    navigate(notFoundRoute);
  }

  return (
    <Page
      title={t('__PAGE_TITLE_CAMPAIGN_DASHBOARD')}
      pageHeader={
        <CampaignPageHeader pageTitle={t('__PAGE_TITLE_CAMPAIGN_DASHBOARD')} />
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
