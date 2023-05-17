import 'styled-components';
import { appTheme } from 'src/app/theme';

declare module 'styled-components' {
  type Theme = typeof theme;
  export interface DefaultTheme extends Theme {}
}
