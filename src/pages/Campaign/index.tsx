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
import BugDistributionCard from './widgets/BugDistributionCard';
import { EmptyState } from './EmptyState';
import { SectionTitle } from './SectionTitle';
import UniqueBugs4UseCase from './widgets/UniqueBugs4UseCase';
import IncomingBugs from './widgets/incomingBugs';
import TotalBugsByOsAndDevices from './widgets/TotalBugsByOsAndDevices';

const Campaign = () => {
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const { campaignId } = useParams();
  const { t } = useTranslation();

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

  const firstRowHeight = '540px';
  const secondRowHeight = '465px';

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
          {!campaign?.outputs?.includes('bugs') &&
          !reports?.length &&
          !isFunctional ? (
            <EmptyState />
          ) : (
            <>
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
                  <>
                    <Row>
                      <Col xs={12}>
                        <SectionTitle
                          id="campaign-overview"
                          title={t('__CAMPAIGN_PAGE_WIDGET_TITLE')}
                        />
                      </Col>
                      <Col xs={12} md={4}>
                        <Progress campaign={campaign} />
                      </Col>
                      <Col xs={12} md={4}>
                        <UniqueBugs campaignId={campaign ? campaign.id : 0} />
                      </Col>
                      <Col xs={12} md={4} lg={4}>
                        {isFetchingCampaign ? undefined : (
                          <BugDistributionCard
                            campaignId={campaign ? campaign.id : 0}
                          />
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <SectionTitle
                          id="unique-bug-distribution"
                          title={t('__CAMPAIGN_PAGE_UNIQUE_BUGS_SECTION_TITLE')}
                          subtitle={t(
                            '__CAMPAIGN_PAGE_UNIQUE_BUGS_SECTION_SUBTITLE'
                          )}
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <UniqueBugs4UseCase height={firstRowHeight} />
                      </Col>
                      <Col xs={12} md={6}>
                        <IncomingBugs
                          height={firstRowHeight}
                          campaignId={campaign.id ?? 0}
                        />
                      </Col>
                      <Col xs={12}>
                        <SectionTitle
                          id="devices-and-types"
                          title={t(
                            '__CAMPAIGN_PAGE_DEVICE_AND_BUG_TYPES_SECTION_TITLE'
                          )}
                          subtitle={t(
                            '__CAMPAIGN_PAGE_UNIQUE_BUGS_SECTION_SUBTITLE'
                          )}
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <TotalBugsByOsAndDevices
                          height={secondRowHeight}
                          campaignId={campaign.id ?? 0}
                        />
                      </Col>
                    </Row>
                  </>
                )}
                {reports &&
                campaign &&
                !isLoadingReports &&
                !isFetchingReports ? (
                  <ReportRow
                    reports={reports}
                    campaign={campaign}
                    {...(isFunctional && { isFunctional })}
                  />
                ) : (
                  <ReportRowLoading />
                )}
              </Col>
            </>
          )}
        </Row>
      </Grid>
    </Page>
  );
};

export default Campaign;
