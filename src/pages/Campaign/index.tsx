import { Page } from 'src/features/templates/Page';
import {
  Button,
  Col,
  Grid,
  Paragraph,
  Row,
  Span,
  SpecialCard,
  XL,
  theme,
} from '@appquality/unguess-design-system';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidReportsQuery,
} from 'src/features/api';
import { format } from 'date-fns';
import { ReactComponent as ArchiveIcon } from 'src/assets/icons/file-icon-archive.svg';
import { ReactComponent as BoardIcon } from 'src/assets/icons/file-icon-board.svg';
import { ReactComponent as DocumentIcon } from 'src/assets/icons/file-icon-document.svg';
import { ReactComponent as DriveIcon } from 'src/assets/icons/file-icon-drive.svg';
import { ReactComponent as ExcelIcon } from 'src/assets/icons/file-icon-excel.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/file-icon-link.svg';
import { ReactComponent as PdfIcon } from 'src/assets/icons/file-icon-pdf.svg';
import { ReactComponent as PresentationIcon } from 'src/assets/icons/file-icon-presentation.svg';
import { ReactComponent as DownloadIcon } from 'src/assets/icons/download-stroke.svg';
import { ReactComponent as OpenLinkIcon } from 'src/assets/icons/new-window-stroke.svg';
import { ReactComponent as EmptyReportsImage } from 'src/assets/emptyReports.svg';
import styled from 'styled-components';
import { t } from 'i18next';
import { CampaignPageHeader } from './pageHeader';
import { HeaderLoader } from './pageHeaderLoading';

const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const getFileTypeName = (type: string, url: string) => {
  const urlHostname = new URL(url).hostname;

  switch (type) {
    case 'spreadsheet':
      return t('__CAMPAIGN_PAGE_REPORTS_FILE_TYPE_EXCEL');
    case 'pdf':
      return t('__CAMPAIGN_PAGE_REPORTS_FILE_TYPE_PDF');
    case 'text':
    case 'document':
      return t('__CAMPAIGN_PAGE_REPORTS_FILE_TYPE_DOCUMENT');
    case 'presentation':
      return t('__CAMPAIGN_PAGE_REPORTS_FILE_TYPE_PRESENTATION');
    case 'archive':
      return t('__CAMPAIGN_PAGE_REPORTS_FILE_TYPE_ARCHIVE');
    case 'link':
      // Check url to see if is a recognized domain
      if (urlHostname.includes('miro.com'))
        return t('__CAMPAIGN_PAGE_REPORTS_FILE_TYPE_BOARD');
      if (urlHostname.includes('drive.google.com'))
        return t('__CAMPAIGN_PAGE_REPORTS_FILE_TYPE_DRIVE');
      return t('__CAMPAIGN_PAGE_REPORTS_FILE_TYPE_LINK');
    default:
      return t('__CAMPAIGN_PAGE_REPORTS_FILE_TYPE_LINK');
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
      return <ArchiveIcon />;
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
      title={campaign.data?.customer_title ?? 'Campaign'}
      pageHeader={
        isLoading || isFetching || !campaign.data ? (
          <HeaderLoader />
        ) : (
          <CampaignPageHeader campaignId={Number(campaign.data.id)} />
        )
      }
      route="campaigns"
    >
      <Grid>
        {reports && reports.length && (
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
        )}
        <Row>
          {reports && reports.length ? (
            reports.map((report) => (
              <Col xs={12} md={4} lg={3}>
                <SpecialCard>
                  <SpecialCard.Meta
                    justifyContent="start"
                    style={{ fontSize: theme.fontSizes.sm }}
                  >
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
                      {getFileTypeName(
                        report.file_type?.type ?? '',
                        report.url
                      )}
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
                        // eslint-disable-next-line security/detect-non-literal-fs-filename
                        window.open(report.url || '', '_blank');
                      }}
                    >
                      <Button.StartIcon>
                        {report.file_type?.type === 'link' ? (
                          <OpenLinkIcon />
                        ) : (
                          <DownloadIcon />
                        )}
                      </Button.StartIcon>
                      {report.file_type?.type === 'link'
                        ? t('__CAMPAIGN_PAGE_REPORTS_CARDS_OPEN_LINK_LABEL')
                        : t('__CAMPAIGN_PAGE_REPORTS_CARDS_DOWNLOAD_LABEL')}
                    </Button>
                  </SpecialCard.Footer>
                </SpecialCard>
              </Col>
            ))
          ) : (
            <CenteredContent>
              <EmptyReportsImage />
              <XL
                style={{
                  fontWeight: theme.fontWeights.medium,
                  marginBottom: theme.space.sm,
                }}
              >
                {t('__CAMPAIGN_PAGE_REPORTS_EMPTY_REPORTS_TITLE')}
              </XL>
              <Paragraph style={{ textAlign: 'center' }}>
                {t('__CAMPAIGN_PAGE_REPORTS_EMPTY_REPORTS_TEXT')}
              </Paragraph>
            </CenteredContent>
          )}
        </Row>
      </Grid>
    </Page>
  );
};

export default Campaign;
