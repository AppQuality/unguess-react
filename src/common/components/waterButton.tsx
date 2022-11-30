import { Button } from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import styled from 'styled-components';

export const WaterButton = styled(Button)``;

WaterButton.defaultProps = {
  themeColor: theme.palette.water[600],
};
