import { styled } from 'styled-components';
import { ReactComponent as CircleFill } from 'src/assets/icons/circle-full-fill.svg';

export const Circle = styled(CircleFill)<{
  color: string;
}>`
  width: 10px;
  height: 10px;
  min-width: 10px;
  margin: auto 0;
  border-radius: 50%;
  color: ${({ color }) => color};
  margin-right: ${({ theme }) => theme.space.xs};
  ${({ theme, color }) =>
    color === '#ffffff' && `border: 2px solid ${theme.palette.grey[400]};`}
`;