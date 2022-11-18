import { Page } from 'src/features/templates/Page';
import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidReportsQuery,
} from 'src/features/api';
import { useTranslation } from 'react-i18next';
import CampaignPageHeader from './pageHeader';
import { HeaderLoader } from './pageHeaderLoading';
import { ReportRowLoading } from './ReportRowLoading';
import { ReportRow } from './ReportRow';
import { Navigation, NavigationLoading } from './navigation';
import { UniqueBugs } from './widgets/UniqueBugs';
import { Progress } from './widgets/Progress';

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

  const isFunctional =
    campaign?.family.name.toLocaleLowerCase() === 'functional';

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
        <Row>
          <Col xs={12} md={3}>
            {isLoadingCampaign ||
            isFetchingCampaign ||
            isLoadingReports ||
            isFetchingReports ? (
              <NavigationLoading />
            ) : (
              <Navigation
                campaignId={campaign ? campaign.id : 0}
                outputs={campaign ? campaign.outputs : []}
                reports={reports ?? []}
                {...(isFunctional && { isFunctional })}
              />
            )}
          </Col>
          <Col xs={12} md={9}>
            {campaign?.outputs?.includes('bugs') && (
              <Row>
                <Col xs={12} md={4}>
                  <UniqueBugs />
                </Col>
                <Col xs={12} md={4}>
                  <Progress />
                </Col>
              </Row>
            )}
            {reports && campaign && !isLoadingReports && !isFetchingReports ? (
              <ReportRow
                reports={reports}
                campaign={campaign}
                {...(isFunctional && { isFunctional })}
              />
            ) : (
              <ReportRowLoading />
            )}
          </Col>
        </Row>
      </Grid>
    </Page>
  );
};

export default Campaign;
