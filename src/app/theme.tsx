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
const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    bySeverity: SEVERITY_COLORS,
    darkPine: CHARTS_COLOR_PALETTE.darkPine,
    gubbioLight: CHARTS_COLOR_PALETTE.gubbioLight,
    blueRoyal: CHARTS_COLOR_PALETTE.blueRoyal,
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
