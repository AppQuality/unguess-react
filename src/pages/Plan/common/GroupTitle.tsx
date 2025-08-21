import { MD } from '@appquality/unguess-design-system';
import { ComponentProps } from 'react';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';

const GroupTitle = styled((props: ComponentProps<typeof MD>) => (
  <MD isBold color={appTheme.palette.grey['600']} {...props} />
))`
  margin: ${(p) => p.theme.space.md} 0 ${(p) => p.theme.space.md} 0;
  padding-left: ${(p) => p.theme.space.md};
  text-transform: uppercase;
`;

export { GroupTitle };
