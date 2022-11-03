import { Button, SpecialCard, theme } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LinkIcon } from 'src/assets/icons/file-icon-link.svg';
import { ReactComponent as OpenLinkIcon } from 'src/assets/icons/new-window-stroke.svg';

export const BugsReportCard = ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  const { t } = useTranslation();
  const getReport = () => {
    fetch('https://dev.unguess.io/wp-admin/admin-ajax.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        action: 'bugs_excel',
        project: id,
        type: 'campaign',
        title,
      }),
    });
  };

  return (
    <SpecialCard>
      <SpecialCard.Meta
        justifyContent="start"
        style={{ fontSize: theme.fontSizes.sm }}
      >
        Lorem ipsum dolor sit amet
      </SpecialCard.Meta>

      <SpecialCard.Thumb>
        <LinkIcon />
      </SpecialCard.Thumb>

      <SpecialCard.Header>
        <SpecialCard.Header.Label>
          Lorem ipsum dolor sit amet
        </SpecialCard.Header.Label>
        <SpecialCard.Header.Title>{title}</SpecialCard.Header.Title>
      </SpecialCard.Header>

      <SpecialCard.Footer direction="column" justifyContent="center">
        <Button
          className="report-btn report-btn-link report-btn-link"
          isPill
          isStretched
          onClick={getReport}
        >
          <Button.StartIcon>
            <OpenLinkIcon />
          </Button.StartIcon>
          {t('__CAMPAIGN_PAGE_REPORTS_CARDS_OPEN_LINK_LABEL')}
        </Button>
      </SpecialCard.Footer>
    </SpecialCard>
  );
};
