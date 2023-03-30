import { theme as globalTheme } from 'src/app/theme';

export const responsiveGridCss = `
  container: responsive-container / inline-size;

  @container responsive-container (width > ${globalTheme.breakpoints.sm}) {
    .flex-3-sm {
      flex-basis: 25% !important;
    }
    .max-width-6-sm {
      max-width: 50% !important;
    }
  }
`;
