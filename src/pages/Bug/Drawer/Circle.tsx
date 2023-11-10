import { styled } from 'styled-components';
import { ReactComponent as CircleFill } from 'src/assets/icons/circle-full-fill.svg';

export const Circle = styled(CircleFill)<{
  color: string;
}>`
  width: auto;
  height: 100%;
  max-height: 10px;
  margin: auto 0;
  border-radius: 50%;
  color: ${({ color }) => color};
  margin-right: ${({ theme }) => theme.space.xs};
  min-width: auto;
`;
