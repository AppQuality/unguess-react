import { appTheme } from 'src/app/theme';

export const getMaxSeverityColor = (name: string) => {
  switch (name) {
    case 'Major Issue':
      return appTheme.colors.bySeverity.critical;
    case 'Minor Issue':
      return appTheme.colors.bySeverity.high;
    case 'Positive Finding':
      return appTheme.colors.bySeverity.low;
    case 'Observation':
      return appTheme.colors.bySeverity.medium;
    default:
      return appTheme.colors.bySeverity.critical;
  }
};
