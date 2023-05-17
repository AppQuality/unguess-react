import { theme as baseTheme } from '@appquality/unguess-design-system';

export const SEVERITY_COLORS: Record<Severities, string> = {
  critical: baseTheme.palette.red[900],
  high: baseTheme.palette.yellow[600],
  medium: baseTheme.palette.teal[700],
  low: baseTheme.palette.blue[600],
};

export const SEVERITY_HUES: Record<Severities, string> = {
  critical: baseTheme.palette.red[900],
  high: baseTheme.palette.yellow[600],
  medium: baseTheme.palette.teal[700],
  low: baseTheme.palette.blue[600],
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
    stroke: baseTheme.palette.azure[400],
    color: baseTheme.palette.azure[400],
  },
  open: {
    stroke: baseTheme.palette.azure[400],
    color: baseTheme.palette.azure[400],
  },
  'to be retested': {
    stroke: baseTheme.palette.yellow[400],
    color: baseTheme.palette.yellow[400],
  },
  solved: {
    stroke: baseTheme.palette.green[600],
    color: baseTheme.palette.green[600],
  },
  'not a bug': {
    stroke: baseTheme.palette.grey[600],
    color: baseTheme.palette.grey[600],
  },
};

type UgTheme = typeof baseTheme & {
  colors: {
    bySeverity: Record<Severities, string>;
    byBugState: Record<BugState, { stroke: string; color: string }>;
    bySeverityHues: Record<Severities, string>;
  };
};

const theme: UgTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    bySeverity: SEVERITY_COLORS,
    byBugState: BUG_STATE_COLORS,
    bySeverityHues: SEVERITY_HUES,
  },
  components: {
    ...baseTheme.components,
    'tables.header_row': {
      height: 'auto',
    },
    'tables.header_cell': {
      paddingTop: baseTheme.space.sm,
      paddingBottom: baseTheme.space.sm,
    },
  },
};

export { theme };
