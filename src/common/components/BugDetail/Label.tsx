import { MD } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const Label = styled(({ children, className, style }) => (
  <MD className={className} style={style} isBold>
    {children}
  </MD>
))`
  color: ${({ theme }) => theme.palette.grey[800]};
`;
