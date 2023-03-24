import { theme as globalTheme } from 'src/app/theme';
import { TFunction } from 'react-i18next';

type SeverityInfo = {
  color: string;
  accent: string;
  text: string;
};

export const getSeverityInfo = (
  severity: Severities,
  t: TFunction
): SeverityInfo => {
  const severityInfo: SeverityInfo = {
    color: globalTheme.colors.bySeverity[severity.toLocaleLowerCase() as Severities],
    accent: globalTheme.colors.bySeverityHues[severity.toLocaleLowerCase() as Severities],
    text: '',
  };

  switch (severity.toLowerCase()) {
    case 'critical':
      severityInfo.text = t('__BUG_SEVERITY_CRITICAL');
      break;

    case 'high':
      severityInfo.text = t('__BUG_SEVERITY_HIGH');
      break;

    case 'medium':
      severityInfo.text = t('__BUG_SEVERITY_MEDIUM');
      break;

    case 'low':
      severityInfo.text = t('__BUG_SEVERITY_LOW');
      break;

    default:
      severityInfo.text = t('__BUG_SEVERITY_MEDIUM');
      break;
  }

  return severityInfo;
};
