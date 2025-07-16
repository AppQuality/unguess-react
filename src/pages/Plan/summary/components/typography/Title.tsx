import { XL } from '@appquality/unguess-design-system';
import { ComponentProps } from 'react';
import styled from 'styled-components';

export const Title = styled((props: ComponentProps<typeof XL>) => (
  <XL isBold {...props} />
))`
  color: ${({ theme }) => theme.palette.grey[800]};
`;
