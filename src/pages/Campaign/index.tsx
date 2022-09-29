import { useTranslation } from 'react-i18next';
import { Page } from 'src/features/templates/Page';
import {
  Button,
  Col,
  Grid,
  Row,
  Span,
  SpecialCard,
} from '@appquality/unguess-design-system';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidReportsQuery,
} from 'src/features/api';
import { format } from 'date-fns';
import { ReactComponent as BoardIcon } from 'src/assets/icons/file-icon-board.svg';
import { ReactComponent as DocumentIcon } from 'src/assets/icons/file-icon-document.svg';
import { ReactComponent as DriveIcon } from 'src/assets/icons/file-icon-drive.svg';
import { ReactComponent as ExcelIcon } from 'src/assets/icons/file-icon-excel.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/file-icon-link.svg';
import { ReactComponent as PdfIcon } from 'src/assets/icons/file-icon-pdf.svg';
import { ReactComponent as PresentationIcon } from 'src/assets/icons/file-icon-presentation.svg';
import { ReactComponent as DownloadIcon } from 'src/assets/icons/download-icon.svg';
import { CampaignPageHeader } from './pageHeader';
import { HeaderLoader } from './pageHeaderLoading';

const getFileTypeName = (type: string) => {
  switch (type) {
    case 'spreadsheet':
      return 'Excel';
    case 'pdf':
      return 'PDF';
    case 'text':
    case 'document':
      return 'Document';
    case 'presentation':
      return 'Presentation';
    case 'archive':
      return 'Archive';
    case 'link':
      return 'Link';
    default:
      return 'Link';
  }
};

const getFileTypeIcon = (type: string, url: string) => {
  const urlHostname = new URL(url).hostname;

  switch (type) {
    case 'spreadsheet':
      return <ExcelIcon />;
    case 'pdf':
      return <PdfIcon />;
    case 'text':
    case 'document':
      return <DocumentIcon />;
    case 'presentation':
      return <PresentationIcon />;
    case 'archive':
      return <LinkIcon />;
    case 'link':
      // Check url to see if is a recognized domain
      if (urlHostname.includes('miro.com')) return <BoardIcon />;
      if (urlHostname.includes('drive.google.com')) return <DriveIcon />;
      return <LinkIcon />;
    default:
      return <LinkIcon />;
  }
};

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
                <SpecialCard>
                  <SpecialCard.Meta justifyContent="start">
                    {report.update_date ? (
                      <>
                        {t('__CAMPAIGN_PAGE_REPORTS_CARDS_UPDATED_ON_LABEL')}{' '}
                        {format(new Date(report.update_date), 'dd/MM/yyyy')}
                      </>
                    ) : (
                      <>
                        {t('__CAMPAIGN_PAGE_REPORTS_CARDS_UPLOADED_ON_LABEL')}{' '}
                        {format(
                          new Date(report.creation_date ?? ''),
                          'dd/MM/yyyy'
                        )}
                      </>
                    )}
                  </SpecialCard.Meta>

                  <SpecialCard.Thumb>
                    {getFileTypeIcon(report.file_type?.type ?? '', report.url)}
                  </SpecialCard.Thumb>

                  <SpecialCard.Header>
                    <SpecialCard.Header.Label>
                      {getFileTypeName(report.file_type?.type ?? '')}
                    </SpecialCard.Header.Label>
                    <SpecialCard.Header.Title>
                      {report.title}
                    </SpecialCard.Header.Title>
                  </SpecialCard.Header>

                  <SpecialCard.Footer
                    direction="column"
                    justifyContent="center"
                  >
                    <Button
                      isPill
                      isStretched
                      onClick={() => {
                        window.open(report.url, '_blank');
                      }}
                    >
                      <DownloadIcon style={{ marginRight: 8 }} />
                      <Span>
                        {t('__CAMPAIGN_PAGE_REPORTS_CARDS_DOWNLOAD_LABEL')}
                      </Span>
                    </Button>
                  </SpecialCard.Footer>
                </SpecialCard>
              </Col>
            ))}
        </Row>
      </Grid>
    </Page>
  );
};

export default Campaign;
