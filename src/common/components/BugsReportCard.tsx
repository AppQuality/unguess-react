import { Button, SpecialCard } from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ExcelIcon } from 'src/assets/icons/file-icon-excel.svg';
import { ReactComponent as DownloadIcon } from 'src/assets/icons/download-stroke.svg';
import WPAPI from 'src/common/wpapi';

export const BugsReportCard = ({
  campaignId,
  title,
}: {
  campaignId: number;
  title: string;
}) => {
  const { t } = useTranslation();

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
          onClick={() => WPAPI.getReport({ campaignId, title })}
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
