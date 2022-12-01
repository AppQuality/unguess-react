import 'styled-components';
import { theme } from 'src/app/theme';

declare module 'styled-components' {
  const Theme = typeof theme;
  export interface DefaultTheme extends Theme {}
}
