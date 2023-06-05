import { Anchor } from '@appquality/unguess-design-system';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';
import styled from 'styled-components';

export const ShowMore = styled(Anchor)`
  display: block;
  margin-top: ${({ theme }) => theme.space.base * 4}px;
  ${(props) => retrieveComponentStyles('text.primary', props)};
  padding-left: ${({ theme }) => theme.space.base * 6}px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
