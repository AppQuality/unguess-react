import { getColor } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';

export const getSeverityColor = (severity: string) => {
  switch (severity.replace(' ', '-').toLowerCase()) {
    case 'minor-issue':
      return appTheme.colors.bySeverity.high;
    case 'major-issue':
      return appTheme.colors.bySeverity.critical;
    case 'observation':
      return appTheme.colors.bySeverity.medium;
    case 'positive-finding':
      return appTheme.colors.bySeverity.low;
    default:
      return getColor(appTheme.colors.neutralHue, 500);
  }
};

export const getBgColor = (severity: string) => {
  switch (severity.replace(' ', '-').toLowerCase()) {
    case 'minor-issue':
      return appTheme.colors.bySeverityHues.high;
    case 'major-issue':
      return appTheme.colors.bySeverityHues.critical;
    case 'observation':
      return appTheme.colors.bySeverityHues.medium;
    case 'positive-finding':
      return appTheme.colors.bySeverityHues.low;
    default:
      return getColor(appTheme.colors.neutralHue, 200) || 'transparent';
  }
};
