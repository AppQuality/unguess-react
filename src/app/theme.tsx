import {
  theme as baseTheme,
  getColor,
} from '@appquality/unguess-design-system';

export const SEVERITY_COLORS: Record<Severities, string> = {
  critical: baseTheme.palette.red[900],
  high: baseTheme.palette.yellow[600],
  medium: baseTheme.palette.blue[600],
  low: baseTheme.palette.teal[700],
};

export const SEVERITY_HUES: Record<Severities, string> = {
  critical: baseTheme.palette.red[900],
  high: baseTheme.palette.yellow[600],
  medium: baseTheme.palette.blue[600],
  low: baseTheme.palette.teal[700],
};
// temporary fix for the bug state colors
export const BUG_STATE_COLORS: Record<
  BugState,
  { stroke: string; color: string }
> = {
  'to do': {
    stroke: baseTheme.palette.grey[400],
    color: baseTheme.palette.white,
  },
  pending: {
    stroke: baseTheme.palette.grey[400],
    color: baseTheme.palette.grey[400],
  },
  'to be imported': {
    stroke: baseTheme.palette.azure[500],
    color: baseTheme.palette.azure[500],
  },
  open: {
    stroke: baseTheme.palette.azure[500],
    color: baseTheme.palette.azure[500],
  },
  'to be retested': {
    stroke: baseTheme.palette.yellow[500],
    color: baseTheme.palette.yellow[500],
  },
  solved: {
    stroke: baseTheme.palette.green[500],
    color: baseTheme.palette.green[500],
  },
  'not a bug': {
    stroke: baseTheme.palette.grey[600],
    color: baseTheme.palette.grey[600],
  },
};

const appTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    bySeverity: SEVERITY_COLORS,
    byBugState: BUG_STATE_COLORS,
    bySeverityHues: SEVERITY_HUES,
  },
  components: {
    ...baseTheme.components,
    text: {
      neutralColor: baseTheme.colors.foreground,
      primaryColor: getColor(baseTheme.colors.primaryHue, 600),
      successColor: getColor(baseTheme.colors.successHue, 700),
      warningColor: getColor(baseTheme.colors.warningHue, 700),
      dangerColor: getColor(baseTheme.colors.dangerHue, 700),
      infoColor: getColor(baseTheme.colors.infoHue, 700),
    },
    'tables.header_row': {
      height: 'auto',
    },
    'tables.header_cell': {
      paddingTop: baseTheme.space.sm,
      paddingBottom: baseTheme.space.sm,
    },
  },
};

export type AppTheme = typeof appTheme;
export { appTheme };
