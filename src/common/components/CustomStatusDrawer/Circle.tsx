import { ReactComponent as CircleFill } from 'src/assets/icons/circle-full-fill.svg';
import { styled } from 'styled-components';

export const Circle = styled(CircleFill)<{
  color: string;
}>`
  width: ${({ theme }) => theme.space.sm};
  height: ${({ theme }) => theme.space.sm};
  min-width: ${({ theme }) => theme.space.sm};
  min-height: ${({ theme }) => theme.space.sm};
  margin-right: ${({ theme }) => theme.space.xs};
  border-radius: 50%;
  color: ${({ color }) => color};
  ${({ theme, color }) =>
    color === '#ffffff' && `border: 2px solid ${theme.palette.grey[400]};`}
`;
