import { IconButton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { ReactComponent as DotsmenuIcon } from 'src/assets/icons/dots-menu.svg';
import { theme } from 'src/app/theme';

export const DotsMenu = () => (
  <IconButton
    style={{ color: theme.palette.grey['600'], marginLeft: theme.space.sm }}
  >
    <DotsmenuIcon style={{ height: '40px', width: '40px' }} />
  </IconButton>
);
