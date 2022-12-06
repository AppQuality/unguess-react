import { Button, SpecialCard } from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ExcelIcon } from 'src/assets/icons/file-icon-excel.svg';
import { ReactComponent as DownloadIcon } from 'src/assets/icons/download-stroke.svg';
import queryString from 'query-string';

export const BugsReportCard = ({
  campaignId,
  title,
}: {
  campaignId: number;
  title: string;
}) => {
  const { t } = useTranslation();
  const getReport = () => {
    fetch(`${process.env.REACT_APP_CROWD_WP_URL}/wp-admin/admin-ajax.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: queryString.stringify({
        action: 'bugs_excel',
        project: campaignId,
        type: 'campaign',
        title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          window.location.href = `${process.env.REACT_APP_CROWD_WP_URL}/wp-content/themes/unguess/report/temp/${data.file}`;
        } else {
          // eslint-disable-next-line no-console
          console.error(data);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('error', error);
      });
  };

  return (
    <SpecialCard>
      <SpecialCard.Meta
        justifyContent="start"
        style={{ fontSize: theme.fontSizes.sm }}
      >
        {t('__CAMPAIGN_PAGE_REPORTS_GENERATE_REPORT_CARD_META')}
      </SpecialCard.Meta>

      <SpecialCard.Thumb>
        <ExcelIcon />
      </SpecialCard.Thumb>

      <SpecialCard.Header>
        <SpecialCard.Header.Label>
          {t('__CAMPAIGN_PAGE_REPORTS_FILE_TYPE_EXCEL')}
        </SpecialCard.Header.Label>
        <SpecialCard.Header.Title>{title}</SpecialCard.Header.Title>
      </SpecialCard.Header>

      <SpecialCard.Footer direction="column" justifyContent="center">
        <Button
          className="report-btn report-btn-download report-btn-bugs-report"
          isPill
          isStretched
          onClick={getReport}
        >
          <Button.StartIcon>
            <DownloadIcon />
          </Button.StartIcon>
          {t('__CAMPAIGN_PAGE_REPORTS_GENERATE_REPORT_CARD_BUTTON_LABEL')}
        </Button>
      </SpecialCard.Footer>
    </SpecialCard>
  );
};
