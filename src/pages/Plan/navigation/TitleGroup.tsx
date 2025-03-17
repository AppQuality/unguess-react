import { XL } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';

export const TitleGroup = () => (
  <XL
    isBold
    style={{
      color: appTheme.palette.blue[600],
    }}
    data-qa="title-module"
  >
    Titolo
  </XL>
);
