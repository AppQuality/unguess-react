import {
  theme as baseTheme,
  CHARTS_COLOR_PALETTE,
} from '@appquality/unguess-design-system';

export const SEVERITY_COLORS: Record<Severities, string> = {
  critical: CHARTS_COLOR_PALETTE.mattone,
  high: CHARTS_COLOR_PALETTE.gubbioLight,
  medium: CHARTS_COLOR_PALETTE.blueRoyal,
  low: CHARTS_COLOR_PALETTE.darkPine,
};

export const SEVERITY_HUES: Record<Severities, string> = {
  critical: CHARTS_COLOR_PALETTE.mattone,
  high: CHARTS_COLOR_PALETTE.gubbioLight,
  medium: CHARTS_COLOR_PALETTE.blueRoyal,
  low: CHARTS_COLOR_PALETTE.darkPine,
};

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
    stroke: CHARTS_COLOR_PALETTE.blueRoyal,
    color: CHARTS_COLOR_PALETTE.blueRoyal,
  },
  open: {
    stroke: CHARTS_COLOR_PALETTE.blueRoyal,
    color: CHARTS_COLOR_PALETTE.blueRoyal,
  },
  'to be retested': {
    stroke: CHARTS_COLOR_PALETTE.gubbioLight,
    color: CHARTS_COLOR_PALETTE.gubbioLight,
  },
  solved: {
    stroke: '#00A56A',
    color: '#00A56A',
  },
  'not a bug': {
    stroke: baseTheme.palette.grey[600],
    color: baseTheme.palette.grey[600],
  },
};

const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    bySeverity: SEVERITY_COLORS,
    byBugState: BUG_STATE_COLORS,
    bySeverityHues: SEVERITY_HUES,
    darkPine: CHARTS_COLOR_PALETTE.darkPine,
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
