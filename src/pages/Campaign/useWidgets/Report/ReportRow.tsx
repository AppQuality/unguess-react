import {
  Button,
  Col,
  Row,
  SpecialCard,
  theme,
} from '@appquality/unguess-design-system';
import { format } from 'date-fns';
import { t } from 'i18next';
import { ReactComponent as DownloadIcon } from 'src/assets/icons/download-stroke.svg';
import { ReactComponent as ArchiveIcon } from 'src/assets/icons/file-icon-archive.svg';
import { ReactComponent as BoardIcon } from 'src/assets/icons/file-icon-board.svg';
import { ReactComponent as DocumentIcon } from 'src/assets/icons/file-icon-document.svg';
import { ReactComponent as DriveIcon } from 'src/assets/icons/file-icon-drive.svg';
import { ReactComponent as ExcelIcon } from 'src/assets/icons/file-icon-excel.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/file-icon-link.svg';
import { ReactComponent as PdfIcon } from 'src/assets/icons/file-icon-pdf.svg';
import { ReactComponent as PresentationIcon } from 'src/assets/icons/file-icon-presentation.svg';
import { ReactComponent as OpenLinkIcon } from 'src/assets/icons/new-window-stroke.svg';
import { BugsReportCard } from 'src/common/components/BugsReportCard';
import { Campaign, Report } from 'src/features/api';
import { SectionTitle } from '../../SectionTitle';

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

export const ReportRow = ({
  reports,
  campaign,
}: {
  reports?: (Report | 'bugreport')[];
  campaign: Campaign;
}) => {
  const { id: campaignId, customer_title } = campaign;

  return (
    <Row id="reports">
      {reports && reports.length ? (
        <Col xs={12}>
          <SectionTitle
            title={t('__CAMPAIGN_PAGE_REPORTS_TITLE')}
            subtitle={t('__CAMPAIGN_PAGE_REPORTS_DESCRIPTION')}
          />
        </Col>
      ) : null}
      {reports && reports.length
        ? reports.map((report) =>
            report === 'bugreport' ? (
              <Col xs={12} sm={6} md={4} xl={3}>
                <BugsReportCard
                  campaignId={campaignId}
                  title={customer_title}
                />
              </Col>
            ) : (
              <Col xs={12} sm={6} md={4} xl={3}>
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
                      <span style={{ overflowWrap: 'anywhere' }}>
                        {report.title}
                      </span>
                    </SpecialCard.Header.Title>
                  </SpecialCard.Header>

                  <SpecialCard.Footer
                    direction="column"
                    justifyContent="center"
                  >
                    <Button
                      className={`report-btn report-btn-${
                        report.file_type?.type === 'link' ? 'link' : 'download'
                      } report-btn-${report.file_type?.type ?? ''}`}
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
            )
          )
        : null}
    </Row>
  );
};
